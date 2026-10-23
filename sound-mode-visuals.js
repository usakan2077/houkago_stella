/* Sound Mode atmosphere. The analyser observes the unchanged media signal. */
class SoundModeVisuals {
  constructor(mode) {
    this.mode = mode;
    this.audio = mode.audio;
    this.canvas = document.getElementById('sound-meter');
    this.ctx = this.canvas.getContext('2d');
    this.layers = [...mode.modal.querySelectorAll('.sound-scene')];
    this.motion = matchMedia('(prefers-reduced-motion: reduce)');
    this.levels = new Float32Array(32);
    this.peaks = new Float32Array(32);
    this.frame = null;
    this.slideTimer = null;
    this.sceneEpoch = 0;
    this.activeLayer = 0;
    this.slideIndex = 0;
    this.level = 0;
    this.motion.addEventListener('change', () => {
      if (!mode.isOpen) return;
      this.stopMotion();
      this.scheduleSlides();
      if (!this.motion.matches && !this.audio.paused) this.startMeter();
    });
    document.addEventListener('visibilitychange', () => {
      if (!mode.isOpen) return;
      if (document.hidden) {
        this.stopMeter();
        clearInterval(this.slideTimer);
        this.slideTimer = null;
        this.layers.forEach(layer => layer.firstElementChild.getAnimations().forEach(animation => animation.pause()));
      } else {
        this.layers.forEach(layer => layer.firstElementChild.getAnimations().forEach(animation => animation.play()));
        this.scheduleSlides();
        if (!this.audio.paused) this.startMeter();
      }
    });
  }

  prepareAudio() {
    // A media element can have only one source node for its lifetime. Reuse it
    // across tracks and openings; suspending the context never disconnects it.
    if (!this.context && !this.unavailable) {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) { this.unavailable = true; return; }
        this.context = new AudioContextClass();
        this.analyser = this.context.createAnalyser();
        this.analyser.fftSize = 512;
        this.analyser.smoothingTimeConstant = .76;
        this.analyser.minDecibels = -90;
        this.analyser.maxDecibels = -12;
        this.frequency = new Uint8Array(this.analyser.frequencyBinCount);
        this.wave = new Float32Array(this.analyser.fftSize);
        this.source = this.context.createMediaElementSource(this.audio);
        this.source.connect(this.analyser);
        this.analyser.connect(this.context.destination);
      } catch (_) {
        // Keep playback usable if this browser cannot provide analysis.
        if (this.source) {
          this.source.disconnect();
          this.source.connect(this.context.destination);
        }
        this.unavailable = true;
      }
    }
    this.context?.resume().catch(() => {});
  }

  open() {
    this.levels.fill(0);
    this.peaks.fill(0);
    this.drawMeter();
    this.setTrack(null);
  }

  startMeter() {
    this.stopMeter();
    if (this.motion.matches || document.hidden || this.unavailable || !this.analyser) return;
    this.context?.resume().catch(() => {});
    const tick = () => {
      this.frame = null;
      if (!this.mode.isOpen || this.audio.paused || document.hidden) return;
      this.analyser.getByteFrequencyData(this.frequency);
      this.analyser.getFloatTimeDomainData(this.wave);
      const audible = !this.audio.muted && this.audio.volume > 0;
      this.level = audible ? Math.sqrt(this.wave.reduce((sum, value) => sum + value * value, 0) / this.wave.length) : 0;
      for (let i = 0; i < this.levels.length; i++) {
        const start = Math.floor(Math.pow(150, i / 32));
        const end = Math.max(start + 1, Math.floor(Math.pow(150, (i + 1) / 32)));
        let sum = 0;
        for (let bin = start; bin < end; bin++) sum += this.frequency[bin];
        const value = audible ? Math.pow(sum / (end - start) / 255, 1.35) : 0;
        this.levels[i] = Math.max(value, this.levels[i] * .86);
        this.peaks[i] = Math.max(this.levels[i], this.peaks[i] - .008);
      }
      this.drawMeter();
      this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
  }

  drawMeter() {
    const ctx = this.ctx;
    if (!ctx) return;
    const w = this.canvas.width, h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);
    const gradient = ctx.createLinearGradient(0, 0, w, 0);
    gradient.addColorStop(0, '#92d8ec');
    gradient.addColorStop(.48, '#c6b8f5');
    gradient.addColorStop(1, '#ffc8d8');
    const step = w / this.levels.length;
    for (let i = 0; i < this.levels.length; i++) {
      const x = i * step + 3, width = step - 8;
      ctx.fillStyle = 'rgba(220,232,255,.055)';
      ctx.fillRect(x, 6, width, h - 12);
      const height = Math.max(2, this.levels[i] * (h - 16));
      ctx.fillStyle = gradient;
      ctx.shadowColor = '#c9b7ef';
      ctx.shadowBlur = this.levels[i] * 8;
      ctx.fillRect(x, h - 6 - height, width, height);
      ctx.shadowBlur = 0;
      if (this.peaks[i] > .03) {
        ctx.fillStyle = 'rgba(248,241,255,.85)';
        ctx.fillRect(x, h - 8 - this.peaks[i] * (h - 16), width, 2);
      }
    }
  }

  stopMeter() {
    if (this.frame !== null) cancelAnimationFrame(this.frame);
    this.frame = null;
    this.level = 0;
    this.levels.fill(0);
    this.peaks.fill(0);
    this.drawMeter();
  }

  setTrack(track) {
    ++this.sceneEpoch;
    this.slides = VN_CONFIG.soundScenes[track?.id] || VN_CONFIG.soundScenes.default;
    this.slideIndex = 0;
    this.showScene(this.slides[0]);
    this.scheduleSlides();
  }

  scheduleSlides() {
    clearInterval(this.slideTimer);
    this.slideTimer = null;
    if (this.motion.matches || document.hidden || !this.mode.isOpen) return;
    this.slideTimer = setInterval(() => {
      this.slideIndex = (this.slideIndex + 1) % this.slides.length;
      this.showScene(this.slides[this.slideIndex]);
    }, 11000);
  }

  showScene(key) {
    const epoch = this.sceneEpoch;
    const request = this.sceneRequest = (this.sceneRequest || 0) + 1;
    const img = new Image();
    const apply = loaded => {
      if (epoch !== this.sceneEpoch || request !== this.sceneRequest || !this.mode.isOpen) return;
      const next = 1 - this.activeLayer;
      const layer = this.layers[next], picture = layer.firstElementChild;
      picture.getAnimations().forEach(animation => animation.cancel());
      picture.style.background = VN_CONFIG.backgrounds[key] || '#121626';
      if (loaded) picture.style.backgroundImage = `url("${img.src}")`;
      picture.style.backgroundSize = 'cover';
      picture.style.backgroundPosition = 'center';
      picture.dataset.background = key;
      layer.classList.add('is-visible');
      this.layers[this.activeLayer].classList.remove('is-visible');
      this.activeLayer = next;
      if (!this.motion.matches && !document.hidden) {
        const poses = this.slideIndex % 2
          ? ['translate3d(1.5%, -1%, 0) scale(1.14)', 'translate3d(-1.5%, 0, 0) scale(1.04)']
          : ['translate3d(-1.5%, 0, 0) scale(1.04)', 'translate3d(1.5%, -1%, 0) scale(1.14)'];
        picture.animate(poses.map(transform => ({ transform })), { duration: 14500, easing: 'linear', fill: 'forwards' });
      }
    };
    img.onload = () => apply(true);
    img.onerror = () => apply(false);
    const ext = this.mode.engine._resolvedBGExt?.[key] || '.webp';
    img.src = `assets/images/bg/${key}${ext}`;
  }

  stopMotion() {
    this.stopMeter();
    clearInterval(this.slideTimer);
    this.slideTimer = null;
    this.layers.forEach(layer => layer.firstElementChild.getAnimations().forEach(animation => animation.cancel()));
  }

  close() {
    ++this.sceneEpoch;
    this.stopMotion();
    this.context?.suspend().catch(() => {});
    this.layers.forEach(layer => {
      layer.classList.remove('is-visible');
      layer.firstElementChild.style.background = '';
    });
  }
}
