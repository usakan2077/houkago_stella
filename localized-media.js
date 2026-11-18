/* Published artwork and share metadata; no generation or translation services. */
globalThis.StellaMedia = (() => {
  const root = new URL('.', document.currentScript.src);
  const originalSources = new WeakMap();
  const languages = ['ja', 'en', 'zh-CN', 'zh-TW', 'ko'];
  const supported = value => /^(ja|en|zh|ko)(?:[-_]|$)/i.test(value || '');
  function initialLanguage() {
    const requested = new URL(location.href).searchParams.get('lang');
    if (supported(requested)) return StellaI18n.normalize(requested);
    const declared = document.documentElement.dataset.pageLanguage;
    if (languages.includes(declared)) return declared;
    try {
      const saved = localStorage.getItem('vn_language');
      if (supported(saved)) return StellaI18n.normalize(saved);
    } catch (_) {}
    return StellaI18n.browserLanguage();
  }
  function asset(kind, language) {
    if (language === 'ja') return null;
    if (kind === 'campaign' && language === 'ko') return 'assets/campaign/clear-campaign-v1.webp';
    if (language === 'en' && kind === 'logo') return 'assets/images/bg/title_logo_en.webp';
    return {
      logo: `assets/images/bg/title_logo_${language}-v1.webp`,
      poster: `assets/images/promo/poster.${language}-v1.webp`,
      campaign: `assets/campaign/clear-campaign.${language}-v1.webp`,
      share: `assets/images/promo/og.${language}-v1.png`,
    }[kind] || null;
  }
  function openingMovie(language) {
    if (language === 'ko') return 'assets/video/stella-op-ko-v148.mp4';
    return `assets/video/stella-op-${language}-${language.startsWith('zh-') ? 'v147' : 'v143'}.mp4`;
  }
  function subtitles(video, language) {
    if (video.dataset.subtitleLanguage === language) return;
    for (const track of video.querySelectorAll('track[data-stella-subtitles]')) { track.track.mode = 'disabled'; track.remove(); }
    const track = document.createElement('track');
    track.dataset.stellaSubtitles = ''; track.kind = 'subtitles'; track.srclang = language;
    track.label = ({ja:'日本語',en:'English',ko:'한국어','zh-CN':'简体中文','zh-TW':'繁體中文'})[language];
    track.src = new URL(`assets/video/subtitles/op.${language}-v1.vtt`, root).href;
    track.default = language !== 'ja'; video.append(track); track.track.mode = track.default ? 'showing' : 'disabled';
    video.dataset.subtitleLanguage = language;
  }
  function apply(language, { updateUrl = false } = {}) {
    language = StellaI18n.normalize(language);
    document.querySelectorAll('[data-orientation-en]').forEach(node => {
      node.textContent = language === 'en' ? node.dataset.orientationEn : StellaI18n.text(node.dataset.orientationJa, language);
    });
    const gameName = language === 'en' ? 'After School Stella' : StellaI18n.text('放課後のステラ', language);
    document.querySelectorAll('meta[name="application-name"],meta[name="apple-mobile-web-app-title"]').forEach(node => node.content = gameName);
    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) keywords.content = ({
      ja: '放課後のステラ,無料ゲーム,ブラウザゲーム,恋愛アドベンチャー,ノベルゲーム,全年齢,ビジュアルノベル',
      ko: '방과 후의 스텔라,무료 게임,브라우저 게임,연애 어드벤처,비주얼 노벨,한국어 음성',
      en: 'After School Stella,free game,browser game,romance,visual novel',
      'zh-CN': '放学后的星光,免费游戏,浏览器游戏,恋爱冒险,视觉小说,普通话配音',
      'zh-TW': '放學後的星光,免費遊戲,瀏覽器遊戲,戀愛冒險,視覺小說,華語配音',
    })[language];
    const lp = document.body?.dataset.lpVariant;
    document.querySelectorAll('img[data-stella-media]').forEach(image => {
      if (!originalSources.has(image)) originalSources.set(image, image.dataset.originalSrc || image.getAttribute('src'));
      const target = lp && image.dataset.stellaMedia === 'logo'
        ? `lp/assets/images/logo.${language}-v1.webp` : asset(image.dataset.stellaMedia, language);
      const src = target ? new URL(target, root).href : originalSources.get(image);
      if (image.src !== new URL(src, document.baseURI).href) image.setAttribute('src', src);
    });
    document.querySelector('link[rel="manifest"]')?.setAttribute('href', new URL(lp ? `lp/site${language === 'ja' ? '' : '.' + language}.webmanifest` : `manifest.${language}.webmanifest`, root).href);
    const publicRoot = 'https://www.houkago-stella.com/';
    const share = new URL(asset('share', language) || 'og.png', publicRoot).href;
    document.querySelectorAll('meta[property="og:image"],meta[property="og:image:secure_url"],meta[name="twitter:image"]').forEach(node => node.content = share);
    const locale = document.querySelector('meta[property="og:locale"]');
    if (locale) locale.content = ({ja:'ja_JP',en:'en_US',ko:'ko_KR','zh-CN':'zh_CN','zh-TW':'zh_TW'})[language];
    if (lp) {
      const folder = lp === 'ai_solo' ? 'lp/ai/' : 'lp/';
      const canonical = new URL(folder + (language !== 'ja' ? `index.${language}.html` : ''), publicRoot).href;
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical);
      const structured = document.querySelector('script[type="application/ld+json"]');
      if (structured) {
        const data = JSON.parse(structured.textContent);
        data.name = language === 'en' ? 'After School Stella' : StellaI18n.text('放課後のステラ', language);
        data.description = document.querySelector('meta[name="description"]')?.content || '';
        data.image = share;
        data.url = canonical;
        structured.textContent = JSON.stringify(data, null, 2).replaceAll('<', '\\u003c');
      }
      for (const link of document.querySelectorAll('a[href]')) {
        const target = new URL(link.getAttribute('href'), location.href);
        if (target.origin !== location.origin) continue;
        const game = new URL('index.html', root);
        if (target.pathname !== game.pathname) continue;
        target.searchParams.set('lang', language);
        link.setAttribute('href', target.pathname + target.search + target.hash);
      }
    }
    if (updateUrl) {
      const current = new URL(location.href);
      if (lp) current.pathname = new URL(language !== 'ja' ? `index.${language}.html` : './', current).pathname;
      current.searchParams.set('lang', language);
      history.replaceState(history.state, '', current.pathname + current.search + current.hash);
    }
  }
  return { initialLanguage, asset, apply, openingMovie, subtitles };
})();
