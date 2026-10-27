/* Resolve the dialogue fonts before play. A failed/slow web font pins the
 * system font for this page, so a late network response cannot reflow text. */
async function prepareStellaFonts(texts = {}, options = {}) {
  const doc = options.document || document;
  const root = doc.documentElement;
  if (root.classList.contains('vn-system-fonts')) return 'system';
  let timer;
  const system = () => { root.classList.add('vn-system-fonts'); return 'system'; };
  const load = async () => {
    const stylesheet = await (options.stylesReady || globalThis.stellaFontStylesReady || Promise.resolve(true));
    if (!stylesheet || !doc.fonts?.load) return 'system';
    const warmup = doc.getElementById('font-warmup')?.textContent || '';
    const sample = [...new Set((warmup + Object.values(texts).join('')
      + 'あいうえお桜咲花園月夜野勇ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789“”‘’—…！？').replace(/\s/g, ''))].join('');
    const faces = await Promise.all([
      doc.fonts.load('400 26px "Shippori Mincho B1"', sample),
      doc.fonts.load('500 28px "Cormorant Garamond"', sample),
    ]);
    if (faces.some(loaded => !loaded.length)) return 'system';
    await doc.fonts.ready;
    return 'web';
  };
  try {
    const result = await Promise.race([
      load(), new Promise(resolve => { timer = setTimeout(() => resolve('system'), options.timeout ?? 8000); }),
    ]);
    return result === 'web' && !root.classList.contains('vn-system-fonts') ? 'web' : system();
  } catch (_) { return system(); }
  finally { clearTimeout(timer); }
}
