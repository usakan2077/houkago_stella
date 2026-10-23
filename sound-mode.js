/* Clear reward: one shared player, independent of story BGM and voices. */
class SoundMode {
  constructor(engine) {
    this.engine = engine;
    this.modal = document.getElementById('sound-modal');
    this.audio = document.getElementById('sound-audio');
    this.filter = 'songs';
    this.selected = null;
    this.session = 0;
    document.getElementById('btn-sound').addEventListener('click', () => this.open());
    document.getElementById('btn-sound-close').addEventListener('click', () => engine._closeVoiceModal('sound-modal'));
    document.getElementById('sound-prev').addEventListener('click', () => this.step(-1));
    document.getElementById('sound-next').addEventListener('click', () => this.step(1));
    document.getElementById('sound-loop').addEventListener('change', event => { this.audio.loop = event.target.checked; });
    document.querySelectorAll('[data-sound-filter]').forEach(button => {
      button.addEventListener('click', () => { this.filter = button.dataset.soundFilter; this.render(); });
    });
    this.audio.addEventListener('play', () => this.modal.classList.add('is-playing'));
    this.audio.addEventListener('pause', () => this.modal.classList.remove('is-playing'));
    this.audio.addEventListener('ended', () => this.modal.classList.remove('is-playing'));
    this.audio.addEventListener('error', () => {
      if (this.isOpen && this.audio.getAttribute('src')) this.error();
    });
    this.audio.addEventListener('volumechange', () => {
      if (!this.isOpen) return;
      VN_CONFIG.settings.bgmVolume = this.audio.muted ? 0 : this.audio.volume;
      localStorage.setItem('vn_bgm_volume', VN_CONFIG.settings.bgmVolume);
    });
    this.modal.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        engine._closeVoiceModal('sound-modal');
      } else if (event.key === 'Tab') {
        const controls = [...this.modal.querySelectorAll('button, input, audio')].filter(el => el.getClientRects().length);
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
  }

  get isOpen() { return !this.modal.classList.contains('hidden'); }

  isUnlocked() {
    return localStorage.getItem('vn_sound_unlocked') === '1'
      || this.engine.seenGoodEnds.size > 0
      || Object.values(this.engine.goodEndEpilogueStills).some(key => this.engine.seenStills.has(key));
  }

  unlock() {
    localStorage.setItem('vn_sound_unlocked', '1');
    this.refreshUnlock();
  }

  refreshUnlock() {
    const unlocked = this.isUnlocked();
    document.getElementById('btn-sound').classList.toggle('hidden', !unlocked);
    if (!unlocked && this.isOpen) this.close();
  }

  title(track) { return this.engine.currentLanguage === 'en' ? track.titleEn : track.title; }

  localize() {
    this.audio.setAttribute('aria-label', this.engine._t('soundPlayer'));
    this.modal.querySelector('.sound-filters').setAttribute('aria-label', this.engine._t('soundCategory'));
    if (this.isOpen) this.render();
  }

  open() {
    if (!this.isUnlocked() || this.engine._gameActive) return;
    this.engine._stopBGM();
    this.engine.openingMovie.resetIdle();
    this.modal.classList.remove('hidden');
    this.filter = 'songs';
    this.selected = null;
    this.audio.volume = VN_CONFIG.settings.bgmVolume;
    this.audio.muted = false;
    this.audio.loop = document.getElementById('sound-loop').checked;
    document.getElementById('sound-error').textContent = '';
    this.localize();
    document.getElementById('btn-sound-close').focus();
  }

  render() {
    const list = document.getElementById('sound-tracks');
    list.replaceChildren();
    document.querySelectorAll('[data-sound-filter]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.soundFilter === this.filter));
    });
    for (const track of VN_CONFIG.soundTracks.filter(track => track.group === this.filter)) {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.track = track.id;
      button.setAttribute('aria-pressed', String(this.selected === track));
      const badge = document.createElement('span');
      badge.className = 'sound-badge';
      badge.textContent = track.kind;
      const name = document.createElement('span');
      name.textContent = this.title(track);
      button.append(badge, name);
      button.addEventListener('click', () => this.play(track));
      item.appendChild(button);
      list.appendChild(item);
    }
    document.getElementById('sound-now').textContent = this.selected ? this.title(this.selected) : this.engine._t('soundChoose');
    document.getElementById('sound-kind').textContent = this.selected?.kind || '—';
  }

  play(track) {
    if (!this.isOpen || !VN_CONFIG.soundTracks.includes(track)) return;
    const session = ++this.session;
    this.audio.pause();
    this.selected = track;
    document.getElementById('sound-error').textContent = '';
    this.audio.src = track.src;
    this.render();
    this.audio.play().catch(error => {
      if (session === this.session && this.isOpen && error.name !== 'AbortError') this.error();
    });
  }

  step(delta) {
    const tracks = VN_CONFIG.soundTracks.filter(track => track.group === this.filter);
    const index = tracks.indexOf(this.selected);
    this.play(tracks[index < 0 ? (delta < 0 ? tracks.length - 1 : 0) : (index + delta + tracks.length) % tracks.length]);
  }

  error() { document.getElementById('sound-error').textContent = this.engine._t('soundError'); }

  close({ resume = true } = {}) {
    const wasOpen = this.isOpen;
    ++this.session;
    this.audio.pause();
    this.audio.removeAttribute('src');
    this.audio.load();
    this.selected = null;
    this.modal.classList.add('hidden');
    this.modal.classList.remove('is-playing');
    if (wasOpen && resume && !this.engine._gameActive) {
      this.engine._startTitleBGM();
      this.engine.openingMovie.resetIdle();
      document.getElementById('btn-sound').focus();
    }
  }
}
