/* ===================================================================
   scenario-io.js — .md ⇔ 構造化オブジェクトのパース/シリアライズ
   ====================================================================
   Phase 1 では「テキスト行のキー参照を編集してロケールJSONに保存」しか
   行わないので、.md は読み取り専用扱い。ただし将来 Phase 2/3 で
   行の挿入/削除/コマンド編集をするため、ここでは構造化までやっておく。

   各行は以下の型のいずれか:
     { type: 'blank' }
     { type: 'comment', raw: '// ...' }
     { type: 'separator', raw: '---' }
     { type: 'label', name: 'start', raw: '# start' }
     { type: 'command', raw: '@xxx ...', cmd: 'xxx', args: ['...'] }
     { type: 'choice_start', raw: '@choice' }
     { type: 'choice_option', raw: '- $key [mods] -> target',
       key, modifiers, target }
     { type: 'narration', raw: '> ...', key, text }
     { type: 'dialogue', raw: 'char: $key', char, key, text, jpStyle }
     { type: 'unknown', raw }
   =================================================================== */

window.ScenarioIO = (() => {

  const KEY_RE = /^\$([\w.]+)$/;

  function parse(mdText) {
    const lines = mdText.split(/\r?\n/);
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      out.push(parseLine(raw));
    }
    // 末尾の改行で生まれた空行を1つだけ落とす（保存時に再付与）
    if (out.length && out[out.length - 1].type === 'blank' && lines[lines.length - 1] === '') {
      out.pop();
      out.__trailingNewline = true;
    } else {
      out.__trailingNewline = false;
    }
    return out;
  }

  function parseLine(raw) {
    const trimmed = raw.trim();
    if (trimmed === '') return { type: 'blank', raw };
    if (trimmed.startsWith('//')) return { type: 'comment', raw };
    if (trimmed === '---') return { type: 'separator', raw };

    if (trimmed.startsWith('#')) {
      const name = trimmed.slice(1).trim();
      return { type: 'label', name, raw };
    }

    // @command 系
    if (trimmed.startsWith('@')) {
      if (trimmed === '@choice') return { type: 'choice_start', raw };
      // それ以外の @ コマンド
      const m = trimmed.match(/^@(\S+)\s*(.*)$/);
      const cmd = m ? m[1] : '';
      const argsStr = m ? m[2] : '';
      const args = argsStr ? argsStr.split(/\s+/) : [];
      return { type: 'command', raw, cmd, args };
    }

    // 選択肢オプション: - $key [mods] -> label
    if (trimmed.startsWith('-')) {
      const body = trimmed.slice(1).trim();
      // 末尾の "-> label"
      const arrowMatch = body.match(/^(.*?)\s*->\s*(\S+)\s*$/);
      const target = arrowMatch ? arrowMatch[2] : null;
      const leftPart = arrowMatch ? arrowMatch[1] : body;
      // 修飾 [flag+10,flag2-5]
      const modMatch = leftPart.match(/^(.*?)\s*\[([^\]]*)\]\s*$/);
      const modifiers = modMatch
        ? modMatch[2].split(',').map(s => s.trim()).filter(Boolean)
        : [];
      const textOrKey = (modMatch ? modMatch[1] : leftPart).trim();
      const km = textOrKey.match(KEY_RE);
      const key = km ? km[1] : null;
      const text = km ? null : stripQuotes(textOrKey);
      return { type: 'choice_option', raw, key, text, modifiers, target };
    }

    // ナレーション: > $key or > raw
    if (trimmed.startsWith('>')) {
      const body = trimmed.slice(1).trim();
      const km = body.match(KEY_RE);
      return {
        type: 'narration',
        raw,
        key: km ? km[1] : null,
        text: km ? null : body,
      };
    }

    // セリフ: charkey: $key  / charkey「text」
    const colonMatch = trimmed.match(/^([A-Za-z_][\w]*)\s*[:：]\s*(.*)$/);
    if (colonMatch) {
      const char = colonMatch[1];
      const body = colonMatch[2].trim();
      const km = body.match(KEY_RE);
      return {
        type: 'dialogue',
        raw,
        char,
        key: km ? km[1] : null,
        text: km ? null : body,
        jpStyle: false,
      };
    }
    const jpMatch = trimmed.match(/^([A-Za-z_][\w]*)「(.*)」$/);
    if (jpMatch) {
      return {
        type: 'dialogue',
        raw,
        char: jpMatch[1],
        key: null,
        text: jpMatch[2],
        jpStyle: true,
      };
    }

    return { type: 'unknown', raw };
  }

  function stripQuotes(s) {
    return s.replace(/^["'](.*)["']$/, '$1');
  }

  /**
   * 構造化された行配列 → .md テキスト
   * Phase 1 では各行の raw をそのまま使う。
   * Phase 2/3 で構造化フィールドからの再生成が必要になったら拡張する。
   */
  function serialize(parsedLines) {
    const out = parsedLines.map(l => l.raw ?? '').join('\n');
    if (parsedLines.__trailingNewline) return out + '\n';
    return out;
  }

  /**
   * パース結果から「ラベル(=シーン)ごとの行範囲」を抽出する
   * 各 label: { name, startIdx, endIdx (exclusive), lineCount }
   */
  function extractLabels(parsedLines) {
    const labels = [];
    let current = null;
    parsedLines.forEach((line, idx) => {
      if (line.type === 'label') {
        if (current) {
          current.endIdx = idx;
          current.lineCount = countContent(parsedLines, current.startIdx + 1, idx);
          labels.push(current);
        }
        current = { name: line.name, startIdx: idx, endIdx: -1, lineCount: 0 };
      }
    });
    if (current) {
      current.endIdx = parsedLines.length;
      current.lineCount = countContent(parsedLines, current.startIdx + 1, parsedLines.length);
      labels.push(current);
    }
    return labels;
  }

  function countContent(lines, start, end) {
    let n = 0;
    for (let i = start; i < end; i++) {
      const t = lines[i].type;
      if (t !== 'blank' && t !== 'comment' && t !== 'separator') n++;
    }
    return n;
  }

  /**
   * 新規行オブジェクトを生成。raw 文字列も同時にセット。
   *   makeLine('blank')
   *   makeLine('comment', { text: 'foo' })
   *   makeLine('label', { name: 'morning' })
   *   makeLine('narration', { key: 'chapter1.start.t099' })
   *   makeLine('dialogue', { char: 'player', key: '...' })
   *   makeLine('command', { cmd: 'scene', args: ['classroom'] })
   *   makeLine('choice_start')
   *   makeLine('choice_option', { key: 'choices.chapterN.foo', modifiers: ['flag+5'], target: 'some_label' })
   */
  function makeLine(type, opts = {}) {
    switch (type) {
      case 'blank':
        return { type: 'blank', raw: '' };
      case 'comment':
        return { type: 'comment', raw: '// ' + (opts.text || '') };
      case 'separator':
        return { type: 'separator', raw: '---' };
      case 'label': {
        const name = opts.name || 'new_label';
        return { type: 'label', name, raw: '# ' + name };
      }
      case 'narration': {
        const key = opts.key || null;
        const text = opts.text || null;
        const raw = '> ' + (key ? '$' + key : (text || ''));
        return { type: 'narration', key, text, raw };
      }
      case 'dialogue': {
        const char = opts.char || 'player';
        const key = opts.key || null;
        const text = opts.text || null;
        const raw = `${char}: ${key ? '$' + key : (text || '')}`;
        return { type: 'dialogue', char, key, text, jpStyle: false, raw };
      }
      case 'command': {
        const cmd = opts.cmd || 'wait';
        const args = opts.args || [];
        const raw = '@' + cmd + (args.length ? ' ' + args.join(' ') : '');
        return { type: 'command', cmd, args, raw };
      }
      case 'choice_start':
        return { type: 'choice_start', raw: '@choice' };
      case 'choice_option': {
        const key = opts.key || null;
        const text = opts.text || null;
        const modifiers = opts.modifiers || [];
        const target = opts.target || '';
        const left = key ? '$' + key : `"${text || ''}"`;
        const mods = modifiers.length ? ` [${modifiers.join(',')}]` : '';
        const arrow = target ? ` -> ${target}` : '';
        const raw = `- ${left}${mods}${arrow}`;
        return { type: 'choice_option', key, text, modifiers, target, raw };
      }
      default:
        return { type: 'unknown', raw: opts.raw || '' };
    }
  }

  /**
   * 選択肢ブロックの再構築用: 構造化された choice_option を raw に直す。
   */
  function rebuildChoiceOptionRaw(line) {
    const left = line.key ? '$' + line.key : `"${line.text || ''}"`;
    const mods = (line.modifiers && line.modifiers.length) ? ` [${line.modifiers.join(',')}]` : '';
    const arrow = line.target ? ` -> ${line.target}` : '';
    return `- ${left}${mods}${arrow}`;
  }

  return { parse, parseLine, serialize, extractLabels, makeLine, rebuildChoiceOptionRaw };
})();
