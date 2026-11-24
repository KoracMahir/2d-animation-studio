// A family skating story adapted from Jenna's pencil comic.
(() => {
  const ink = '#3B2948', lines = ASSETS.scene.scene76_day_on_ice.dialogue;
  const box = (x,y,w,h,c) => shape(rectPts(x,y,w,h), {fill:c,stroke:ink,lwPx:3});
  function text(s,x,y,size=40,c=ink) {
    X.font = `700 ${size}px ${FONT_TALK}`; X.textAlign='center'; X.textBaseline='middle'; X.fillStyle=c; X.fillText(s,x,y);
  }
  const talking = (t, who) => lines.some(l => l.speaker===who && t>l.at+.2 && t<l.at+.2+l.text.length/l.cps);
  function bubbles(t, a, b) {
    for(const l of lines) {
      const p = l.speaker==='sami' ? a : b;
      if(p) callout(l.text, ...p.mouth, t-l.at, {size:44,maxW:610,cps:l.cps,hold:l.hold,dx:l.speaker==='sami'?340:-340,dy:-185});
    }
  }
  function room(t, mud=false) {
    box(-100,-100,2120,1200,'#F7EAD5');
    shape([[0,750],[1920,750],[2150,1080],[-230,1080]],{fill:'#CFA77D',stroke:ink,lwPx:3});
    for(let x=-500;x<2500;x+=190) line([[960+(x-960)*.68,750],[x,1080]],{stroke:'#AF8866',lwPx:2});
    box(0,724,1920,28,'#FFF7E6');
    if(mud) {
      box(1300,190,310,560,'#729AA4'); box(1320,210,270,520,'#B9DADE'); circle(1550,490,10,{fill:'#E8C15F',stroke:ink,lwPx:2});
      box(180,525,560,50,'#9F725E');
      for(let i=0;i<4;i++) {circle(250+i*130,555,9,{fill:ink,stroke:null}); line([[250+i*130,555],[250+i*130,580]],{stroke:ink,lwPx:6});}
      box(250,840,500,35,'#A1775E'); box(275,875,30,100,'#805C4A'); box(680,875,30,100,'#805C4A');
      text('READY FOR ADVENTURE',960,90,42);
    } else {
      box(120,210,420,360,'#FFF7EC'); box(143,233,374,314,'#B9E5EE');
      circle(430,300,44,{fill:'#FFE497',stroke:null}); line([[330,233],[330,547]],{stroke:'#FFF7EC',lwPx:15});
      box(1210,550,580,260,'#95B4CA'); box(1190,690,620,160,'#7196B2');
      box(1245,625,205,110,'#F2CAA6'); box(1550,625,205,110,'#D7BCD9');
      ellipse(920,943,610,95,{fill:'#DBB2AE',stroke:null});
      text('A DAY ON THE ICE',960,95,64); text('Sami & Jenna',960,158,32,'#916581');
    }
  }
  function rink(t) {
    box(-100,-100,2120,1200,linGrad(0,0,0,1080,[[0,'#9CB9D3'],[.5,'#DDEAF3'],[1,'#EFFCFF']]));
    // Project the ice markings, boards and roof supports in world space.
    const P=persp({x:10*Math.sin(t*.13),y:150,z:-380+5*Math.sin(t*.15),f:950,hy:420});
    const poly=(pts,c,stroke=null,lw=3)=>{const q=P.poly(pts); if(q) shape(q,{fill:c,stroke,lwPx:lw});};
    poly([[-1400,0,900],[1400,0,900],[1400,65,900],[-1400,65,900]],'#FFFDF2',ink);
    poly([[-1400,0,900],[1400,0,900],[1400,9,900],[-1400,9,900]],'#EDC05D');
    poly([[-1400,62,900],[1400,62,900],[1400,68,900],[-1400,68,900]],'#6B8EA7');
    for(let i=-4;i<=4;i++) {
      const q=P.poly([[i*340,68,900],[i*340,215,900]]); if(q) line(q,{stroke:'#87A9BD',lwPx:4});
      const r=P.poly([[i*340,215,900],[i*170,350,1450]]); if(r) line(r,{stroke:'#7293AE',lwPx:8});
    }
    for(const z of [0,600]) poly([[-1400,.5,z],[1400,.5,z],[1400,.5,z+8],[-1400,.5,z+8]],'#E0A5B7');
    const q=P.poly(Array.from({length:80},(_,i)=>[240*Math.cos(i*TAU/80),1,300+240*Math.sin(i*TAU/80)]));
    if(q) shape(q,{fill:null,stroke:'#8FBBD5',lwPx:4});
    for(let i=0;i<18;i++) {const x=80+hash(i+81)*1760,y=680+hash(i+45)*360; line([[x,y],[x+85,y-8]],{stroke:'rgba(117,171,193,.18)',lwPx:2});}
    box(1360,230,400,115,'#456580'); text('ICE ARENA',1560,283,42,'#FFF9DF');
    // Fafy watches from a bench beyond the ice.
    box(232,477,205,17,'#A4806B'); box(250,494,14,51,'#6F6474'); box(404,494,14,51,'#6F6474');
    X.save(); X.translate(333,474); X.scale(9,9); jeGiraffe(.2,false); X.restore();
    text('FAFY',335,529,18,'#516B82');
  }
  function blade(x,y,s) {
    line([[x-s,y+2],[x-s,y+9],[x+s,y+9],[x+s*1.45,y+3]],{stroke:ink,lwPx:4});
    line([[x-s*1.15,y+11],[x+s*1.45,y+11]],{stroke:'#9DAEBB',lwPx:5});
  }
  function girl(t,x,y,s,o={},skating=false) {
    const a=jenna(x,y,s,{t,mouth:lipFlap(t,talking(t,'jenna'),'smile'),giraffe:!skating,outfit:t>=15?'winter':undefined,...o});
    if(skating) {
      // Helmet above her brow; existing rig anchors follow jumps and vertical spins.
      const hx=(a.eyeL[0]+a.eyeR[0])/2, ey=(a.eyeL[1]+a.eyeR[1])/2;
      const width=5.8*s*Math.max(.22,Math.abs(Math.cos(o.spin||0)));
      X.save(); X.beginPath(); X.ellipse(hx,ey-1.7*s,width,4.8*s,0,Math.PI,TAU); X.closePath();
      X.fillStyle='#AA8DBF'; X.strokeStyle=ink; X.lineWidth=3; X.fill(); X.stroke();
      for(const d of [-.4,0,.4]) line([[hx+d*width,ey-5.3*s],[hx+d*width,ey-4.6*s]],{stroke:'#725589',lwPx:3});
      X.restore();
      for(const p of [a.footL,a.footR]) blade(...p,s*.95);
    }
    return a;
  }
  function dad(t,x,y,s,o={},skating=false) {
    const a=sami(x,y,s,{t,mouth:lipFlap(t,talking(t,'sami'),'smile'),...o});
    if(skating) for(const f of [o.footL||[-1.25,-.8],o.footR||[1.25,-.8]]) blade(x+f[0]*s,y+f[1]*s,s*1.25);
    return a;
  }
  function home(t) {
    camBegin(960,540,1+.018*seg(t,0,15),.001*Math.sin(t)); room(t);
    const a=dad(t,650,967,18,{handR:[5.3,-12.5],handPoseR:'palm',tilt:.025*Math.sin(t)});
    const b=girl(t,1265,969,16,{handR:[4.5,-17],eyes:t>6&&t<9?'happy':'open',hairSwing:.15*Math.sin(t)});
    bubbles(t,a,b); camEnd();
  }
  function ready(t) {
    camBegin(960,540,1+.02*seg(t,15,21),0); room(t,true);
    const zip=ease(seg(t,16.4,17.2));
    const a=dad(t,1220,985,17,{handL:[-5,-13],handPoseL:'thumb'});
    const b=girl(t,880,980,17,{handR:[.8,-10-6*zip],hairSwing:.2*Math.sin(t*2),zip});
    bubbles(t,a,b); if(t>17&&t<18.3) sfx('ZIP!',1080,540,68,'#FFE19A',t-17); camEnd();
  }
  function learn(t) {
    camBegin(960+12*Math.sin(t*.3),540,1.01,0); rink(t);
    const k=ease(seg(t,29,33)), x=lerp(1080,1210,k);
    const a=dad(t,620,959,17.8,{lean:(1-k)*.09*Math.sin(t*4),brows:t<26?'worried':'normal',handL:[-6,-14],handR:[6,-14],handPoseR:'palm'},true);
    const b=girl(t,x,970,16.5,{handL:[-6,-15],handR:[6,-15],hairSwing:.3*Math.sin(t*3),brows:'normal'},true);
    bubbles(t,a,b); camEnd();
  }
  function tricks(t) {
    const glide=t<39, jump=t>=39&&t<43;
    const x=glide?lerp(580,1340,ease(seg(t,33,39))):jump?lerp(780,1210,ease(seg(t,39,43))):1020;
    const air=jump?Math.sin(Math.PI*seg(t,40.5,41.5))*6:0;
    const crouch=jump?(1.4* Math.sin(Math.PI*seg(t,39.3,40.5))+1.1*Math.sin(Math.PI*seg(t,41.5,42.4))):0;
    const spin=t>=43?TAU*2*ease(seg(t,43.5,47.6)):0;
    camBegin(960+(x-960)*.14,540,1.02+.015*Math.sin(t*.4),0); rink(t);
    // Curved blade trails remain on the ice while Jenna travels.
    line([[x-260,1003],[x-155,1007],[x-60,983],[x,981]],{stroke:'#90C1D4',lwPx:4,smooth:true});
    const finish=ease(seg(t,47.5,48.3));
    girl(t,x,970,18.3,{giraffe:false,lean:glide?-.06:0,dy:crouch,jump:air,spin,hairSwing:Math.sin(t*4)*.7,
      handL:[-6,-16+finish*2],handR:[6,-16+finish*2],footL:glide?[-3,-1]:[-1.4,-.65],footR:glide?[3,-2.5]:[1.4,-.65],eyes:'happy',mouth:'grin'},true);
    text(glide?'GLIDE!':jump?'JUMP!':'SPIN!',960,150,70,'#547EA2');
    if(jump&&t>41.5&&t<42.6) sfx('TA-DA!',1470,590,76,'#E6B65B',t-41.5);
    if(t>47.6) for(let i=0;i<7;i++) {const a=i*TAU/7+t*.3; shape(starPts(x+Math.cos(a)*240,570+Math.sin(a)*240,12,.4,5),{fill:'#E2B659',stroke:null});}
    camEnd();
  }
  function finale(t) {
    const move=ease(seg(t,65,68)); camBegin(960+30*move,540,1.015+.01*seg(t,49,69),0); rink(t);
    const a=dad(t,650+120*move,957,18,{lean:.025*Math.sin(t*3),handL:[-5,-13],handR:[5,-13],handPoseR:'palm',eyes:t>65?'happy':'open',brows:t>55&&t<60?'quizzical':'normal'},true);
    const b=girl(t,1240+100*move,970,16.8,{handL:[-5.5,-15],handR:[5.5,-15],eyes:'happy',hairSwing:.25*Math.sin(t*2)},true);
    bubbles(t,a,b); if(t>66) text('Every great skater starts with a little wobble.',960,145,42,'#456580');
    camEnd();
  }
  scene({duration:69,fps:24,bpm:108,shots:[[0,home],[15,ready],[21,learn],[33,tricks],[39,tricks],[43,tricks],[49,finale]]});
})();
