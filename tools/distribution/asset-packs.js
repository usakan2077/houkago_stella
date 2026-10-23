/* Distribution-only voice storage. MP3 bytes and per-line gain stay unchanged. */
(() => {
  'use strict';
  const index = globalThis.VN_PACK_INDEX;
  if (!index) throw new Error('Voice pack index is missing');
  const nativeFetch = globalThis.fetch.bind(globalThis);
  const root = new URL('.', document.baseURI);
  const entries = new Map();
  const limit = 12 * 1024 * 1024;
  const aborted = () => new DOMException('Voice request cancelled', 'AbortError');

  function trim() {
    let bytes = [...entries.values()].reduce((sum, e) => sum + (e.data?.byteLength || 0), 0);
    for (const [key, e] of entries) {
      if (bytes <= limit) break;
      if (!e.data || e.users.size) continue;
      bytes -= e.data.byteLength;
      entries.delete(key);
    }
  }

  async function clipResponse(clip, signal) {
    if (signal?.aborted) throw aborted();
    const spec = index.packs[clip.pack];
    if (!spec || clip.offset < 0 || clip.length <= 0 || clip.offset + clip.length > spec.bytes) {
      throw new Error('Invalid voice pack reference');
    }
    let entry = entries.get(clip.pack);
    if (!entry) {
      entry = { controller: new AbortController(), users: new Set(), data: null };
      entries.set(clip.pack, entry);
      entry.promise = (async () => {
        const response = await nativeFetch(new URL(spec.src, root), { signal: entry.controller.signal });
        if (!response.ok) throw new Error('Voice pack unavailable');
        const bytes = await response.arrayBuffer();
        if (bytes.byteLength !== spec.bytes) throw new Error('Incomplete voice pack');
        entry.data = bytes;
        return bytes;
      })().catch(error => {
        if (entries.get(clip.pack) === entry) entries.delete(clip.pack);
        throw error;
      });
    } else {
      entries.delete(clip.pack);
      entries.set(clip.pack, entry);
    }
    const user = {};
    entry.users.add(user);
    let onAbort;
    const cancelled = new Promise((_, reject) => {
      onAbort = () => reject(aborted());
      signal?.addEventListener('abort', onAbort, { once: true });
    });
    try {
      const data = await Promise.race([entry.promise, cancelled]);
      if (signal?.aborted) throw aborted();
      return new Response(data.slice(clip.offset, clip.offset + clip.length), {
        status: 200, headers: { 'Content-Type': 'audio/mpeg', 'Content-Length': String(clip.length) },
      });
    } finally {
      signal?.removeEventListener('abort', onAbort);
      entry.users.delete(user);
      if (!entry.data && !entry.users.size) {
        entry.controller.abort();
        if (entries.get(clip.pack) === entry) entries.delete(clip.pack);
      }
      trim();
    }
  }

  globalThis.VN_PORTAL_VOICE_FETCH = (input, init = {}) => {
    const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url, root);
    const relative = url.href.startsWith(root.href) ? decodeURI(url.href.slice(root.href.length).split('?')[0]) : '';
    const clip = index.clips[relative];
    return clip ? clipResponse(clip, init.signal) : nativeFetch(input, init);
  };
})();
