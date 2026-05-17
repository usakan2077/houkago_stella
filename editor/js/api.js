/* ===================================================================
   api.js — サーバAPIクライアント
   静的ファイルの読込と、保存エンドポイントへのPOST
   =================================================================== */

window.EditorAPI = (() => {

  async function fetchText(path) {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) throw new Error(`fetch failed (${res.status}): ${path}`);
    return await res.text();
  }

  async function fetchJSON(path) {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) throw new Error(`fetch failed (${res.status}): ${path}`);
    return await res.json();
  }

  async function saveScenario(file, content) {
    return _save('/api/save/scenario', file, content);
  }

  async function saveLocale(file, content) {
    return _save('/api/save/locale', file, content);
  }

  async function _save(endpoint, file, content) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file, content }),
    });
    let body;
    try { body = await res.json(); } catch { body = {}; }
    if (!res.ok) {
      throw new Error(body.error || `save failed (${res.status})`);
    }
    return body;
  }

  return { fetchText, fetchJSON, saveScenario, saveLocale };
})();
