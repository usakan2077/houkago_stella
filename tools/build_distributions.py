"""Build self-contained PLiCy and itch.io ZIPs from explicit runtime references.

No source assets are deleted or overwritten. Outputs and conversion caches live
outside the repository. Python Pillow, Node (or VS Code's Node), and FFmpeg are
needed for the optimized itch.io build.
"""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
import argparse,hashlib,json,os,re,shutil,subprocess,time,zipfile
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
TEMPLATES=Path(__file__).resolve().parent/'distribution'
EXTENSIONS=('.webp','.png','.jpg','.jpeg')

def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()

def run(args,**kwargs):
    result=subprocess.run(list(map(str,args)),capture_output=True,**kwargs)
    if result.returncode:raise RuntimeError(result.stderr.decode('utf8',errors='replace')[-3000:])
    return result.stdout

def config(node):
    script="const fs=require('node:fs'),vm=require('node:vm');process.stdout.write(vm.runInNewContext(fs.readFileSync('config.js','utf8')+';JSON.stringify({config:VN_CONFIG,bonus:VN_BONUS},(k,v)=>v instanceof Set?[...v]:v)',{}))"
    # Both configuration files contain data only, with no browser dependencies.
    script=script.replace("fs.readFileSync('config.js','utf8')+", "fs.readFileSync('config.js','utf8')+fs.readFileSync('bonus-scenario-data.js','utf8')+")
    env=dict(os.environ,ELECTRON_RUN_AS_NODE='1')
    return json.loads(run([node,'-e',script],cwd=ROOT,env=env))

def strings(value):
    if isinstance(value,str):yield value
    elif isinstance(value,dict):
        for v in value.values():yield from strings(v)
    elif isinstance(value,list):
        for v in value:yield from strings(v)

def inventory(c,b):
    files=set()
    def add(relative):
        p=ROOT/relative
        p.resolve().relative_to(ROOT.resolve())
        if not p.is_file():raise FileNotFoundError(relative)
        files.add(p.relative_to(ROOT).as_posix())
    def resolve(folder,key,overrides):
        for ext in dict.fromkeys([overrides.get(key,'.webp'),*EXTENSIONS]):
            p=f'assets/images/{folder}/{key}{ext}'
            if (ROOT/p).is_file():add(p);return
        raise FileNotFoundError(key)
    html=(ROOT/'index.html').read_text(encoding='utf8')
    for path in re.findall(r'(?:src|href)="([^"?#]+)',html):
        if not path.startswith(('https:','http:','#')) and (ROOT/path).is_file():add(path)
    add('index.html');add('LICENSE')
    for kind,keys,overrides in [('bg',c['backgrounds'],c.get('backgroundExtOverrides',{})),('stills',[v['key'] for v in c['cgList']],c.get('stillExtOverrides',{}))]:
        for key in keys:
            if kind=='bg' and key in c['gradientOnlyBGs']:continue
            resolve(kind,key,overrides)
    for actor,data in c['characters'].items():
        for expr in data.get('expressions',[]):add(f'assets/images/chars/{actor}/{expr}.png')
    for value in [*strings(c),*strings(b)]:
        if value.startswith('assets/') and (ROOT/value).is_file():add(value)
    # Additional literal engine resources, e.g. chapter card and bonus video.
    for p in list(files):
        if Path(p).suffix in ['.js','.css','.html']:
            for path in re.findall(r'''assets/[^'"`\s()${}<>]+\.(?:png|webp|jpg|jpeg|svg|mp4|mp3)''',(ROOT/p).read_text(encoding='utf8')):
                if (ROOT/path).is_file():add(path)
    for language,paths in c['scenarioFilesByLanguage'].items():
        for p in paths:add(p)
    for p in c['scenarioTextFiles'].values():add(p)
    # Keep current BGM/SE; historical recordings are in subdirectories and excluded.
    for folder in ['bgm','se']:
        for p in (ROOT/f'assets/audio/{folder}').glob('*.mp3'):add(p.relative_to(ROOT).as_posix())
    manifests={}
    for language,p in c['voice']['manifests'].items():
        add(p);m=json.loads((ROOT/p).read_text(encoding='utf8'));manifests[language]=m
        for clip in m['clips'].values():add(clip['src'])
    # The linked promotional site is external in distribution builds.
    files.discard('lp/index.html')
    return files,manifests

def convert_image(relative,cache):
    source=ROOT/relative;target=cache/(sha(source)+'.webp')
    if not target.exists():
        temp=target.with_suffix('.part.webp')
        with Image.open(source) as image:image.save(temp,'WEBP',lossless=True,exact=True,method=4)
        with Image.open(source) as a,Image.open(temp) as b:
            assert a.size==b.size and a.convert('RGBA').tobytes()==b.convert('RGBA').tobytes(),relative
        temp.replace(target)
    return relative,target

def convert_video(relative,cache,ffmpeg):
    source=ROOT/relative;target=cache/(sha(source)+'-720-crf23-1500k.mp4')
    if not target.exists():
        temp=target.with_suffix('.part.mp4')
        run([ffmpeg,'-hide_banner','-y','-v','error','-i',source,'-map','0:v:0','-map','0:a:0?',
             '-vf','scale=1280:720:flags=lanczos','-c:v','libx264','-preset','medium','-crf','23',
             '-maxrate','1500k','-bufsize','3000k','-threads','2','-pix_fmt','yuv420p',
             '-c:a','copy','-movflags','+faststart',temp])
        run([ffmpeg,'-hide_banner','-v','error','-xerror','-i',temp,'-f','null','-'])
        def audio(path):return run([ffmpeg,'-hide_banner','-v','error','-i',path,'-map','0:a:0','-c','copy','-f','hash','-hash','sha256','-'])
        assert audio(source)==audio(temp),'Video audio changed'
        temp.replace(target)
    print('VIDEO',Path(relative).name,round(source.stat().st_size/2**20,1),'->',round(target.stat().st_size/2**20,1),'MiB',flush=True)
    return relative,target

def voice_packs(dest,manifests):
    index={'packs':{},'clips':{}};raw=set();records=[];number=0
    for language,m in manifests.items():
        chapter=None;payload=bytearray();members=[]
        def flush():
            nonlocal number,payload,members
            if not payload:return
            identity=f'p{number:03d}';number+=1
            relative=f'assets/voice-packs/{identity}.bin';p=dest/relative;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(payload)
            index['packs'][identity]={'src':relative,'bytes':len(payload)}
            for src,offset,length in members:
                index['clips'][src]={'pack':identity,'offset':offset,'length':length}
            payload=bytearray();members=[]
        for identity,clip in m['clips'].items():
            src=clip['src'];data=(ROOT/src).read_bytes();section=identity.split('.')[0]
            if section!=chapter or len(payload)+len(data)>1024*1024:flush()
            chapter=section
            if src in index['clips'] or any(x[0]==src for x in members):continue
            members.append((src,len(payload),len(data)));payload.extend(data);raw.add(src)
            records.append({'id':identity,'language':language,'src':src,'sha256':hashlib.sha256(data).hexdigest()})
        flush()
    (dest/'portal-pack-index.js').write_text('globalThis.VN_PACK_INDEX='+json.dumps(index,separators=(',',':'))+';\n',encoding='utf8')
    shutil.copyfile(TEMPLATES/'asset-packs.js',dest/'portal-assets.js')
    # All included clips are checked byte for byte after indexing, before ZIP creation.
    buffers={key:(dest/spec['src']).read_bytes() for key,spec in index['packs'].items()}
    for src,clip in index['clips'].items():
        assert buffers[clip['pack']][clip['offset']:clip['offset']+clip['length']]==(ROOT/src).read_bytes(),src
    return raw,records,len(index['packs'])

def write_text(dest,relative,text,mapping):
    for old,new in mapping.items():text=text.replace(old,new)
    p=dest/relative;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text,encoding='utf8',newline='\n')

def write_kit(out,version,screenshots=None):
    kit=out/'upload-kit';kit.mkdir(exist_ok=True)
    for name in ['listing-plicy.txt','listing-itchio.md','upload-guide.md']:
        text=(TEMPLATES/name).read_text(encoding='utf8')
        for key,value in {'version':version,'plicy_zip':f'stella-plicy-v{version}.zip','itchio_zip':f'stella-itchio-v{version}.zip'}.items():
            text=text.replace('{{'+key+'}}',value)
        (kit/name).write_text(text,encoding='utf-8-sig')
    if screenshots:
        target=kit/'screenshots';target.mkdir(exist_ok=True)
        for p in screenshots.iterdir():
            if re.fullmatch(r'screen\d+\.(?:jpg|png)|captions\.txt',p.name):shutil.copyfile(p,target/p.name)
    with zipfile.ZipFile(out/'stella-upload-kit.zip','w',zipfile.ZIP_DEFLATED) as z:
        for p in sorted(kit.rglob('*')):
            if p.is_file():z.write(p,p.relative_to(kit).as_posix())

def build(profile,out,c,b,files,manifests,converted,thumbnail):
    dest=out/profile;dest.mkdir()
    optimized=profile=='itchio'
    mapping={p:str(Path(p).with_suffix('.webp')).replace('\\','/') for p in converted if optimized and p.endswith('.png')}
    raw,voice_records,pack_count=voice_packs(dest,manifests) if optimized else (set(),[],0)
    transformed=[]
    for relative in sorted(files-raw):
        source=converted.get(relative,ROOT/relative) if optimized else ROOT/relative
        target=dest/mapping.get(relative,relative);target.parent.mkdir(parents=True,exist_ok=True)
        if Path(relative).suffix in ['.js','.css','.html']:
            text=(ROOT/relative).read_text(encoding='utf8')
            if relative=='index.html':
                start=text.index('  <!-- Google Analytics -->');end=text.index('  <!-- ホーム画面アイコン',start)
                text=text[:start]+text[end:]
                text=text.replace('href="lp/index.html"','href="https://www.houkago-stella.com/lp/"')
                scripts='<script src="portal-pack-index.js"></script>\n<script src="portal-assets.js"></script>\n' if optimized else '<script src="plicy-thumbnail.js"></script>\n'
                text=text.replace('<script src="config.js?',scripts+'<script src="config.js?',1)
            if relative=='config.js':
                patch={'analytics':{'enabled':False},'settings':{'debug':False}}
                if optimized:
                    patch['i18n']={'defaultLanguage':'en'}
                    for kind in ['backgroundExtOverrides','stillExtOverrides']:
                        patch[kind]={key:'.webp' if value=='.png' else value for key,value in c[kind].items()}
                text+='\n// Distribution-specific settings; game content is shared.\n'
                for key,values in patch.items():text+='Object.assign(VN_CONFIG.'+key+','+json.dumps(values)+');\n'
            if optimized and relative=='voice.js':
                needle='dependencies.fetch || ((...args) => fetch(...args))'
                assert text.count(needle)==1,'Voice implementation changed; update the distribution adapter'
                text=text.replace(needle,'dependencies.fetch || globalThis.VN_PORTAL_VOICE_FETCH || ((...args) => fetch(...args))')
            if optimized and relative=='game.js':
                needle='assets/images/chars/${charKey}/${expr}.png'
                assert text.count(needle)==2,'Character image paths changed'
                text=text.replace(needle,'assets/images/chars/${charKey}/${expr}.webp')
            write_text(dest,relative,text,mapping)
        else:shutil.copyfile(source,target)
        if source!=ROOT/relative:transformed.append({'source':relative,'target':target.relative_to(dest).as_posix(),'source_sha256':sha(ROOT/relative),'sha256':sha(target)})
    if not optimized:
        shutil.copyfile(TEMPLATES/'plicy-thumbnail.js',dest/'plicy-thumbnail.js')
        with Image.open(thumbnail) as image:image.convert('RGB').save(dest/'portal-thumbnail.jpg','JPEG',quality=94,optimize=True)
    (dest/'readme.txt').write_text('放課後のステラ　嘘と願いのバウンドリー / After School Stella\nVersion '+c['version']+'\n無料ブラウザーゲーム / Free browser game\n日本語・英語テキストとボイス / Japanese and English text and voices\n公式サイト / Official website: https://www.houkago-stella.com/\n制作に生成AIを使用しています。 / Created with generative AI assistance.\nこのZIPはブラウザーゲーム投稿用です。index.htmlから起動します。\nThis ZIP is for HTML5 hosting. Serve index.html over HTTP(S).\n',encoding='utf8')
    paths=sorted(p for p in dest.rglob('*') if p.is_file())
    total=sum(p.stat().st_size for p in paths)
    largest=max(p.stat().st_size for p in paths)
    assert all(len(p.relative_to(dest).as_posix())<=240 for p in paths)
    if optimized:
        assert len(paths)<=1000,(profile,'file count',len(paths))
        assert total<=500_000_000,(profile,'uncompressed bytes',total)
        assert largest<=200_000_000,(profile,'single file',largest)
    archive=out/f'stella-{profile}-v{c["version"]}.zip'
    with zipfile.ZipFile(archive,'w') as z:
        for p in paths:z.write(p,p.relative_to(dest).as_posix(),compress_type=zipfile.ZIP_DEFLATED if p.suffix in ['.js','.css','.html','.json','.md','.txt','.svg'] else zipfile.ZIP_STORED)
    if not optimized:assert archive.stat().st_size<=2_000_000_000
    report={'profile':profile,'version':c['version'],'files':len(paths),'uncompressed_bytes':total,'zip_bytes':archive.stat().st_size,'zip':str(archive),
        'default_language':'en' if optimized else c['i18n']['defaultLanguage'],'debug':False,
        'voice_clips':sum(len(m['clips']) for m in manifests.values()),'voice_packs':pack_count,'transformations':transformed,
        'source_files':sorted(files),'voice_hashes':voice_records,'files_sha256':{p.relative_to(dest).as_posix():sha(p) for p in paths}}
    (out/f'{profile}-build.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
    print('READY',profile,len(paths),'files',round(total/2**20,1),'MiB',archive,flush=True)
    return report

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--output',type=Path,default=ROOT.parent/'stella-distributions-20261023')
    parser.add_argument('--node',default=shutil.which('node') or 'C:/Users/daiki/AppData/Local/Programs/Microsoft VS Code/Code.exe')
    parser.add_argument('--ffmpeg',default=shutil.which('ffmpeg') or 'D:/AI/houkago-stella-op/試作_v1/tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe')
    parser.add_argument('--thumbnail',type=Path,default=ROOT/'og.png')
    parser.add_argument('--screenshots',type=Path,help='Optional directory of publication screenNN.jpg/png and captions.txt')
    parser.add_argument('--profile',choices=['both','plicy','itchio'],default='both',help='Build both portals or only the selected portal')
    args=parser.parse_args();args.output.mkdir(parents=True,exist_ok=True)
    out=args.output/('build-'+time.strftime('%Y%m%d-%H%M%S'));out.mkdir()
    cache=args.output/'conversion-cache';cache.mkdir(exist_ok=True)
    data=config(args.node);c,b=data['config'],data['bonus'];files,manifests=inventory(c,b)
    print('INPUT',len(files),'files',round(sum((ROOT/p).stat().st_size for p in files)/2**20,1),'MiB',flush=True)
    if args.profile in ['both','plicy']:build('plicy',out,c,b,files,manifests,{},args.thumbnail)
    converted={};images=[p for p in files if p.startswith('assets/images/') and p.endswith('.png')]
    videos=[p for p in files if p.endswith('.mp4') and (ROOT/p).stat().st_size>10*2**20]
    # Separate paths/cache keys, so conversions can safely run in parallel.
    if args.profile in ['both','itchio']:
        with ThreadPoolExecutor(max_workers=2) as pool:
            futures=[pool.submit(convert_video,p,cache,args.ffmpeg) for p in videos]
            futures.extend(pool.submit(convert_image,p,cache) for p in images)
            done=0
            for future in as_completed(futures):
                p,result=future.result();converted[p]=result;done+=1
                if done%20==0:print('CONVERTED',done,'/',len(futures),flush=True)
        build('itchio',out,c,b,files,manifests,converted,args.thumbnail)
    write_kit(out,c['version'],args.screenshots)
    (args.output/'latest.txt').write_text(str(out)+'\n',encoding='utf8')
    print('ALL READY',out,flush=True)

if __name__=='__main__':main()
