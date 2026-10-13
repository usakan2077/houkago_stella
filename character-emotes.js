// Character-only motion; image scaling and slot placement remain on their own layers.
class VNCharacterEmote {
  static active = new WeakMap();
  static definitions = {
    bounce:{label:'嬉しく弾む',duration:900,motion:'bounce'},
    joy:{label:'弾む＋きらめく',duration:1400,motion:'bounce',decoration:'sparkle'},
    sparkle:{label:'キラキラ',duration:1400,decoration:'sparkle'},
    wobble:{label:'よろよろ',duration:1300,motion:'wobble'},
    fall:{label:'よろけて倒れる',duration:1500,motion:'fall',hold:true},
    slump:{label:'しゅんと沈む',duration:650,motion:'slump',hold:true},
    tremble:{label:'かすかに震える',duration:1050,motion:'tremble',maxStrength:.35},
    nod:{label:'小さくうなずく',duration:700,motion:'nod'},
    startle:{label:'びくっと驚く',duration:650,motion:'startle'},
    shy:{label:'照れて身をよじる',duration:1100,motion:'shy'},
    anger:{label:'むっとする・青筋',duration:850,motion:'anger',decoration:'anger'},
    irritated:{label:'静かにむっとする',duration:700,motion:'irritated'},
    sweat:{label:'あせあせ',duration:1100,motion:'wobble',decoration:'sweat'},
    heart:{label:'ふわっと好意',duration:1400,decoration:'heart'},
    sigh:{label:'ため息',duration:1000,motion:'slump',decoration:'sigh'},
  };
  static clear(sprite) {
    const active=this.active.get(sprite); if(!active)return;
    this.active.delete(sprite); active.animations.forEach(a=>a.cancel());
    active.nodes.forEach(n=>n.remove()); clearTimeout(active.timer);
  }
  static frames(name,s) {
    const tr=(x=0,y=0,r=0,k=1)=>`translate(${x*s}px, ${y*s}px) rotate(${r*s}deg) scale(${k})`;
    const sequence=(points)=>points.map(([x,y,r,k])=>({transform:tr(x,y,r,k ?? 1)}));
    switch(name){
      case 'bounce':return sequence([[0,0,0],[0,3,0,.99],[0,-19,-1],[0,0,0],[0,-10,1],[0,0,0]]);
      case 'wobble':return sequence([[0,0,0],[-7,0,-4],[8,0,5],[-5,0,-3],[3,0,2],[0,0,0]]);
      case 'fall':return sequence([[0,0,0],[-7,0,-4],[9,4,7],[-4,8,-3],[20,18,18],[70,72,65]]);
      case 'slump':return sequence([[0,0,0],[0,14,3,.98],[0,27,5,.96]]);
      case 'tremble':return Array.from({length:17},(_,i)=>({transform:tr(i===0||i===16?0:(i%2?2:-2),0,0)}));
      case 'nod':return sequence([[0,0,0],[0,7,1,.99],[0,0,0],[0,5,1],[0,0,0]]);
      case 'startle':return sequence([[0,0,0],[0,-13,-2,1.02],[0,2,1],[0,0,0]]);
      case 'shy':return sequence([[0,0,0],[-5,2,-2],[4,2,2],[-3,2,-1],[0,0,0]]);
      case 'irritated':return sequence([[0,0,0],[0,-1,-.3,1.005],[0,0,0]]);
      case 'anger':return sequence([[0,0,0],[0,-2,-1,1.015],[0,0,1,1.015],[0,0,0]]);
      default:return [];
    }
  }
  static play(sprite,name,strength=1) {
    if(!sprite)return false;
    const def=this.definitions[name]; if(name!=='clear'&&!def)return false;
    this.clear(sprite);
    if(name==='clear')return true;
    strength=Number.isFinite(Number(strength))?Math.max(.35,Math.min(1.5,Number(strength))):1;
    const reduced=globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if(def.maxStrength != null) strength=Math.min(strength,def.maxStrength);
    const active={animations:[],nodes:[],timer:null};this.active.set(sprite,active);
    const add=(node,frames,options)=>{if(node.animate){const animation=node.animate(frames,options); active.animations.push(animation);return animation;}};
    sprite.style.transformOrigin='50% 100%';
    if(def.motion&&!reduced)add(sprite,this.frames(def.motion,strength),{duration:def.duration,easing:'ease-in-out',fill:def.hold?'forwards':'none'});
    if(def.decoration){
      const layer=document.createElement('div');layer.className='char-emote-particles';layer.setAttribute('aria-hidden','true');sprite.appendChild(layer);active.nodes.push(layer);
      const image=sprite.querySelector?.('img');
      if(image?.getBoundingClientRect && sprite.getBoundingClientRect){
        const picture=image.getBoundingClientRect(),box=sprite.getBoundingClientRect();
        // Anchor to the displayed picture, including scale/offset, rather than empty slot space.
        layer.style.left=(picture.left-box.left)+'px';layer.style.top=(picture.top-box.top)+'px';
        layer.style.width=picture.width+'px';layer.style.height=picture.height+'px';
        layer.style.right='auto';layer.style.bottom='auto';
      }
      const count={sparkle:3,heart:2,sweat:3,anger:1,sigh:1}[def.decoration];
      const positions={sparkle:[[26,22],[76,31],[67,12]],heart:[[75,21],[82,33]],sweat:[[73,16],[75,20],[74,24]]};
      for(let i=0;i<count;i++){
        const kind=def.decoration;
        const particle=document.createElement('span');particle.className='char-emote-particle emote-'+kind;
        particle.textContent={sparkle:'✦',heart:'♥',sweat:'',anger:'',sigh:'…'}[kind];
        const [left,top]=positions[kind]?.[i] || [kind==='anger'?72:35,kind==='anger'?8:22];
        particle.style.left=left+'%';particle.style.top=top+'%';
        particle.style.fontSize=(kind==='sparkle'?[12,15,17][i]:kind==='heart'?14+i*2:27)+'px';
        if(kind==='anger')particle.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9H5C8 9 9 8 9 5V3 M15 3V5C15 8 16 9 19 9H21 M21 15H19C16 15 15 16 15 19V21 M9 21V19C9 16 8 15 5 15H3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
        layer.appendChild(particle);
        if(kind==='anger'){
          if(!reduced)add(particle,[
            {offset:0,opacity:0,transform:'scale(.78)'},
            {offset:.3,opacity:.7,transform:'scale(1.1)'},
            {offset:.65,opacity:.6,transform:'scale(.94)'},
            {offset:1,opacity:0,transform:'scale(1)'}
          ],{duration:def.duration,easing:'ease-in-out',fill:'both'});
        }else if(kind==='sweat'){
          // Three separate droplets fan out from the side of the head.
          const [dx,dy]=[[26,-20],[36,-2],[29,18]][i];
          const angle=Math.atan2(dy,dx)*180/Math.PI+45;
          particle.style.transform=`rotate(${angle}deg)`;
          if(!reduced)add(particle,[
            {offset:0,opacity:0,transform:`translate(0,0) rotate(${angle}deg) scale(.45)`},
            {offset:.25,opacity:.95,transform:`translate(${dx*.35}px,${dy*.35}px) rotate(${angle}deg) scale(1)`},
            {offset:1,opacity:0,transform:`translate(${dx}px,${dy}px) rotate(${angle}deg) scale(.65)`}
          ],{duration:620,delay:70+i*55,easing:'ease-out',fill:'both'});
        }else{
          const subtle=kind==='sparkle'||kind==='heart';
          const peak=kind==='sparkle'?.55:kind==='heart'?.45:1;
          if(!reduced)add(particle,[
            {opacity:0,transform:subtle?'translateY(3px) scale(.8)':'translateY(8px) scale(.4)'},
            {opacity:peak,transform:subtle?'translateY(-2px) scale(1)':'translateY(-6px) scale(1)'},
            {opacity:0,transform:subtle?'translateY(-10px) scale(.85)':'translateY(-28px) scale(.7)'}
          ],{duration:def.duration*.72,delay:i*(subtle?150:70),easing:'ease-out',fill:'both'});
        }
      }
    }
    // Held poses are deliberate: explicit clear, expression/scene change or skip restores them.
    if(!def.hold||reduced)active.timer=setTimeout(()=>{if(this.active.get(sprite)===active)this.clear(sprite);},def.duration+450);
    return true;
  }
}
