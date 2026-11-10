# Real AI video backend setup

The static GitHub Pages site cannot securely run a video model or keep a provider key secret. This repository includes a Node backend that queues text-to-video jobs through fal.ai's Veo 3.1 endpoint and requests generated audio. Model runs may be billed by the provider. Check current provider terms, API availability, age rules, and pricing before enabling generation. A parent/guardian may need to own or supervise any required account for a minor.

## Deploy the backend

1. Deploy this repository (or the `server.mjs` backend files) to a Node.js host that supports environment variables and outbound HTTPS. GitHub Pages alone cannot run this backend.
2. Install dependencies with `npm install` and start it with `npm start`.
3. Set these server environment variables in the hosting dashboard (do not commit secrets):
   - `FAL_KEY`: provider API key.
   - `VIDEO_TOKEN_SECRET`: a randomly generated secret with at least 32 characters.
   - `SITE_ORIGIN`: exact public website origin, e.g. `https://your-account.github.io`.
   - `VIDEO_GENERATION_ENABLED`: set to `true` only after you understand and accept provider costs.
   - `PORT`: supplied by most hosting services; optional locally.
4. Open `video-config.js` and set `window.VIDEO_API_BASE` to the backend's HTTPS origin, for example `https://your-video-api.example.com` (no trailing slash). Commit only that public URL, never the API key.
5. Deploy the static website to GitHub Pages and test with a short prompt. Check the provider dashboard for usage and configure spending limits there if available.

The backend allows one exact site origin, validates prompt length and aspect ratio, limits each IP to three submissions per hour per running instance, and returns short-lived signed job tokens. For production or multiple server instances, replace the in-memory rate limiter with a shared store and add stronger abuse controls. Do not expose generation endpoints without an origin-appropriate deployment and provider-side cost controls.

## Video API

The browser posts a prompt and aspect ratio to `POST /api/video/jobs`. The backend queues the request with `generate_audio: true`; the browser checks status and retrieves the resulting video through authenticated job routes. The model's generated video is expected to contain its audio track. Model schemas and pricing can change, so consult the provider's current Veo 3.1 API documentation before deployment.
