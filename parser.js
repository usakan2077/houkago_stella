/**
 * parser.js - スクリプトパーサー
 *
 * .md 形式のシナリオスクリプトを解析してコマンド配列に変換します。
 *
 * ■ スクリプト書式
 *
 * # ラベル名               ← シーンの区切り / ジャンプ先
 * // コメント              ← 無視されます
 * ---                      ← 区切り線 (無視)
 *
 * @scene bg_name [effect]  ← 背景変更  (effect: fade/instant/slide_left/slide_right)
 * @bgm filename.mp3        ← BGM再生
 * @bgm stop                ← BGM停止
 * @se  filename.mp3        ← SE再生 (1回のみ)
 *
 * @show char pos [expr] [effect]  ← キャラ表示
 *   pos   : left / center / right
 *   expr  : normal / happy / sad / angry / surprised / shy / thinking / excited ...
 *   effect: fade_in / slide_in_left / slide_in_right / pop_in / instant
 *
 * @hide char_id [effect]   ← キャラ非表示 (char_idまたはpos)
 *   effect: fade_out / slide_out_left / slide_out_right / instant
 * @hide_all [effect]       ← 全キャラ非表示
 *
 * @expr char_id expr       ← 表情変更 (表示位置はそのまま)
 * @move char_id new_pos [effect] ← キャラ移動
 *
 * @still image_name [effect]   ← スチル(イベントCG)表示
 *   effect: fade_in / slide_in_bottom
 *   画像パス: assets/images/stills/{image_name}.jpg
 * @still_hide [effect]          ← スチル非表示
 *
 * @wait 1000               ← 指定ms待機 (スキップ時は無視)
 *
 * ─── フラグ操作 ────────────────────────────────────────────
 * @flag name value         ← フラグを任意の値にセット
 *                              例) @flag has_met_sakura true
 * @flag_add name amount    ← 数値フラグを加算
 *                              例) @flag_add sakura_favor 10
 * @flag_sub name amount    ← 数値フラグを減算
 *                              例) @flag_sub sakura_favor 5
 * @flag_toggle name        ← ブールフラグを反転
 *                              例) @flag_toggle is_rainy
 *
 * ─── 条件分岐 ─────────────────────────────────────────────
 * @if flag op value -> label  ← 条件を満たせばラベルへジャンプ
 *   op: == / != / >= / > / <= / <
 *   例) @if sakura_favor >= 30 -> sakura_route
 *   例) @if has_met_sakura == true -> sakura_event
 *   ※条件を満たさない場合は次のコマンドへ続行
 *
 * ─── ルート自動選択 ───────────────────────────────────────
 * @route_select flag1:label1 flag2:label2 ... fallback_label
 *   ← 数値フラグが最大のルートへジャンプ。全て0の場合はfallbackへ
 *   例) @route_select sakura_favor:sakura_route kotoha_favor:kotoha_route mahiru_favor:mahiru_route bad_end
 *
 * ─── ジャンプ / 終了 ──────────────────────────────────────
 * @jump label_name         ← ラベルジャンプ
 * @end "エンディングタイトル"   ← ゲーム終了
 *
 * ─── 演出 ─────────────────────────────────────────────────
 * @window_color charKey       ← テキストウィンドウの色をキャラカラーに変更
 *   charKey: sakura / kotoha / mahiru / reset
 *   ※幕間・視点切り替えシーンで使用。0.7sでフェード遷移。
 *
 * ─── 選択肢 ───────────────────────────────────────────────
 * @choice                  ← 選択肢ブロック開始
 * - "選択テキスト" -> label_name
 * - "選択テキスト" [flag+10] -> label_name        ← フラグ加算付き
 * - "選択テキスト" [flag-5,flag2+3] -> label_name ← 複数フラグ修飾
 *   ※[flag+N] はその選択肢を選んだときに自動でフラグを加算/減算する
 *
 * > ナレーションテキスト   ← 地の文 (名前なし)
 * charkey: セリフテキスト  ← キャラクターのセリフ
 * charkey「セリフテキスト」← 日本語スタイルのセリフ
 */
class ScriptParser {

  /**
   * スクリプトテキストを解析してラベル→コマンド配列のオブジェクトを返す
   * @param {string} script - .md ファイルの内容
   * @returns {Object} { labelName: [ {cmd, ...}, ... ], ... }
   */
  parse(script) {
    const labels = {};
    let currentLabel = '__preamble__';
    let currentCmds  = [];
    let inChoice     = false;
    let choices      = [];

    const lines = script.split(/\r?\n/);

    for (let i = 0; i < lines.length; i++) {
      const raw  = lines[i];
      const line = raw.trim();

      // 空行・コメント・区切り線はスキップ
      // ただし選択肢ブロック中でも空行はスキップ
      if (!line || line.startsWith('//') || line === '---') continue;

      // ---- 選択肢ブロック中 ----
      if (inChoice) {
        if (line.startsWith('-')) {
          const choice = this._parseChoiceItem(line);
          if (choice) choices.push(choice);
          continue;
        } else {
          // 選択肢ブロック終了 → コミット
          currentCmds.push({ cmd: 'choice', options: [...choices] });
          inChoice = false;
          choices  = [];
          // fall through: この行を通常通り処理
        }
      }

      // ---- ラベル定義 ----
      if (line.startsWith('# ')) {
        // 直前のラベルを保存
        if (inChoice && choices.length > 0) {
          currentCmds.push({ cmd: 'choice', options: [...choices] });
          inChoice = false;
          choices  = [];
        }
        labels[currentLabel] = [...currentCmds];
        currentLabel = line.slice(2).trim();
        currentCmds  = [];
        continue;
      }

      // ---- @ コマンド ----
      if (line.startsWith('@')) {
        const parsed = this._parseCommand(line);
        if (parsed.cmd === 'choice') {
          inChoice = true;
          choices  = [];
        } else {
          currentCmds.push(parsed);
        }
        continue;
      }

      // ---- ナレーション (> テキスト) ----
      if (line.startsWith('> ')) {
        const raw = line.slice(2).trim();
        const climaxM = raw.match(/^\*\*(.+)\*\*$/);
        if (climaxM) {
          currentCmds.push({ cmd: 'narrate', text: climaxM[1], emphasis: 'climax' });
          continue;
        }
        const innerM = raw.match(/^\*(.+)\*$/);
        if (innerM) {
          currentCmds.push({ cmd: 'narrate', text: innerM[1], emphasis: 'inner' });
          continue;
        }
        currentCmds.push({ cmd: 'narrate', text: raw });
        continue;
      }

      // ---- セリフ: charkey: テキスト ----
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0 && colonIdx <= 20) {
        const charKey  = line.slice(0, colonIdx).trim();
        const rawText  = line.slice(colonIdx + 1).trim();
        // 前後の引用符を除去（内部に閉じ引用符を含む場合は除去しない）
        const text = rawText
          .replace(/^「((?:(?!」).)*)」$/, '$1')
          .replace(/^"((?:(?!").)*)"$/, '$1')
          .replace(/^'((?:(?!'').)*)'$/, '$1');
        currentCmds.push({ cmd: 'say', char: charKey, text });
        continue;
      }

      // ---- セリフ: charkey「テキスト」 ----
      const jpMatch = line.match(/^(\S+)「(.+)」$/);
      if (jpMatch) {
        currentCmds.push({ cmd: 'say', char: jpMatch[1], text: jpMatch[2] });
        continue;
      }

      // ---- 認識できない行は無視 ----
    }

    // 最後のラベルを保存
    if (inChoice && choices.length > 0) {
      currentCmds.push({ cmd: 'choice', options: [...choices] });
    }
    labels[currentLabel] = [...currentCmds];

    return labels;
  }

  // -------------------------------------------------------
  // private: @ コマンドのパース
  // -------------------------------------------------------
  _parseCommand(line) {
    const content  = line.slice(1); // '@' を除去
    const spaceIdx = content.indexOf(' ');
    const cmdName  = spaceIdx === -1 ? content : content.slice(0, spaceIdx);
    const argsStr  = spaceIdx === -1 ? '' : content.slice(spaceIdx + 1).trim();
    const args     = argsStr ? argsStr.split(/\s+/) : [];

    switch (cmdName) {

      case 'scene':
        return { cmd: 'scene', bg: args[0], effect: args[1] || 'fade' };

      case 'bgm':
        if (!args[0] || args[0] === 'stop')
          return { cmd: 'bgm', action: 'stop' };
        return { cmd: 'bgm', action: 'play', track: args[0] };

      case 'bgm_sync':
        return { cmd: 'bgm_sync', seconds: parseFloat(args[0]) || 0 };

      case 'ending_intro':
        return {
          cmd: 'ending_intro',
          track: (!args[0] || args[0] === 'current') ? null : args[0],
          profile: args[1] || null,
          ms: parseInt(args[2], 10) || 0,
        };

      case 'skip_lock':
        return { cmd: 'skip_lock' };

      case 'se':
        if (!args[0] || args[0] === 'stop')
          return { cmd: 'se', action: 'stop' };
        return { cmd: 'se', file: args[0], loop: args[1] === 'loop' };

      case 'show':
        return {
          cmd:    'show',
          char:   args[0],
          pos:    args[1] || 'center',
          expr:   args[2] || 'normal',
          effect: args[3] || 'fade_in',
        };

      case 'hide':
        return { cmd: 'hide', target: args[0], effect: args[1] || 'fade_out' };

      case 'hide_all':
        return { cmd: 'hide_all', effect: args[0] || 'fade_out' };

      case 'expr':
        return { cmd: 'expr', char: args[0], expr: args[1] || 'normal' };

      case 'move':
        return { cmd: 'move', char: args[0], pos: args[1], effect: args[2] || 'slide' };

      case 'still':
        return { cmd: 'still', image: args[0], effect: args[1] || 'fade_in' };

      case 'still_hide':
        return { cmd: 'still_hide', effect: args[0] || 'fade_out' };

      case 'wait':
        return { cmd: 'wait', ms: parseInt(args[0]) || 1000 };

      case 'effect':
        // @effect sakura / @effect rain / @effect snow / @effect stop
        return { cmd: 'effect', type: args[0] || 'stop' };

      case 'shake':
        // @shake [strength] [duration_ms]
        return { cmd: 'shake', strength: parseInt(args[0]) || 8, duration: parseInt(args[1]) || 500 };

      case 'flag':
        return { cmd: 'flag', name: args[0], value: args[1] };

      case 'flag_add':
        return { cmd: 'flag_add', name: args[0], amount: Number(args[1]) || 0 };

      case 'flag_sub':
        return { cmd: 'flag_sub', name: args[0], amount: Number(args[1]) || 0 };

      case 'flag_toggle':
        return { cmd: 'flag_toggle', name: args[0] };

      case 'if': {
        // @if flag_name op value -> label
        // args: [flag, op, value, '->', label]
        return {
          cmd:   'if',
          flag:  args[0],
          op:    args[1],
          value: args[2],
          to:    args[4], // args[3] は '->'
        };
      }

      case 'route_select': {
        // @route_select flag1:label1 flag2:label2 ... fallback_label
        const routes   = [];
        let   fallback = null;
        for (const arg of args) {
          if (arg.includes(':')) {
            const [flag, label] = arg.split(':');
            routes.push({ flag, label });
          } else {
            fallback = arg;
          }
        }
        return { cmd: 'route_select', routes, fallback };
      }

      case 'jump':
        return { cmd: 'jump', to: args[0] };

      case 'end': {
        // @end "タイトル文字列" または @end "タイトル" -> next_label
        const endMatch = argsStr.match(/^"(.+)"\s*->\s*(\S+)$/) ||
                         argsStr.match(/^"(.+)"$/) ||
                         argsStr.match(/^(.+)$/);
        const title = endMatch ? endMatch[1] : 'END';
        const next  = (argsStr.match(/^"(.+)"\s*->\s*(\S+)$/) || [])[2] || null;
        return { cmd: 'end', title, next };
      }

      case 'credits':
        // @credits bgm_file.mp3 [credits_profile_key]
        return { cmd: 'credits', bgm: args[0] || null, profile: args[1] || null };

      case 'choice':
        return { cmd: 'choice' }; // 実際の処理は inChoice フラグで行う

      case 'window_color':
        // @window_color sakura / kotoha / mahiru / reset
        return { cmd: 'window_color', target: args[0] || 'reset' };

      default:
        console.warn(`[Parser] 不明なコマンド: ${cmdName}`);
        return { cmd: 'unknown', raw: line };
    }
  }

  // -------------------------------------------------------
  // private: 選択肢アイテムのパース
  // - "テキスト" -> label
  // - "テキスト" [flag+10] -> label
  // - "テキスト" [flag+10,flag2-5] -> label
  // -------------------------------------------------------
  _parseChoiceItem(line) {
    // オプションの [flag修飾子] に対応した正規表現
    const match = line.match(
      /^-\s*(?:"([^"]+)"|「([^」]+)」|(.+?))\s*(?:\[([^\]]*)\])?\s*->\s*(\S+)\s*$/
    );
    if (!match) {
      console.warn(`[Parser] 選択肢の書式エラー: ${line}`);
      return null;
    }
    const text  = (match[1] || match[2] || match[3]).trim();
    const flags = match[4] ? this._parseFlagModifiers(match[4]) : [];
    const next  = match[5];
    return { text, next, flags };
  }

  // -------------------------------------------------------
  // private: フラグ修飾子文字列をパース
  // "sakura_favor+10,kotoha_favor-5" →
  //   [ {name:'sakura_favor', op:'+', amount:10}, ... ]
  // -------------------------------------------------------
  _parseFlagModifiers(str) {
    const mods = [];
    for (const part of str.split(',')) {
      const m = part.trim().match(/^(\w+)([+-])(\d+)$/);
      if (m) mods.push({ name: m[1], op: m[2], amount: Number(m[3]) });
      else console.warn(`[Parser] フラグ修飾子の書式エラー: ${part}`);
    }
    return mods;
  }
}
