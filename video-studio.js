(() => {
  const canvas = document.getElementById('video-canvas');
  const ctx = canvas.getContext('2d');
  const titleInput = document.getElementById('video-title');
  const promptInput = document.getElementById('video-prompt');
  const durationInput = document.getElementById('video-duration');
  const createButton = document.getElementById('create-video');
  const downloadLink = document.getElementById('download-video');
  const status = document.getElementById('status');
  const themes = [
    { words: ['ocean', 'sea', 'water', 'blue'], colors: ['#061a40', '#087eaa', '#52d3db'] },
    { words: ['nature', 'forest', 'plant', 'earth', 'green'], colors: ['#102d25', '#28734d', '#b6df78'] },
    { words: ['sun', 'happy', 'bright', 'joy', 'gold'], colors: ['#42215c', '#d84c87', '#ffc857'] },
    { words: ['space', 'star', 'future', 'technology', 'tech'], colors: ['#10102f', '#3c3a9c', '#5be1ff'] }
  ];
  let animationStart = performance.now();
  let animationFrame;
  let activeRecorder;
  let activeStream;
  let currentObjectUrl;

  function chosenTheme() {
    const text = `${titleInput.value} ${promptInput.value}`.toLowerCase();
    return themes.find(theme => theme.words.some(word => text.includes(word))) || themes[3];
  }

  function roundedRect(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    ctx.fill();
  }

  function wrap(text, maxWidth, font) {
    ctx.font = font;
    const words = text.trim().split(/\s+/).filter(Boolean);
    const lines = [];
    let line = '';
    words.forEach(word => {
      const test = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(test).width > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    return lines;
  }

  function draw(now) {
    const elapsed = (now - animationStart) / 1000;
    const theme = chosenTheme();
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, theme.colors[0]);
    gradient.addColorStop(.58, theme.colors[1]);
    gradient.addColorStop(1, theme.colors[2]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Soft floating circles create motion graphics without external images.
    for (let i = 0; i < 9; i += 1) {
      const x = (i * 113 + 70 + Math.sin(elapsed * .55 + i) * 55) % canvas.width;
      const y = (i * 157 + elapsed * (20 + i * 2)) % canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, 18 + (i % 4) * 13, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${.035 + (i % 3) * .018})`;
      ctx.fill();
    }

    const title = titleInput.value.trim() || 'A Bright New Idea';
    const prompt = promptInput.value.trim() || 'Add a prompt to shape this animated video.';
    const reveal = Math.min(1, Math.max(0, (elapsed - .35) / .8));
    ctx.globalAlpha = reveal;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    const titleFont = '700 64px Arial, sans-serif';
    const titleLines = wrap(title, 570, titleFont).slice(0, 3);
    ctx.font = titleFont;
    const titleY = 350 + Math.sin(elapsed * 1.4) * 8;
    titleLines.forEach((line, index) => ctx.fillText(line, 72, titleY + index * 78));

    ctx.fillStyle = '#ffffffd9';
    const promptFont = '400 34px Arial, sans-serif';
    const promptLines = wrap(prompt, 565, promptFont).slice(0, 5);
    ctx.font = promptFont;
    const promptY = titleY + titleLines.length * 82 + 42;
    promptLines.forEach((line, index) => ctx.fillText(line, 74, promptY + index * 49));

    ctx.globalAlpha = 1;
    ctx.fillStyle = '#ffffffb8';
    ctx.font = '700 22px Arial, sans-serif';
    ctx.fillText('BENES PAPERS  ·  MADE FROM YOUR IDEA', 72, 1160);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(72, 1220, 576, 5);
    ctx.fillStyle = '#ffcc4d';
    ctx.fillRect(72, 1220, 576 * Math.min(1, (elapsed % 10) / 10), 5);
    animationFrame = requestAnimationFrame(draw);
  }

  function stopTracks() {
    if (activeStream) {
      activeStream.getTracks().forEach(track => track.stop());
      activeStream = null;
    }
  }

  function createVideo() {
    if (!promptInput.value.trim()) {
      status.textContent = 'Please write a short prompt first.';
      promptInput.focus();
      return;
    }
    if (!canvas.captureStream || !window.MediaRecorder) {
      status.textContent = 'Video recording is not supported by this browser. Try a current desktop version of Chrome, Edge, or Firefox.';
      return;
    }
    if (activeRecorder && activeRecorder.state !== 'inactive') return;

    const supportedType = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm']
      .find(type => MediaRecorder.isTypeSupported(type));
    if (!supportedType) {
      status.textContent = 'This browser cannot record WebM video. Try a browser with MediaRecorder WebM support.';
      return;
    }

    downloadLink.hidden = true;
    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
    createButton.disabled = true;
    const seconds = Number(durationInput.value);
    animationStart = performance.now();
    activeStream = canvas.captureStream(30);
    const chunks = [];
    try {
      activeRecorder = new MediaRecorder(activeStream, { mimeType: supportedType });
      activeRecorder.addEventListener('dataavailable', event => {
        if (event.data && event.data.size) chunks.push(event.data);
      });
      activeRecorder.addEventListener('stop', () => {
        const blob = new Blob(chunks, { type: supportedType });
        currentObjectUrl = URL.createObjectURL(blob);
        downloadLink.href = currentObjectUrl;
        downloadLink.download = `benes-video-${Date.now()}.webm`;
        downloadLink.hidden = false;
        createButton.disabled = false;
        status.textContent = 'Your video is ready. Preview it, then download the WebM file.';
        stopTracks();
        animationStart = performance.now();
      }, { once: true });
      activeRecorder.addEventListener('error', () => {
        createButton.disabled = false;
        status.textContent = 'The browser could not record the video. Please try again.';
        stopTracks();
      }, { once: true });
      activeRecorder.start(250);
      status.textContent = `Creating your ${seconds}-second video… Keep this tab open.`;
      window.setTimeout(() => {
        if (activeRecorder && activeRecorder.state === 'recording') activeRecorder.stop();
      }, seconds * 1000);
    } catch (error) {
      createButton.disabled = false;
      stopTracks();
      status.textContent = 'Could not start recording in this browser. Try a supported desktop browser.';
    }
  }

  createButton.addEventListener('click', createVideo);
  [titleInput, promptInput].forEach(input => input.addEventListener('input', () => {
    if (currentObjectUrl) {
      URL.revokeObjectURL(currentObjectUrl);
      currentObjectUrl = null;
      downloadLink.hidden = true;
    }
  }));
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationFrame);
    stopTracks();
    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
  });
  animationFrame = requestAnimationFrame(draw);
})();
