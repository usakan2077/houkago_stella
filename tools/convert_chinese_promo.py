"""Export reviewed Chinese PNG sources using Pillow; no image-generation calls."""
import hashlib
import json
from PIL import Image
from asset_paths import GAME_ROOT, asset_source

def main():
    records=[]
    for language in ['zh-CN','zh-TW']:
        for kind in ['title_logo','poster','og','campaign']:
            source=asset_source(f'chinese-promo-v1/{kind}.{language}.png')
            if kind=='title_logo':relative=f'assets/images/bg/title_logo_{language}-v1.webp';size=(1280,None)
            elif kind=='poster':relative=f'assets/images/promo/poster.{language}-v1.webp';size=(848,1264)
            elif kind=='og':relative=f'assets/images/promo/og.{language}-v1.png';size=(1200,630)
            else:relative=f'assets/campaign/clear-campaign.{language}-v1.webp';size=(1536,864)
            target=GAME_ROOT/relative;target.parent.mkdir(parents=True,exist_ok=True)
            with Image.open(source) as image:
                image=image.convert('RGBA' if kind=='title_logo' else 'RGB')
                if kind=='title_logo':
                    assert image.getchannel('A').getextrema()[0]==0,'Logo must retain transparency'
                    size=(size[0],round(image.height*size[0]/image.width))
                assert abs((image.width/image.height)/(size[0]/size[1])-1)<.025,(source,'Unexpected aspect ratio')
                image=image.resize(size,Image.Resampling.LANCZOS)
                image.save(target,**({'format':'WEBP','quality':92,'method':6} if target.suffix=='.webp' else {'format':'PNG','optimize':True}))
            records.append({'language':language,'kind':kind,'source':source.relative_to(source.parents[1]).as_posix(),'src':relative,'size':list(size),'bytes':target.stat().st_size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest()})
            print(relative,size,flush=True)
    (GAME_ROOT/'docs/chinese-promo-assets.json').write_text(json.dumps({'version':'chinese-promo-v1','source_root':'houkago-stella-assets/assets-src','artwork_review':'Chinese title/subtitle, marketing copy, eligibility, faces and layout visually checked.','assets':records},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

if __name__=='__main__':main()
