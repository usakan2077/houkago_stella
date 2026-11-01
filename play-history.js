// Local campaign review data, separate from saves. Client data is not tamper-proof.
class VNPlayHistory {
  constructor({ priorProgress = false, storage = localStorage, now = () => performance.now(),
    visible = () => !document.hidden, autoStart = true } = {}) {
    this.storage = storage;
    this.now = now;
    this.visible = visible;
    this.storageFailed = false;
    this.record = this.read() || {
      totalMs: 0, allSkipUsed: false, unreadSkipCount: 0, trackingStartedAt: new Date().toISOString(), partial: priorProgress,
    };
    this.pendingMs = 0;
    this.pendingUnreadSkips = 0;
    this.running = false;
    this.last = this.now();
    this.wasVisible = this.visible();
    this.persist();
    if (autoStart) {
      this.timer = setInterval(() => {
        this.sample();
        if (this.pendingMs >= 10000 || this.pendingUnreadSkips >= 50) this.persist();
      }, 1000);
      document.addEventListener('visibilitychange', () => { this.sample(); this.persist(); });
      window.addEventListener('pagehide', () => { this.sample(); this.persist(); this.suspended = true; });
      window.addEventListener('pageshow', () => { this.last = this.now(); this.wasVisible = this.visible(); this.suspended = false; });
    }
  }

  read() {
    try {
      const value = JSON.parse(this.storage.getItem('vn_play_history'));
      if (value && Number.isFinite(value.totalMs) && value.totalMs >= 0
        && typeof value.allSkipUsed === 'boolean' && typeof value.partial === 'boolean'
        && typeof value.trackingStartedAt === 'string' && Number.isFinite(Date.parse(value.trackingStartedAt))
        && (value.unreadSkipCount === undefined || (Number.isSafeInteger(value.unreadSkipCount) && value.unreadSkipCount >= 0))) {
        return { ...value, unreadSkipCount: value.unreadSkipCount ?? 0, partial: value.partial || value.unreadSkipCount === undefined };
      }
      if (value !== null) this.storageFailed = true;
    } catch { this.storageFailed = true; }
    return null;
  }

  sample() {
    const current = this.now();
    const delta = current - this.last;
    // A long timer gap may be OS sleep or browser suspension, not play time.
    if (this.running && this.wasVisible && !this.suspended && delta >= 0 && delta <= 5000) this.pendingMs += delta;
    this.last = current;
    this.wasVisible = this.visible();
  }

  setRunning(value) {
    this.sample();
    this.running = !!value;
    if (!this.running) this.persist();
  }

  markAllSkip() {
    if (this.record.allSkipUsed) return;
    this.sample();
    this.record.allSkipUsed = true;
    this.persist();
  }

  markUnreadSkip() {
    this.pendingUnreadSkips += 1;
  }

  persist() {
    const latest = this.read();
    const record = {
      totalMs: Math.max(this.record.totalMs, latest?.totalMs || 0) + this.pendingMs,
      allSkipUsed: this.record.allSkipUsed || !!latest?.allSkipUsed,
      unreadSkipCount: Math.max(this.record.unreadSkipCount, latest?.unreadSkipCount || 0) + this.pendingUnreadSkips,
      trackingStartedAt: latest && latest.trackingStartedAt < this.record.trackingStartedAt
        ? latest.trackingStartedAt : this.record.trackingStartedAt,
      partial: this.record.partial || !!latest?.partial || this.storageFailed,
    };
    try {
      this.storage.setItem('vn_play_history', JSON.stringify(record));
      this.record = record;
      this.pendingMs = 0;
      this.pendingUnreadSkips = 0;
    } catch { this.storageFailed = true; record.partial = true; }
    return record;
  }

  snapshot() {
    this.sample();
    const record = this.persist();
    return {
      play_time_seconds: Math.floor(record.totalMs / 1000),
      all_skip_used: record.allSkipUsed ? 1 : 0,
      unread_skip_count: record.unreadSkipCount,
      play_tracking_started_at: record.trackingStartedAt,
      play_history_partial: record.partial ? 1 : 0,
    };
  }
}
