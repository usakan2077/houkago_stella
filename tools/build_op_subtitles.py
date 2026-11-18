"""Build local WebVTT lyrics from the reviewed multilingual subtitle source."""
import argparse,json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]

def main(check=False):
    cues=json.loads((ROOT/'docs/op-subtitle-source.json').read_text(encoding='utf-8'))['cues']
    previous=0
    for cue in cues:
        match=re.fullmatch(r'(\d\d):(\d\d):(\d\d\.\d\d\d) --> (\d\d):(\d\d):(\d\d\.\d\d\d)',cue['timing'])
        assert match,cue
        a=int(match[1])*3600+int(match[2])*60+float(match[3]);b=int(match[4])*3600+int(match[5])*60+float(match[6])
        assert previous<=a<b<=102.867,(a,b);previous=b
    for language in ['ja','en','zh-CN','zh-TW','ko']:
        assert all(cue[language].strip() for cue in cues)
        content='WEBVTT\n\n'+'\n\n'.join(str(i+1)+'\n'+cue['timing']+' line:8% position:50% align:center\n'+cue[language] for i,cue in enumerate(cues))+'\n'
        target=ROOT/f'assets/video/subtitles/op.{language}-v1.vtt'
        if check:assert target.read_text(encoding='utf-8')==content,target
        else:target.parent.mkdir(exist_ok=True);target.write_text(content,encoding='utf-8')
        print(language,len(cues),'subtitle cues',flush=True)

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--check',action='store_true');args=parser.parse_args();main(args.check)
