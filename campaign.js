(() => {
  const base = new URL('.', document.currentScript.src);
  const config = window.STELLA_CAMPAIGN;
  if (!config) return;
  const buttons = [...document.querySelectorAll('[data-campaign-open]')];
  if (!buttons.length) return;
  let dialog, opener, previousOverflow;
  const english = () => document.documentElement.lang === 'en';
  const text = (ja, en) => english() ? en : ja;
  const phase = () => {
    const start = Date.parse(config.startsAt), end = Date.parse(config.endsAt);
    if (Number.isFinite(end) && Date.now() > end) return 'ended';
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start || !config.announcementUrl) return 'preparing';
    return Date.now() < start ? 'scheduled' : Date.now() > end ? 'ended' : 'open';
  };
  const status = () => ({
    preparing: text('開催準備中', 'Coming soon'), scheduled: text('開催予告', 'Starts soon'),
    open: text('キャンペーン開催中', 'Campaign open'), ended: text('応募受付終了', 'Applications closed'),
  })[phase()];
  const el = (tag, value, cls) => {
    const node = document.createElement(tag);
    if (value) node.textContent = value;
    if (cls) node.className = cls;
    return node;
  };
  function externalLink(label, href) {
    const link = el('a', label, 'campaign-link');
    link.href = href; link.target = '_blank'; link.rel = 'noopener noreferrer';
    return link;
  }
  function render() {
    for (const button of buttons) {
      button.setAttribute('aria-label', text('おまけまで完走キャンペーンの詳細・応募ルールを見る', 'View completion campaign details and rules'));
      button.querySelector('[data-campaign-status]').textContent = status() + ' · ' + text('日本国内在住者限定', 'Japan residents only');
      button.querySelector('[data-campaign-title]').textContent = text('おまけまで完走キャンペーン', 'Finish the extra. Share your thoughts.');
      button.querySelector('[data-campaign-prize]').textContent = text('Amazonギフトカード 5,000円分 × 2名', '¥5,000 Amazon.co.jp Gift Cards · 2 winners');
      button.querySelector('[data-campaign-more]').textContent = text('応募ルールを見る', 'View rules');
      const compact = button.querySelector('[data-campaign-compact]');
      if (compact) compact.textContent = {
        preparing: text('完走キャンペーン 開催準備中', 'Completion campaign · Coming soon'),
        scheduled: text('完走キャンペーン 近日開催', 'Completion campaign · Starts soon'),
        open: text('完走キャンペーン開催中！', 'Completion campaign is live!'),
        ended: text('完走キャンペーン 受付終了', 'Completion campaign · Closed'),
      }[phase()];
    }
    if (!dialog) return;
    const scroll = dialog.scrollTop;
    dialog.replaceChildren();
    const close = el('button', text('閉じる ×', 'Close ×'), 'campaign-close');
    close.type = 'button'; close.onclick = () => dialog.close();
    const image = el('img');
    image.src = new URL('assets/campaign/clear-campaign-v1.webp', base).href;
    image.alt = text('放課後のステラ おまけまで完走キャンペーン。抽選で2名にAmazonギフトカード5,000円分。', 'Houkago Stella completion campaign: two winners receive a ¥5,000 Amazon.co.jp Gift Card.');
    image.className = 'campaign-poster'; image.width = 1536; image.height = 864;
    const content = el('div', null, 'campaign-rules');
    const heading = el('h2', text('おまけまで完走キャンペーン', 'Extra completion campaign'));
    heading.id = 'stella-campaign-heading';
    content.append(el('p', status(), 'campaign-status'), heading,
      el('p', text('最後まで遊んでくれた方の中から、抽選で2名にAmazonギフトカード5,000円分をプレゼント！', 'Complete the extra and enter a random draw. Two winners will each receive a ¥5,000 Amazon.co.jp Gift Card.'), 'campaign-lead'));
    const format = value => new Intl.DateTimeFormat(english() ? 'en-GB' : 'ja-JP', { timeZone: 'Asia/Tokyo', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(value));
    if (Number.isFinite(Date.parse(config.endsAt))) content.append(el('p', text('応募締切：', 'Entry deadline: ') + format(config.endsAt) + ' (JST)', 'campaign-deadline'));
    if (phase() === 'preparing') {
      content.append(el('p', text('開催期間と告知ポストは準備中です。応募受付の開始は、公式Xでお知らせします。', 'Dates and the announcement post are being prepared. Applications are not open yet. Follow the official X account for updates.'), 'campaign-notice'));
    } else if (Number.isFinite(Date.parse(config.startsAt))) {
      content.append(el('p', text('応募期間：', 'Entry period: ') + format(config.startsAt) + ' – ' + format(config.endsAt) + ' (JST)', 'campaign-notice'));
    }
    content.append(el('p', text('応募対象：日本国内在住の方。国籍・プレイ言語は問いません。日本語・英語どちらでのプレイも対象です。', 'Eligibility: residents of Japan, regardless of nationality. Both Japanese and English playthroughs qualify.'), 'campaign-eligibility'),
      el('h3', text('応募方法', 'How to enter')));
    const steps = el('ol');
    [text('公式Xアカウント @houkago_stella をフォロー。', 'Follow @houkago_stella on X.'),
      text('公式のキャンペーン告知ポストをリポスト。', 'Repost the official campaign announcement.'),
      text('公式サイトで、おまけシナリオの最後までプレイ。', 'Play the official website version through to the end of the extra.'),
      text('最後の画面の合言葉・クリア日時と、一言感想をXに投稿。合言葉・日時が分かるスクショでもOKです。@houkago_stella と #放課後のステラ #キャンペーン応募 を添えてください。', 'Post the completion passphrase and timestamp with your own brief thoughts on X. A screenshot showing the passphrase and timestamp is also accepted. Include @houkago_stella, #放課後のステラ and #キャンペーン応募.')].forEach(item => steps.append(el('li', item)));
    content.append(steps, el('h3', text('おまけへの入り方・すでにクリアした方へ', 'Finding the extra / existing players')),
      el('p', text('3人全員のGood Endを見た後、第4章冒頭の分岐からおまけに進めます。すでにクリアした方も、分岐前のセーブを使っておまけを再プレイすればコードを受け取れます。', 'After seeing all three Good Endings, enter the extra via the choice at the start of Chapter 4. Existing players can replay the extra from a save before that choice to receive a code.')),
      el('h3', text('応募ルール・当選連絡', 'Rules and winner notification')));
    const rules = el('ul');
    [text('応募・プレイは無料です。商品の購入、有料記事の購入、寄付は必要ありません。', 'Playing and entering are free. No purchase, paid article or donation is required.'),
      text('応募は1人1口。複数アカウントでの重複応募、他人のコード・画像の流用、記録の改変による応募は無効です。', 'One entry per person. Multiple-account entries, copied codes/screenshots and falsified records are invalid.'),
      text('応募投稿は抽選・確認が終わるまで公開し、公式アカウントのフォローと告知のリポストを維持してください。投稿内容や条件を確認できない場合は対象外となることがあります。', 'Keep your entry public, follow the official account and retain your repost until verification is complete. Entries that cannot be verified may be ineligible.'),
      text('感想の長さや肯定・否定で当選確率は変わりません。物語の結末など、大きなネタバレは控えてください。', 'Your opinion and its length do not affect your chances. Please avoid major story spoilers.'),
      text('締切後に応募条件を確認して抽選します。当選候補には公式 @houkago_stella からDMで連絡します。DMを受け取れるようにし、連絡から7日以内にご返信ください。返信がない場合は再抽選します。', 'Eligible entries are drawn at random after the deadline. Potential winners will receive a DM from @houkago_stella. Allow DMs and reply within seven days, or another winner will be drawn.'),
      text('応募が2名未満の場合は、条件を満たした応募者数が当選者数の上限となります。賞品はAmazon.co.jpで利用できるギフトカードです。', 'If fewer than two people qualify, the number of winners cannot exceed the number of eligible entrants. Prizes are gift cards for Amazon.co.jp.'),
      text('応募投稿・プレイ記録・連絡先は、応募確認・抽選・賞品送付・お問い合わせ対応に使用します。', 'Entry posts, play records and contact details are used to verify eligibility, draw winners, deliver prizes and handle inquiries.')].forEach(item => rules.append(el('li', item)));
    content.append(rules);
    const actions = el('div', null, 'campaign-dialog-actions');
    actions.append(externalLink(text('公式Xを見る', 'Official X account'), config.officialAccountUrl));
    if (config.announcementUrl) actions.append(externalLink(text('告知ポストを見る・リポストする', 'View and repost announcement'), config.announcementUrl));
    content.append(actions,
      el('p', text('主催・お問い合わせ：放課後のステラ制作チーム（公式X @houkago_stella）', 'Organized by the Houkago Stella team. Contact: @houkago_stella.'), 'campaign-fineprint'),
      el('p', text('本キャンペーンは放課後のステラ制作チームによる提供です。Amazon.co.jpは本キャンペーンのスポンサーではありません。AmazonおよびAmazon.co.jpはAmazon.com, Inc.またはその関連会社の商標です。', 'This campaign is provided by the Houkago Stella team. Amazon.co.jp is not a sponsor. Amazon and Amazon.co.jp are trademarks of Amazon.com, Inc. or its affiliates.'), 'campaign-fineprint'));
    dialog.append(close, image, content);
    dialog.scrollTop = scroll;
  }
  for (const button of buttons) button.onclick = () => {
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.id = 'stella-campaign-dialog';
      dialog.className = 'modal stella-campaign-dialog hidden';
      dialog.setAttribute('aria-labelledby', 'stella-campaign-heading');
      document.body.append(dialog);
      dialog.addEventListener('keydown', event => {
        if (event.key === 'Escape') { event.preventDefault(); dialog.close(); }
      });
      dialog.addEventListener('click', event => {
        const rect = dialog.getBoundingClientRect();
        if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
      });
      dialog.addEventListener('close', () => { dialog.classList.add('hidden'); document.body.style.overflow = previousOverflow; opener?.focus({ preventScroll: true }); });
    }
    opener = button; previousOverflow = document.body.style.overflow;
    render(); dialog.classList.remove('hidden'); dialog.showModal(); dialog.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  };
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  render();
})();
