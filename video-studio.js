(() => {
  const promptInput = document.getElementById('video-prompt');
  const aspectInput = document.getElementById('video-aspect');
  const createButton = document.getElementById('create-video');
  const downloadLink = document.getElementById('download-video');
  const video = document.getElementById('generated-video');
  const status = document.getElementById('status');
  const videoNote = document.getElementById('video-note');
  const apiBase = String(window.VIDEO_API_BASE || '').replace(/\/$/, '');
  let controller;

  function showError(message) {
    status.textContent = message;
    createButton.disabled = false;
  }

  async function requestJson(path, options = {}) {
    const response = await fetch(`${apiBase}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      signal: controller.signal
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || `Request failed (${response.status}).`);
    return data;
  }

  async function generate() {
    const prompt = promptInput.value.trim();
    if (prompt.length < 8) {
      status.textContent = 'Please describe the scene in at least 8 characters.';
      promptInput.focus();
      return;
    }
    if (!apiBase) {
      showError('The AI backend is not configured yet. Deploy the included server, then set VIDEO_API_BASE in video-config.js.');
      return;
    }

    createButton.disabled = true;
    downloadLink.hidden = true;
    video.removeAttribute('src');
    video.load();
    controller = new AbortController();
    try {
      status.textContent = 'Submitting your prompt to the video model…';
      const job = await requestJson('/api/video/jobs', {
        method: 'POST',
        body: JSON.stringify({ prompt, aspect_ratio: aspectInput.value })
      });
      if (!job.request_id || !job.token) throw new Error('The server did not return a valid generation job.');
      const deadline = Date.now() + 8 * 60 * 1000;
      let complete = false;
      while (Date.now() < deadline) {
        await new Promise(resolve => window.setTimeout(resolve, 4000));
        const state = await requestJson(`/api/video/jobs/${encodeURIComponent(job.request_id)}/status`, {
          headers: { Authorization: `Bearer ${job.token}` }
        });
        if (state.status === 'COMPLETED') {
          complete = true;
          break;
        }
        if (state.status === 'FAILED' || state.status === 'CANCELLED') {
          throw new Error('The video provider could not complete this generation. Please try a different prompt later.');
        }
        status.textContent = state.status === 'IN_PROGRESS' ? 'Generating video and audio… This can take a few minutes.' : 'Your request is safely queued…';
      }
      if (!complete) throw new Error('This generation is taking too long. Please try again later.');
      status.textContent = 'Video completed. Fetching the result…';
      const result = await requestJson(`/api/video/jobs/${encodeURIComponent(job.request_id)}/result`, {
        headers: { Authorization: `Bearer ${job.token}` }
      });
      if (!result.video_url) throw new Error('The provider completed the job but did not return a video URL.');
      video.src = result.video_url;
      video.load();
      downloadLink.href = result.video_url;
      downloadLink.download = 'benes-ai-video.mp4';
      downloadLink.hidden = false;
      videoNote.textContent = result.audio_included ? 'The generated video includes AI-generated audio. Press play to review.' : 'Generated video ready. Audio availability depends on the selected model output.';
      status.textContent = 'Your AI-generated video is ready.';
    } catch (error) {
      if (error.name === 'AbortError') return;
      showError(error.message || 'Video generation failed. Please try again.');
    } finally {
      createButton.disabled = false;
    }
  }

  createButton.addEventListener('click', generate);
})();
