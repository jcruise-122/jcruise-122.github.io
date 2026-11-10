import crypto from 'node:crypto';
import express from 'express';
import { fal } from '@fal-ai/client';

const app = express();
const port = Number(process.env.PORT || 3000);
const siteOrigin = process.env.SITE_ORIGIN;
const tokenSecret = process.env.VIDEO_TOKEN_SECRET;
const modelId = 'fal-ai/veo3.1';
const requestLimits = new Map();
const windowMs = 60 * 60 * 1000;
const maxJobsPerWindow = 3;

if (!process.env.FAL_KEY) throw new Error('FAL_KEY is required. Set it in the server environment, never in browser code.');
if (!siteOrigin) throw new Error('SITE_ORIGIN is required, for example https://your-site.github.io');
if (!tokenSecret || tokenSecret.length < 32) throw new Error('VIDEO_TOKEN_SECRET must be a random secret of at least 32 characters.');
fal.config({ credentials: process.env.FAL_KEY });

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use((req, res, next) => {
  const origin = req.get('origin');
  if (origin && origin !== siteOrigin) return res.status(403).json({ error: 'This website is not allowed to use the video API.' });
  if (origin) {
    res.set('Access-Control-Allow-Origin', siteOrigin);
    res.set('Vary', 'Origin');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.use(express.json({ limit: '8kb' }));
app.get('/health', (_req, res) => res.json({ ok: true }));

function signJob(requestId, expiresAt) {
  const payload = `${requestId}.${expiresAt}`;
  const signature = crypto.createHmac('sha256', tokenSecret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function validJobToken(requestId, token) {
  if (typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 3 || parts[0] !== requestId || !/^\d+$/.test(parts[1])) return false;
  const expiresAt = Number(parts[1]);
  if (!Number.isSafeInteger(expiresAt) || expiresAt < Date.now()) return false;
  const expected = signJob(requestId, expiresAt).split('.')[2];
  const actualBytes = Buffer.from(parts[2]);
  const expectedBytes = Buffer.from(expected);
  return actualBytes.length === expectedBytes.length && crypto.timingSafeEqual(actualBytes, expectedBytes);
}

function requireJobAccess(req, res, next) {
  const requestId = req.params.requestId;
  const token = (req.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (!/^[A-Za-z0-9_-]{8,128}$/.test(requestId) || !validJobToken(requestId, token)) {
    return res.status(401).json({ error: 'Invalid or expired generation job token.' });
  }
  next();
}

function rateLimit(req, res, next) {
  const now = Date.now();
  const key = req.ip;
  const record = requestLimits.get(key);
  if (!record || now - record.startedAt >= windowMs) {
    requestLimits.set(key, { startedAt: now, count: 1 });
    return next();
  }
  if (record.count >= maxJobsPerWindow) {
    const retryAfter = Math.max(1, Math.ceil((windowMs - (now - record.startedAt)) / 1000));
    res.set('Retry-After', String(retryAfter));
    return res.status(429).json({ error: 'Generation limit reached. Try again later.' });
  }
  record.count += 1;
  next();
}

app.post('/api/video/jobs', rateLimit, async (req, res) => {
  if (process.env.VIDEO_GENERATION_ENABLED !== 'true') {
    return res.status(503).json({ error: 'Video generation is not enabled on the server yet.' });
  }
  const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt.trim() : '';
  const aspectRatio = req.body?.aspect_ratio;
  if (prompt.length < 8 || prompt.length > 1200) return res.status(400).json({ error: 'Prompt must be between 8 and 1,200 characters.' });
  if (aspectRatio !== '9:16' && aspectRatio !== '16:9') return res.status(400).json({ error: 'Choose a supported aspect ratio.' });

  try {
    const submitted = await fal.queue.submit(modelId, {
      input: { prompt, aspect_ratio: aspectRatio, generate_audio: true }
    });
    const requestId = submitted.request_id;
    if (typeof requestId !== 'string' || requestId.length < 8) throw new Error('The provider returned an invalid request ID.');
    const expiresAt = Date.now() + 30 * 60 * 1000;
    res.status(202).json({ request_id: requestId, token: signJob(requestId, expiresAt) });
  } catch (error) {
    console.error('Video job submission failed:', error.message);
    res.status(502).json({ error: 'The video provider could not accept this request. Check server configuration and try again later.' });
  }
});

app.get('/api/video/jobs/:requestId/status', requireJobAccess, async (req, res) => {
  try {
    const result = await fal.queue.status(modelId, { request_id: req.params.requestId });
    res.json({ status: result.status });
  } catch (error) {
    console.error('Video status lookup failed:', error.message);
    res.status(502).json({ error: 'Could not check the video job status.' });
  }
});

app.get('/api/video/jobs/:requestId/result', requireJobAccess, async (req, res) => {
  try {
    const result = await fal.queue.result(modelId, { request_id: req.params.requestId });
    const videoUrl = result?.data?.video?.url;
    if (typeof videoUrl !== 'string' || !videoUrl.startsWith('https://')) {
      return res.status(502).json({ error: 'The provider did not return a valid video file.' });
    }
    res.json({ video_url: videoUrl, audio_included: true });
  } catch (error) {
    console.error('Video result lookup failed:', error.message);
    res.status(502).json({ error: 'The video result is not available yet. Try again shortly.' });
  }
});

app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && 'body' in error) return res.status(400).json({ error: 'Invalid JSON request.' });
  console.error('Video API error:', error.message);
  res.status(500).json({ error: 'Unexpected server error.' });
});

app.listen(port, () => console.log(`Video API listening on port ${port}`));
