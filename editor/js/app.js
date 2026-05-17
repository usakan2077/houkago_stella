/* ===================================================================
   app.js — エディタのメインオーケストレーター
   =================================================================== */

(function () {

  const SCENARIO_FILES = [
    'chapter1.md', 'chapter2.md', 'chapter3.md', 'chapter4.md',
    'chapter5.md', 'chapter6.md', 'chapter7.md', 'chapter8.md',
    'bad_end.md',
    'route_sakura.md', 'route_kotoha.md', 'route_mahiru.md',
  ];

  const LOCALE_FILES = ['scenario.ja.json', 'scenario.en.json'];

  const state = {
    files: {},
    locales: { ja: {}, en: {} },
    originalLocales: { ja: {}, en: {} },
    originalRaws: {},
    activeFile: null,
    activeLabel: null,
    previewLang: 'ja',
    selectedLineIdx: null,
    assets: { chars: {} },
  };

  async function boot() {
    setStatus('読込中...');
    try {
      const assetsPromise = EditorAPI.fetchJSON('/api/assets');
      await Promise.all([loadScenarios(), loadLocales()]);
      const assets = await assetsPromise;
      state.assets = assets;
      EditorCommandEditor.setAssets(assets);
      EditorPreview.setAssets(assets);
      EditorCommandEditor.setLabels(collectAllLabels());
      if (typeof VN_CONFIG !== 'undefined') {
        EditorPreview.setBackgroundsConfig(VN_CONFIG.backgrounds || {});
      }
    } catch (e) {
      console.error(e);
      setStatus('読込失敗: ' + e.message, 'error');
      toast('読込失敗: ' + e.message, 'error');
      return;
    }

    EditorTree.init(document.getElementById('tree-container'), {
      onSelectLabel,
      onAddLabel,
      onDeleteLabel,
    });
    EditorLineEditor.init(document.getElementById('editor-container'), {
      onTextChange,
      onCommandChange,
      onLineSelect,
      onInsertLine,
      onDeleteLine,
    });
    EditorPreview.init(document.getElementById('preview-container'));
    EditorPreview.showPlaceholder();

    EditorLineEditor.setLocales(state.locales);
    EditorLineEditor.setAllLabels(collectAllLabels());
    EditorLineEditor.setCharacters(Object.keys(state.assets.chars || {}));
    EditorTree.setFiles(state.files);

    document.getElementById('btn-save').addEventListener('click', save);
    document.querySelectorAll('[data-preview-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.previewLang = btn.dataset.previewLang;
        document.querySelectorAll('[data-preview-lang]').forEach(b => b.classList.toggle('active', b === btn));
        refreshPreview();
      });
    });

    window.addEventListener('beforeunload', (e) => {
      if (isDirty()) { e.preventDefault(); e.returnValue = ''; }
    });

    setStatus(`${SCENARIO_FILES.length} ファイル / ${countKeys()} キー`);
  }

  async function loadScenarios() {
    for (const f of SCENARIO_FILES) {
      const raw = await EditorAPI.fetchText(`../scenarios/${f}`);
      const parsed = ScenarioIO.parse(raw);
      const labels = ScenarioIO.extractLabels(parsed);
      state.files[f] = { raw, parsed, labels, dirty: false };
      state.originalRaws[f] = raw;
    }
  }

  async function loadLocales() {
    const [ja, en] = await Promise.all(
      LOCALE_FILES.map(f => EditorAPI.fetchJSON(`../locales/${f}`))
    );
    state.locales.ja = ja;
    state.locales.en = en;
    state.originalLocales.ja = JSON.parse(JSON.stringify(ja));
    state.originalLocales.en = JSON.parse(JSON.stringify(en));
  }

  function collectAllLabels() {
    const out = [];
    for (const f of Object.keys(state.files)) {
      for (const lbl of state.files[f].labels) out.push(lbl.name);
    }
    return [...new Set(out)].sort();
  }

  // ファイル名 → key 用の prefix（chapter1.md → chapter1）
  function filePrefix(fileName) {
    return fileName.replace(/\.md$/, '');
  }

  // ラベル + ファイルに対する次の text key を計算
  function nextTextKey(fileName, labelName, parsed) {
    const pfx = `${filePrefix(fileName)}.${labelName}.t`;
    let maxN = 0;
    for (const line of parsed) {
      if (line.key && line.key.startsWith(pfx)) {
        const rest = line.key.slice(pfx.length);
        const n = parseInt(rest, 10);
        if (!isNaN(n) && n > maxN) maxN = n;
      }
    }
    return `${pfx}${String(maxN + 1).padStart(3, '0')}`;
  }

  // 選択肢キー: choices.{filePrefix}.{labelName}.{auto-num} を生成
  // 既存パターンは choices.chapterN.{name} だが、新規は規則的な名前を提案
  function nextChoiceKey(fileName, labelName, parsed) {
    const pfx = `choices.${filePrefix(fileName)}.${labelName}_`;
    let maxN = 0;
    const re = new RegExp(`^choices\\.${escapeRegex(filePrefix(fileName))}\\.${escapeRegex(labelName)}_(\\d+)$`);
    for (const line of parsed) {
      if (line.key) {
        const m = line.key.match(re);
        if (m) {
          const n = parseInt(m[1], 10);
          if (n > maxN) maxN = n;
        }
      }
    }
    return `${pfx}${String(maxN + 1).padStart(2, '0')}`;
  }

  function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function getActiveLabel() {
    if (!state.activeFile || !state.activeLabel) return null;
    const file = state.files[state.activeFile];
    return file.labels.find(l => l.name === state.activeLabel);
  }

  function onSelectLabel(fileName, labelName) {
    state.activeFile = fileName;
    state.activeLabel = labelName;
    const file = state.files[fileName];
    const label = file.labels.find(l => l.name === labelName);
    if (!label) return;
    EditorTree.setActive(fileName, labelName);
    document.getElementById('editor-breadcrumb').textContent =
      `${fileName}  ▸  ${labelName}`;
    EditorLineEditor.showLabel(fileName, labelName, file.parsed, label);
    refreshPreview();
  }

  function onTextChange(key, lang, value) {
    if (!state.locales[lang]) state.locales[lang] = {};
    state.locales[lang][key] = value;
    markDirty();
    if (state.previewLang === lang) refreshPreview();
  }

  function onCommandChange(lineIdx, newRaw) {
    if (!state.activeFile) return;
    const file = state.files[state.activeFile];
    if (!file) return;
    file.parsed[lineIdx].raw = newRaw;
    file.dirty = true;
    markDirty();
    refreshPreview();
  }

  function onLineSelect(lineIdx) {
    state.selectedLineIdx = lineIdx;
    refreshPreview();
  }

  function onInsertLine(atIdx, type) {
    if (!state.activeFile || !state.activeLabel) return;
    const file = state.files[state.activeFile];
    const label = file.labels.find(l => l.name === state.activeLabel);
    if (!label) return;

    const newLines = buildNewLines(type, file, label);
    if (!newLines || newLines.length === 0) return;

    file.parsed.splice(atIdx, 0, ...newLines);
    file.labels = ScenarioIO.extractLabels(file.parsed);
    file.dirty = true;

    // ラベル一覧と allLabels を更新
    EditorCommandEditor.setLabels(collectAllLabels());
    EditorLineEditor.setAllLabels(collectAllLabels());

    markDirty();
    // 同じラベルの新しい範囲で再表示
    const newLabel = file.labels.find(l => l.name === state.activeLabel);
    EditorLineEditor.showLabel(state.activeFile, state.activeLabel, file.parsed, newLabel);
    // 挿入された最初の行を選択
    state.selectedLineIdx = atIdx;
    // コマンド系の挿入なら即フォーム展開で編集を促す
    const firstInserted = newLines[0];
    if (firstInserted && firstInserted.type === 'command') {
      EditorLineEditor.expandCommandAt(atIdx);
    }
    refreshPreview();
    EditorTree.setFiles(state.files);  // ラベルの行数バッジ更新
    EditorTree.setActive(state.activeFile, state.activeLabel);
  }

  // 各 @cmd の挿入時デフォルト引数
  const CMD_DEFAULTS = {
    scene:        [],          // BG 未指定 → フォームで選択
    bgm:          [],
    se:           [],
    still:        [],
    still_hide:   [],
    show:         [],          // char/pos/expr/effect すべてフォームで
    hide:         [],
    hide_all:     [],
    expr:         [],
    move:         [],
    window_color: ['reset'],
    wait:         ['1000'],
    flag:         ['', ''],
    shake:        ['8', '500'],
    effect:       ['stop'],
    jump:         [''],
  };

  function buildNewLines(type, file, label) {
    const parsed = file.parsed;
    const labelName = label.name;
    const fileName = state.activeFile;

    // 共通系
    switch (type) {
      case 'blank':
        return [ScenarioIO.makeLine('blank')];
      case 'comment':
        return [ScenarioIO.makeLine('comment', { text: '' })];
      case 'narration': {
        const key = nextTextKey(fileName, labelName, parsed);
        state.locales.ja[key] = '';
        state.locales.en[key] = '';
        return [ScenarioIO.makeLine('narration', { key })];
      }
      case 'dialogue': {
        const key = nextTextKey(fileName, labelName, parsed);
        state.locales.ja[key] = '';
        state.locales.en[key] = '';
        return [ScenarioIO.makeLine('dialogue', { char: 'player', key })];
      }
      case 'command':
        return [ScenarioIO.makeLine('command', { cmd: 'wait', args: ['1000'] })];
      case 'choice_block': {
        const k1 = nextChoiceKey(fileName, labelName, parsed);
        const m = k1.match(/(\d+)$/);
        const k2 = m
          ? k1.replace(/\d+$/, String(parseInt(m[1], 10) + 1).padStart(m[1].length, '0'))
          : k1 + '_2';
        state.locales.ja[k1] = '';
        state.locales.en[k1] = '';
        state.locales.ja[k2] = '';
        state.locales.en[k2] = '';
        return [
          ScenarioIO.makeLine('choice_start'),
          ScenarioIO.makeLine('choice_option', { key: k1, target: '' }),
          ScenarioIO.makeLine('choice_option', { key: k2, target: '' }),
        ];
      }
      case 'choice_option_in_block': {
        const key = nextChoiceKey(fileName, labelName, parsed);
        state.locales.ja[key] = '';
        state.locales.en[key] = '';
        return [ScenarioIO.makeLine('choice_option', { key, target: '' })];
      }
    }

    // cmd_* : 各種コマンドの直接挿入
    if (type.startsWith('cmd_')) {
      const cmd = type.slice(4);
      const args = CMD_DEFAULTS[cmd] || [];
      return [ScenarioIO.makeLine('command', { cmd, args })];
    }

    return null;
  }

  function onDeleteLine(lineIdx) {
    if (!state.activeFile || !state.activeLabel) return;
    const file = state.files[state.activeFile];
    if (!file) return;
    const removed = file.parsed.splice(lineIdx, 1)[0];
    file.labels = ScenarioIO.extractLabels(file.parsed);
    file.dirty = true;
    markDirty();

    // 削除した行が label だった場合の選択ラベルフォロー
    if (removed && removed.type === 'label' && removed.name === state.activeLabel) {
      // アクティブラベルが消えたので、最初のラベルへ
      if (file.labels.length > 0) {
        onSelectLabel(state.activeFile, file.labels[0].name);
        return;
      } else {
        state.activeLabel = null;
        document.getElementById('editor-breadcrumb').textContent = `${state.activeFile}  ▸  (ラベルなし)`;
      }
    }

    const newLabel = file.labels.find(l => l.name === state.activeLabel);
    EditorLineEditor.showLabel(state.activeFile, state.activeLabel, file.parsed, newLabel);
    refreshPreview();
    EditorTree.setFiles(state.files);
    EditorTree.setActive(state.activeFile, state.activeLabel);
  }

  function onAddLabel(fileName) {
    const file = state.files[fileName];
    if (!file) return;
    const name = prompt('新規ラベル名:\n(英数字とアンダースコアのみ)');
    if (!name) return;
    if (!/^[A-Za-z0-9_]+$/.test(name)) {
      toast('ラベル名は英数字とアンダースコアのみ', 'error');
      return;
    }
    if (file.labels.some(l => l.name === name)) {
      toast('同名のラベルが既に存在します', 'error');
      return;
    }
    // ファイル末尾に空行+ラベル行を追加
    const insertAt = file.parsed.length;
    const newLines = [
      ScenarioIO.makeLine('blank'),
      ScenarioIO.makeLine('label', { name }),
      ScenarioIO.makeLine('blank'),
    ];
    file.parsed.splice(insertAt, 0, ...newLines);
    file.labels = ScenarioIO.extractLabels(file.parsed);
    file.dirty = true;
    EditorCommandEditor.setLabels(collectAllLabels());
    EditorLineEditor.setAllLabels(collectAllLabels());
    EditorTree.setFiles(state.files);
    markDirty();
    onSelectLabel(fileName, name);
    toast('ラベル "' + name + '" を追加しました', 'success');
  }

  function onDeleteLabel(fileName, labelName) {
    if (!confirm(`ラベル "${labelName}" を削除しますか？\n(行は残るのでラベル行のみ削除します)`)) return;
    const file = state.files[fileName];
    const label = file.labels.find(l => l.name === labelName);
    if (!label) return;
    file.parsed.splice(label.startIdx, 1);
    file.labels = ScenarioIO.extractLabels(file.parsed);
    file.dirty = true;
    EditorCommandEditor.setLabels(collectAllLabels());
    EditorLineEditor.setAllLabels(collectAllLabels());
    EditorTree.setFiles(state.files);
    markDirty();
    if (state.activeFile === fileName && state.activeLabel === labelName) {
      // 別ラベルへ移動
      if (file.labels.length > 0) {
        onSelectLabel(fileName, file.labels[0].name);
      } else {
        state.activeLabel = null;
        document.getElementById('editor-container').innerHTML = '<div class="placeholder">ラベルがありません</div>';
        EditorPreview.showPlaceholder();
      }
    }
    toast('ラベル "' + labelName + '" を削除しました', 'success');
  }

  function refreshPreview() {
    if (!state.activeFile || !state.activeLabel) return;
    const file = state.files[state.activeFile];
    const label = file.labels.find(l => l.name === state.activeLabel);
    if (!label) return;
    const idx = state.selectedLineIdx ?? (label.startIdx + 1);
    EditorPreview.renderAt(file.parsed, label, idx, state.locales, state.previewLang);
  }

  function isDirty() {
    if (Object.values(state.files).some(f => f.dirty)) return true;
    if (hasLocaleChanged('ja') || hasLocaleChanged('en')) return true;
    return false;
  }

  function markDirty() {
    document.getElementById('btn-save').disabled = false;
    setStatus('未保存の変更あり', 'dirty');
  }

  function setStatus(text, kind = 'info') {
    const el = document.getElementById('status-text');
    if (!el) return;
    el.textContent = text;
    el.style.color = kind === 'error' ? '#e88' :
                     kind === 'dirty' ? '#e8a86b' :
                     kind === 'success' ? '#8e8' : '#888';
  }

  async function save() {
    const btn = document.getElementById('btn-save');
    btn.disabled = true;
    setStatus('保存中...');

    const tasks = [];

    for (const lang of ['ja', 'en']) {
      if (!hasLocaleChanged(lang)) continue;
      const ordered = orderedMerge(state.originalLocales[lang], state.locales[lang]);
      const json = JSON.stringify(ordered, null, 2);
      const file = `scenario.${lang}.json`;
      tasks.push(EditorAPI.saveLocale(file, json).then(() => ({ file, kind: 'locale' })));
    }

    for (const fileName of Object.keys(state.files)) {
      const f = state.files[fileName];
      if (!f.dirty) continue;
      const content = ScenarioIO.serialize(f.parsed);
      tasks.push(EditorAPI.saveScenario(fileName, content).then(() => ({ file: fileName, kind: 'scenario' })));
    }

    if (tasks.length === 0) {
      setStatus('変更なし');
      return;
    }

    try {
      const results = await Promise.all(tasks);
      state.originalLocales.ja = JSON.parse(JSON.stringify(state.locales.ja));
      state.originalLocales.en = JSON.parse(JSON.stringify(state.locales.en));
      for (const fileName of Object.keys(state.files)) {
        if (state.files[fileName].dirty) {
          state.files[fileName].dirty = false;
          state.originalRaws[fileName] = ScenarioIO.serialize(state.files[fileName].parsed);
        }
      }
      EditorLineEditor.clearDirty();
      setStatus(`保存: ${results.map(r => r.file).join(', ')}`, 'success');
      toast(`${results.length} ファイル保存しました`, 'success');
    } catch (e) {
      console.error(e);
      setStatus('保存失敗: ' + e.message, 'error');
      toast('保存失敗: ' + e.message, 'error');
      btn.disabled = false;
    }
  }

  function hasLocaleChanged(lang) {
    const a = state.originalLocales[lang];
    const b = state.locales[lang];
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    if (ka.length !== kb.length) return true;
    for (const k of kb) if (a[k] !== b[k]) return true;
    return false;
  }

  function orderedMerge(orig, current) {
    const out = {};
    for (const k of Object.keys(orig)) if (k in current) out[k] = current[k];
    for (const k of Object.keys(current)) if (!(k in out)) out[k] = current[k];
    return out;
  }

  function countKeys() { return Object.keys(state.locales.ja).length; }

  let _toastTimer = null;
  function toast(msg, kind = 'info') {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.className = kind === 'error' ? 'error' : kind === 'success' ? 'success' : '';
    el.classList.remove('hidden');
    if (_toastTimer) clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => el.classList.add('hidden'), 2400);
  }

  document.addEventListener('DOMContentLoaded', boot);

})();
