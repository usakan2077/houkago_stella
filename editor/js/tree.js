/* ===================================================================
   tree.js — 左ペインのファイル/ラベルツリー
   ファイル展開、ラベル選択、ラベル追加/削除
   =================================================================== */

window.EditorTree = (() => {

  let _container;
  let _callbacks = {};
  let _state = {
    files: {},
    expanded: new Set(),
    activeFile: null,
    activeLabel: null,
  };

  function init(containerEl, callbacks) {
    _container = containerEl;
    _callbacks = callbacks || {};
  }

  function setFiles(fileMap) {
    _state.files = fileMap;
    Object.keys(fileMap).forEach(name => _state.expanded.add(name));
    render();
  }

  function setActive(fileName, labelName) {
    _state.activeFile = fileName;
    _state.activeLabel = labelName;
    render();
  }

  function render() {
    if (!_container) return;
    _container.innerHTML = '';
    const fileNames = Object.keys(_state.files);
    if (fileNames.length === 0) {
      _container.innerHTML = '<div class="placeholder">シナリオファイルなし</div>';
      return;
    }

    fileNames.forEach(fileName => {
      const { labels } = _state.files[fileName];
      const fileEl = document.createElement('div');
      fileEl.className = 'tree-file';
      if (_state.expanded.has(fileName)) fileEl.classList.add('expanded');

      const nameEl = document.createElement('div');
      nameEl.className = 'tree-file-name';

      const nameLabel = document.createElement('span');
      nameLabel.className = 'tree-file-name-text';
      nameLabel.textContent = fileName;
      nameLabel.addEventListener('click', () => {
        if (_state.expanded.has(fileName)) _state.expanded.delete(fileName);
        else _state.expanded.add(fileName);
        render();
      });
      nameEl.appendChild(nameLabel);

      // ラベル追加ボタン
      const addBtn = document.createElement('button');
      addBtn.className = 'tree-add-label-btn';
      addBtn.textContent = '+';
      addBtn.title = 'このファイルにラベルを追加';
      addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        _callbacks.onAddLabel && _callbacks.onAddLabel(fileName);
      });
      nameEl.appendChild(addBtn);
      fileEl.appendChild(nameEl);

      const labelsEl = document.createElement('div');
      labelsEl.className = 'tree-labels';
      labels.forEach(label => {
        const labelEl = document.createElement('div');
        labelEl.className = 'tree-label';
        if (fileName === _state.activeFile && label.name === _state.activeLabel) {
          labelEl.classList.add('active');
        }

        const labelName = document.createElement('span');
        labelName.className = 'tree-label-name';
        labelName.textContent = label.name;
        labelName.addEventListener('click', () => {
          if (_callbacks.onSelectLabel) _callbacks.onSelectLabel(fileName, label.name);
        });

        const labelCount = document.createElement('span');
        labelCount.className = 'tree-label-count';
        labelCount.textContent = label.lineCount;

        const labelDel = document.createElement('button');
        labelDel.className = 'tree-label-del-btn';
        labelDel.textContent = '✕';
        labelDel.title = 'このラベルを削除';
        labelDel.addEventListener('click', (e) => {
          e.stopPropagation();
          _callbacks.onDeleteLabel && _callbacks.onDeleteLabel(fileName, label.name);
        });

        labelEl.appendChild(labelName);
        labelEl.appendChild(labelCount);
        labelEl.appendChild(labelDel);
        labelsEl.appendChild(labelEl);
      });
      fileEl.appendChild(labelsEl);
      _container.appendChild(fileEl);
    });
  }

  return { init, setFiles, setActive, render };
})();
