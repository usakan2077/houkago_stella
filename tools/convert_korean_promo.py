"""Export Korean artwork non-destructively with Pillow, keeping editable sources separate."""
import hashlib,json
from PIL import Image
from asset_paths import GAME_ROOT,asset_source

def main():
    records=[]
    for kind,size,relative in [
        ('title_logo',None,'assets/images/bg/title_logo_ko-v1.webp'),
        ('poster',(848,1264),'assets/images/promo/poster.ko-v1.webp'),
        ('og',(1200,630),'assets/images/promo/og.ko-v1.png')]:
        source=asset_source(f'korean-release-20261118/{kind}.ko.png');target=GAME_ROOT/relative
        target.parent.mkdir(parents=True,exist_ok=True)
        with Image.open(source) as image:
            if kind=='title_logo':
                image=image.convert('RGBA');assert image.getextrema()[3][0]==0 and image.getextrema()[3][1]==255
            else:
                assert abs(image.width/image.height-size[0]/size[1])<.025
                image=image.convert('RGB').resize(size,Image.Resampling.LANCZOS)
            image.save(target,**({'format':'WEBP','quality':92,'method':6} if target.suffix=='.webp' else {'format':'PNG','optimize':True}))
            final_size=list(image.size)
        records.append({'language':'ko','kind':kind,'src':relative,'source':f'korean-release-20261118/{kind}.ko.png','source_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'size':final_size,'bytes':target.stat().st_size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest()})
        print(relative,flush=True)
    (GAME_ROOT/'docs/korean-promo-assets.json').write_text(json.dumps({'version':'korean-release-20261118','method':'Built-in imagegen text localization; Pillow size/format conversion','assets':records},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

if __name__=='__main__':main()
