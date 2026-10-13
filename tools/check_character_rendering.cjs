// Delayed image completion against production character methods; no dependencies.
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const tick = () => new Promise(resolve => setImmediate(resolve));
function environment() {
  const pending = [], timers = [], slots = {};
  function element() {
    const el = {dataset:{}, style:{}, childNodes:[], offsetWidth:0,
      appendChild(node) { this.childNodes.push(node); },
      removeChild(node) { this.childNodes.splice(this.childNodes.indexOf(node), 1); },
      get firstChild() { return this.childNodes[0]; },
      querySelector() { return this.childNodes.find(n => n.className === 'char-sprite') || null; }};
    let classes = new Set();
    Object.defineProperty(el, 'className', {get:()=>[...classes].join(' '), set:v=>{classes=new Set(v.split(/\s+/).filter(Boolean));}});
    Object.defineProperty(el, 'innerHTML', {set:()=>{el.childNodes=[];}});
    el.classList = {add:(...names)=>names.forEach(n=>classes.add(n)), remove:(...names)=>names.forEach(n=>classes.delete(n)),
      contains:n=>classes.has(n), toggle:(n, force)=>force?classes.add(n):classes.delete(n)};
    return el;
  }
  for (const pos of ['left','center','right']) slots['char-'+pos]=element();
  const document = {getElementById:id=>slots[id], createElement:element};
  class Image {
    constructor(){this.style={};}
    decode(){return new Promise((resolve,reject)=>pending.push({resolve,reject,image:this}));}
  }
  const scope=vm.createContext({console,document,Image,setTimeout:fn=>{timers.push(fn);},clearTimeout(){},window:{}});
  vm.runInContext(fs.readFileSync(path.join(root,'config.js'),'utf8'),scope);
  vm.runInContext(fs.readFileSync(path.join(root,'game.js'),'utf8').replace('const engine = new VNEngine();','this.Engine = VNEngine;'),scope);
  const engine=Object.create(scope.Engine.prototype);
  engine.charState={left:null,center:null,right:null};
  const source=pos=>slots['char-'+pos].firstChild?.firstChild?.src;
  return {engine,pending,slots,timers,source};
}
test('named hide cancels an image before its first decode',async()=>{
  const e=environment();e.engine._showChar('mahiru_no_camera','left','normal','instant');
  e.engine._hideChar('mahiru_no_camera','instant');e.pending[0].resolve();await tick();
  assert.equal(e.engine.charState.left,null);assert.equal(e.source('left'),undefined);
});
test('expression before initial decode renders the requested expression',async()=>{
  const e=environment();e.engine._showChar('teacher_male','center','normal','instant');
  e.engine._changeExpr('teacher_male','stern');e.pending[0].resolve();await tick();
  assert.equal(e.source('center'),undefined);e.pending[1].resolve();await tick();
  assert.ok(e.source('center').endsWith('/stern.png'));
});
test('reverse completion cannot restore an older expression or clear the speaking highlight',async()=>{
  const e=environment();e.engine._showChar('sakura_sports','right','normal','instant');
  e.pending[0].resolve();await tick();e.engine._highlightChar('sakura');
  e.engine._changeExpr('sakura_sports','happy');e.engine._changeExpr('sakura_sports','surprised');
  e.pending[2].resolve();await tick();e.pending[1].resolve();await tick();
  assert.ok(e.source('right').endsWith('/surprised.png'));assert.ok(e.slots['char-right'].classList.contains('highlighted'));
});
test('a replacement character wins over a late expression image',async()=>{
  const e=environment();e.engine._showChar('kotoha','left','normal','instant');
  e.engine._changeExpr('kotoha','sad');e.engine._showChar('mahiru','left','happy','instant');
  e.pending[2].resolve();await tick();e.pending[1].resolve();e.pending[0].resolve();await tick();
  assert.ok(e.source('left').includes('/mahiru/happy.png'));
});
test('named hide cancels a delayed move',async()=>{
  const e=environment();e.engine._showChar('mahiru','left','normal','instant');e.pending[0].resolve();await tick();
  e.engine._moveChar('mahiru','right');e.engine._hideChar('mahiru','instant');
  e.timers.forEach(fn=>fn());assert.equal(e.pending.length,1);assert.equal(e.engine.charState.right,null);
});
test('expression during a delayed move invalidates the original scheduled image',async()=>{
  const e=environment();e.engine._showChar('kotoha','left','normal','instant');e.pending[0].resolve();await tick();
  e.engine._moveChar('kotoha','right');e.engine._changeExpr('kotoha','sad');e.timers.forEach(fn=>fn());
  assert.equal(e.pending.length,2);e.pending[1].resolve();await tick();assert.ok(e.source('right').endsWith('/sad.png'));
});
test('a late failed image cannot add a placeholder after a hide',async()=>{
  const e=environment();e.engine._showChar('kotoha','center','normal','instant');e.engine._hideChar('kotoha','instant');
  e.pending[0].image.onerror();e.pending[0].reject(new Error('missing'));await tick();
  assert.equal(e.slots['char-center'].childNodes.length,0);
});
