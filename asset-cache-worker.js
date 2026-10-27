/* Runtime-only cache: no bulk install download, no cached HTML/JS/scenario.
 * Versioned asset URLs let old and new game tabs coexist without stale media. */
'use strict';
const ASSET_ROOT = new URL('assets/', self.registration.scope);
const CACHE_PREFIX = 'stella-media-1:' + ASSET_ROOT.href + ':';

self.addEventListener('install', event => { event.waitUntil(self.skipWaiting()); });
self.addEventListener('activate', event => { event.waitUntil(self.clients.claim()); });

function cacheIdentity(request) {
  const url = new URL(request.url);
  const version = url.searchParams.get('_stella_v');
  if (request.method !== 'GET' || url.origin !== ASSET_ROOT.origin
    || !url.pathname.startsWith(ASSET_ROOT.pathname) || !version || version.length > 80) return null;
  // Large streaming videos must not fill the cache writer or tee/buffer a
  // whole OP while foreground images and voices need the connection.
  if (/\.(?:mp4|webm|mov)$/i.test(url.pathname)) return null;
  return CACHE_PREFIX + version;
}

async function rangedResponse(response, range) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(range || '');
  if (!match || (!match[1] && !match[2])) return null;
  const data = await response.arrayBuffer();
  const length = data.byteLength;
  const start = match[1] ? Number(match[1]) : Math.max(0, length - Number(match[2]));
  const end = match[1] ? (match[2] ? Math.min(Number(match[2]), length - 1) : length - 1) : length - 1;
  if (start >= length || start > end) return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${length}` } });
  const headers = new Headers(response.headers);
  headers.set('Content-Range', `bytes ${start}-${end}/${length}`);
  headers.set('Content-Length', String(end - start + 1));
  headers.set('Accept-Ranges', 'bytes');
  return new Response(data.slice(start, end + 1), { status: 206, headers });
}

async function assetResponse(event, name) {
  const request = event.request;
  const key = new Request(request.url);
  let cache;
  try {
    cache = await caches.open(name);
    const cached = await cache.match(key);
    if (cached) {
      if (!request.headers.has('Range')) return cached;
      const partial = await rangedResponse(cached, request.headers.get('Range'));
      if (partial) return partial;
    }
  } catch (_) { /* Storage blocked/full: retain normal online playback. */ }
  const response = await fetch(request);
  let complete = response.status === 200 ? response.clone() : null;
  // A media request may return the *entire* file with status 206. Preserve it
  // as a full response; partial video downloads never trigger a full download.
  if (response.status === 206) {
    const match = /^bytes 0-(\d+)\/(\d+)$/.exec(response.headers.get('Content-Range') || '');
    if (match && Number(match[1]) + 1 === Number(match[2])) {
      const headers = new Headers(response.headers);
      headers.delete('Content-Range');
      complete = new Response(response.clone().body, { status: 200, headers });
    }
  }
  if (cache && complete && response.type !== 'opaque') {
    event.waitUntil(cache.put(key, complete).catch(() => {}));
  }
  return response;
}

self.addEventListener('fetch', event => {
  const name = cacheIdentity(event.request);
  if (name) event.respondWith(assetResponse(event, name));
});
