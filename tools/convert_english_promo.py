"""Export the reviewed English promotional artwork, retaining Japanese originals."""
import hashlib,json
from PIL import Image
from asset_paths import GAME_ROOT,asset_source

def main():
    records=[]
    for kind,size,relative in [
        ('poster',(848,1264),'assets/images/promo/poster.en-v1.webp'),
        ('og',(1200,630),'assets/images/promo/og.en-v1.png'),
        ('campaign',(1536,864),'assets/campaign/clear-campaign.en-v1.webp')]:
        source=asset_source(f'multilingual-release-20261117/{kind}.en.png');target=GAME_ROOT/relative;target.parent.mkdir(parents=True,exist_ok=True)
        with Image.open(source) as image:
            assert abs((image.width/image.height)/(size[0]/size[1])-1)<.025
            image=image.convert('RGB').resize(size,Image.Resampling.LANCZOS)
            image.save(target,**({'format':'WEBP','quality':92,'method':6} if target.suffix=='.webp' else {'format':'PNG','optimize':True}))
        records.append({'language':'en','kind':kind,'src':relative,'size':list(size),'bytes':target.stat().st_size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest()})
        print(relative,flush=True)
    (GAME_ROOT/'docs/english-promo-assets.json').write_text(json.dumps({'version':'multilingual-release-20261117','assets':records},indent=2)+'\n',encoding='utf-8')

if __name__=='__main__':main()
