"""Group voice files by chapter, archiving inactive takes; keep text IDs, bytes and gains."""
from pathlib import Path
import hashlib,json
ROOT=Path(__file__).resolve().parents[1]

def main():
    voice_root=(ROOT/'assets/voice').resolve()
    manifests={};active={};moves=[]
    for lang in ['ja','en']:
        path=voice_root/lang/'manifest.json';manifest=json.loads(path.read_text(encoding='utf8'));manifests[lang]=manifest
        for key,clip in manifest['clips'].items():active[(ROOT/clip['src']).resolve()]=(lang,key)
    assert len(active)==2080
    for lang in ['ja','en']:
        for src in (voice_root/lang).glob('*.mp3'):
            src=src.resolve();chapter=src.name.split('.',1)[0]
            if not (chapter.startswith('chapter') or chapter.startswith('route_') or chapter=='bad_end'):chapter='misc'
            dest=voice_root/lang/(Path(chapter) if src in active else Path('archive')/chapter)/src.name
            dest=dest.resolve()
            assert src.is_relative_to(voice_root) and dest.is_relative_to(voice_root)
            assert not dest.exists(),str(dest)
            moves.append(dict(before=src.relative_to(ROOT).as_posix(),after=dest.relative_to(ROOT).as_posix(),active=src in active,sha256=hashlib.sha256(src.read_bytes()).hexdigest()))
    assert moves,'Already organized or no voice files found; no changes.'
    by_old={r['before']:r for r in moves}
    # Validate the entire move plan before touching any file.
    for manifest in manifests.values():
        for clip in manifest['clips'].values():assert clip['src'] in by_old
    for row in moves:
        src=ROOT/row['before'];dest=ROOT/row['after'];dest.parent.mkdir(parents=True,exist_ok=True);src.rename(dest)
        assert hashlib.sha256(dest.read_bytes()).hexdigest()==row['sha256']
    for lang,manifest in manifests.items():
        for clip in manifest['clips'].values():clip['src']=by_old[clip['src']]['after']
        (voice_root/lang/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    (ROOT/'docs/voice-file-map.json').write_text(json.dumps(moves,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print('Organized',len(moves),'MP3s:',sum(r['active'] for r in moves),'active;',sum(not r['active'] for r in moves),'archived. IDs, gains and audio bytes unchanged.')

if __name__=='__main__':main()
