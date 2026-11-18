"""Compile locally authored Korean drafts, preserving Japanese keys and source hashes."""
import argparse,hashlib,json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
DRAFTS=ROOT/'locales/korean-drafts'

def compile_kind(kind,check=False):
    source_path=ROOT/f'locales/{kind}.ja.json'
    source=json.loads(source_path.read_text(encoding='utf-8'))
    groups={}
    for key in source:groups.setdefault('bonus' if kind=='bonus' else key.split('.')[0],[]).append(key)
    index={'source_sha256':hashlib.sha256(source_path.read_bytes()).hexdigest(),'groups':groups}
    index_path=DRAFTS/f'{kind}-source-index.json'
    if index_path.exists():
        assert json.loads(index_path.read_text(encoding='utf-8'))==index,'Japanese source changed; review Korean draft indices'
    elif not check:
        DRAFTS.mkdir(parents=True,exist_ok=True)
        index_path.write_text(json.dumps(index,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    output={}
    for group,keys in groups.items():
        values={}
        for line in (DRAFTS/f'{group}.txt').read_text(encoding='utf-8').splitlines():
            n,text=line.split('|',1);n=int(n)
            assert n not in values and text.strip(),(group,n)
            values[n]=text.replace('⏎','\n')
        assert set(values)==set(range(len(keys))),(group,len(values),len(keys))
        for i,key in enumerate(keys):
            original=source[key];translated=values[i]
            assert sorted(re.findall(r'\{\w+\}',original))==sorted(re.findall(r'\{\w+\}',translated)),key
            assert re.findall(r'</?\w+[^>]*>',original)==re.findall(r'</?\w+[^>]*>',translated),key
            assert re.search('[가-힣]',translated) or not re.search('[ぁ-ゖァ-ヺ一-龯]',original),(key,translated)
            output[key]=translated
    target=ROOT/f'locales/{kind}.ko.json'
    if check:assert json.loads(target.read_text(encoding='utf-8'))==output,target
    else:target.write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f'{kind}/ko: {len(output)} locally authored entries')

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--check',action='store_true');parser.add_argument('--kind',choices=['scenario','bonus','all'],default='all');args=parser.parse_args()
    for kind in ['scenario','bonus'] if args.kind=='all' else [args.kind]:compile_kind(kind,args.check)
