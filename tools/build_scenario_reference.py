"""Generate a human-readable JA/EN script and voice index without changing runtime IDs."""
from pathlib import Path
import csv,html,json,re

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs/scenario-reference'

def main():
    OUT.mkdir(exist_ok=True)
    locales={lang:json.loads((ROOT/f'locales/scenario.{lang}.json').read_text(encoding='utf8')) for lang in ['ja','en']}
    voices={lang:json.loads((ROOT/f'assets/voice/{lang}/manifest.json').read_text(encoding='utf8'))['clips'] for lang in ['ja','en']}
    records={};order={lang:[] for lang in locales};files=list((ROOT/'scenarios').glob('chapter*.md'))+[ROOT/'scenarios'/f for f in ['route_sakura.md','route_kotoha.md','route_mahiru.md','bad_end.md']]
    files.sort(key=lambda p: (0,int(re.search(r'\d+',p.stem)[0])) if p.stem.startswith('chapter') else (1,p.stem))
    config=(ROOT/'config.js').read_text(encoding='utf8')
    coda_match=re.search(r'endingCoda:\s*({.*?}),\n\s*releaseNotes:',config,re.S)
    codas=json.loads(coda_match[1]) if coda_match else {}
    for lang in locales:
        for file in files:
            path=file if lang=='ja' else file.parent/'en'/file.name
            label=''
            for line in path.read_text(encoding='utf8').splitlines():
                if line.startswith('# '):label=line[2:].strip()
                keys=re.findall(r'\$([\w.]+)',line)
                if line.startswith('@ending_intro'):
                    profile=line.split()[2]
                    keys += [key[1:] for key in codas.get(profile,[])]
                for key in keys:
                    if key not in locales[lang]:continue
                    if key not in order[lang]:order[lang].append(key)
                    speaker=re.match(r'^(\w+):',line)
                    records.setdefault(key,dict(id=key,chapter=file.stem,scene=label,speaker=speaker[1] if speaker else 'narrator',source=path.relative_to(ROOT).as_posix()))
    rows=[]
    for key in dict.fromkeys(order['ja']+order['en']):
        r=records[key];r.update(ja=locales['ja'].get(key,''),en=locales['en'].get(key,''),audio={lang:voices[lang].get(key) for lang in locales});rows.append(r)
    # JSON key order follows each language's own playable script. Unreferenced keys are preserved.
    for lang,data in locales.items():
        ordered={key:data[key] for key in order[lang]}
        ordered.update({key:value for key,value in data.items() if key not in ordered})
        assert set(ordered)==set(data)
        (ROOT/f'locales/scenario.{lang}.json').write_text(json.dumps(ordered,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    (OUT/'index.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    with (OUT/'scenario-voice.csv').open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.writer(f);w.writerow(['chapter','scene','speaker','text_id','日本語','English','JA audio','EN audio','JA gainDb','EN gainDb'])
        for r in rows:w.writerow([r['chapter'],r['scene'],r['speaker'],r['id'],r['ja'],r['en'],*((r['audio'][lang] or {}).get('src','') for lang in locales),*((r['audio'][lang] or {}).get('gainDb','') for lang in locales)])
    page='''<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>放課後のステラ｜シナリオ・音声索引</title>
<style>body{font:15px/1.8 system-ui;margin:30px auto;padding:0 20px;max-width:1450px;background:#f7f5f0;color:#272634}h1{font-size:26px}nav{display:flex;flex-wrap:wrap;gap:12px;position:sticky;top:0;background:#f7f5f0;padding:12px 0}input,select{font:inherit;padding:7px;max-width:100%}article{border-top:1px solid #ccc;padding:18px 0}h2{font-size:15px;margin:0}small{overflow-wrap:anywhere}.columns{display:grid;grid-template-columns:1fr 1fr;gap:22px}p{white-space:pre-wrap;margin:8px 0}audio{display:block;width:min(100%,460px)}a{color:#59427c}.meta{color:#666;font-size:12px}@media(max-width:700px){.columns{grid-template-columns:1fr}}</style>
<h1>シナリオ・音声索引</h1><p>章・場面・話者・本文・音声・既存IDをまとめて検索できます。日本語と英語で分割数が異なる行も掲載。音声は原音で、ゲーム側のgainDbは適用しません。</p><p><a href="scenario-voice.csv">Excel用CSV</a> ／ <a href="index.json">索引JSON</a> ／ <a href="../project-map.md">ファイル構成ガイド</a></p>
<nav><select id="chapter"><option value="">全章</option></select><select id="speaker"><option value="">全話者</option></select><input id="query" type="search" placeholder="本文・場面・ID"><label><input id="narration" type="checkbox">地の文も表示</label><span id="count"></span></nav><main id="rows"></main><script>
const data=__ROWS__;const el=id=>document.getElementById(id);for(const name of ['chapter','speaker'])for(const value of new Set(data.map(r=>r[name]))){const o=document.createElement('option');o.value=value;o.textContent=value;el(name).append(o)}
function render(){el('rows').replaceChildren();const q=el('query').value.toLowerCase();const rows=data.filter(r=>(!el('chapter').value||r.chapter===el('chapter').value)&&(!el('speaker').value||r.speaker===el('speaker').value)&&(el('narration').checked||r.speaker!=='narrator')&&(!q||[r.id,r.scene,r.speaker,r.ja,r.en].join(' ').toLowerCase().includes(q)));el('count').textContent=rows.length+'行';for(const r of rows){const a=document.createElement('article'),h=document.createElement('h2'),id=document.createElement('small'),cols=document.createElement('div');h.textContent=r.chapter+' / '+r.scene+' / '+r.speaker;id.textContent=r.id;cols.className='columns';a.append(h,id,cols);for(const lang of ['ja','en']){const box=document.createElement('div'),t=document.createElement('p');t.textContent=(lang==='ja'?'JA':'EN')+'：'+(r[lang]||'—');box.append(t);const clip=r.audio[lang];if(clip){const audio=document.createElement('audio');audio.controls=true;audio.preload='none';audio.src='../../'+clip.src;const meta=document.createElement('p');meta.className='meta';meta.textContent=clip.src+' / gainDb '+(clip.gainDb||0);box.append(audio,meta)}cols.append(box)}el('rows').append(a)}}for(const id of ['chapter','speaker','narration'])el(id).onchange=render;el('query').oninput=render;render();
</script></html>'''
    (OUT/'index.html').write_text(page.replace('__ROWS__',json.dumps(rows,ensure_ascii=False).replace('<','\\u003c')),encoding='utf8')
    for file in files:
        chapter=[r for r in rows if r['chapter']==file.stem];parts=['# '+file.stem+'：本文・音声対応\n\nこの文書は tools/build_scenario_reference.py で再生成。編集元は scenarios/ と locales/。既存IDを保持する。\n']
        for r in chapter:
            parts.append('\n## '+r['scene']+' / '+r['speaker']+'\n\n`'+r['id']+'`\n\nJA：'+r['ja'].rstrip()+'\n\nEN：'+r['en'].rstrip()+'\n')
        (OUT/(file.stem+'.md')).write_text(''.join(parts),encoding='utf8')
    print(f'Reference index: {len(rows)} rows; JA {len(voices["ja"])} voices; EN {len(voices["en"])} voices; runtime IDs unchanged.')

if __name__=='__main__':main()
