"""Export smaller LP posters/header logos with Pillow; preserve original artwork."""
import hashlib,json
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'lp/assets/images'
def main():
    records=[]
    sources={'ja':'lp/assets/images/title_logo.webp','en':'assets/images/bg/title_logo_en.webp',
             **{lang:f'assets/images/bg/title_logo_{lang}-v1.webp' for lang in ['zh-CN','zh-TW','ko']}}
    jobs=[('lp/assets/images/poster.png','poster-v1.webp',(848,1264))]
    jobs += [(source,f'logo.{language}-v1.webp',(384,192)) for language,source in sources.items()]
    for source,name,bounds in jobs:
        target=OUT/name
        with Image.open(ROOT/source) as image:
            image=image.convert('RGBA' if 'A' in image.getbands() else 'RGB')
            image.thumbnail(bounds,Image.Resampling.LANCZOS)
            image.save(target,format='WEBP',quality=90,method=6)
            records.append({'source':source,'src':target.relative_to(ROOT).as_posix(),'size':list(image.size),
                'source_bytes':(ROOT/source).stat().st_size,'bytes':target.stat().st_size,
                'sha256':hashlib.sha256(target.read_bytes()).hexdigest()})
    (ROOT/'docs/lp-image-exports.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    for r in records:print(r['src'],r['source_bytes'],'->',r['bytes'])
if __name__=='__main__':main()
