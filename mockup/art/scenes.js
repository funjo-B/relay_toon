/* ════════════════════════════════════════════════════════
   Relay Toon — 기능 중심 UI/UX 목업 생성기
   · UI: 다크 프로덕트 디자인 (보라 포인트)
   · 웹툰 시뮬레이션 영역: 흑백 라인 그림체 (종이 위 잉크)
   ════════════════════════════════════════════════════════ */

const C = {
  bg:"#0d0f16", win:"#141722", card:"#1a1e2c", card2:"#20263a",
  line:"#2a3044", line2:"#39415c",
  txt:"#e9ebf2", sub:"#9aa2ba", dim:"#5d6580",
  acc:"#7c5cff", acc2:"#4ecdc4", warn:"#ffb84e", red:"#ff6161", green:"#2eb872",
  paper:"#f7f5ef", ink:"#22201d"
};

const DEFS = `
<defs>
  <linearGradient id="accG" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#8d6fff"/><stop offset="100%" stop-color="#6a48f0"/>
  </linearGradient>
  <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
    <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.4"/>
  </filter>
  <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
    <feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <pattern id="halftone" width="9" height="9" patternUnits="userSpaceOnUse">
    <circle cx="4.5" cy="4.5" r="1.4" fill="#22201d" opacity="0.22"/>
  </pattern>
</defs>`;

/* ── 기본 도형 ── */
function S(inner){ return `<svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system, 'Apple SD Gothic Neo', sans-serif">${DEFS}<rect width="1600" height="900" fill="${C.bg}"/>${inner}</svg>`; }
function txt(x,y,t,size=20,color=C.txt,weight=400,anchor="start"){ return `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${t}</text>`; }
function card(x,y,w,h,fill=C.card,stroke=C.line,r=16,sw=1.5){ return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`; }

/* ── UI 키트 ── */
function win(x,y,w,h,title="Relay Toon",url="relaytoon.app"){
  return `<g filter="url(#soft)">${card(x,y,w,h,C.win,C.line,20,2)}</g>
  <circle cx="${x+32}" cy="${y+27}" r="6.5" fill="#ff5f57"/><circle cx="${x+56}" cy="${y+27}" r="6.5" fill="#febc2e"/><circle cx="${x+80}" cy="${y+27}" r="6.5" fill="#28c840"/>
  ${card(x+w/2-180,y+12,360,30,"#0d0f16",C.line,15,1)}
  ${txt(x+w/2,y+33,"🔒 "+url,15,C.dim,400,"middle")}
  ${txt(x+w-36,y+34,title,15,C.dim,600,"end")}
  <line x1="${x}" y1="${y+54}" x2="${x+w}" y2="${y+54}" stroke="${C.line}" stroke-width="1.5"/>`;
}
function topnav(x,y,w,active="홈"){
  const items=["홈","탐색","릴레이","브랜치","이벤트"];
  let out = txt(x+34,y+38,"Relay",26,C.txt,800)+txt(x+104,y+38,"Toon",26,C.acc,800), cx=x+230;
  items.forEach(it=>{ const on=it===active;
    out += on ? `<rect x="${cx-14}" y="${y+10}" width="${it.length*19+28}" height="38" rx="19" fill="${C.acc}" opacity="0.16"/>`+txt(cx+ (it.length*19)/2,y+36,it,18,C.acc,700,"middle")
              : txt(cx+(it.length*19)/2,y+36,it,18,C.sub,500,"middle");
    cx += it.length*19+44; });
  out += `<circle cx="${x+w-44}" cy="${y+29}" r="17" fill="${C.acc}"/>`+txt(x+w-44,y+35,"백",14,"#fff",700,"middle");
  out += card(x+w-260,y+11,170,36,"#0d0f16",C.line,18,1)+txt(x+w-245,y+34,"🪙 2,450",16,C.warn,700);
  return out + `<line x1="${x}" y1="${y+58}" x2="${x+w}" y2="${y+58}" stroke="${C.line}" stroke-width="1.5"/>`;
}
function uiBtn(x,y,w,h,label,kind="primary",fs=17){
  const fills={primary:"url(#accG)",ghost:"transparent",dark:C.card2,green:C.green,warn:C.warn,red:C.red};
  const strokes={primary:"none",ghost:C.line2,dark:C.line2,green:"none",warn:"none",red:"none"};
  const tcol = kind==="ghost"?C.sub:"#fff";
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h/2}" fill="${fills[kind]}" stroke="${strokes[kind]}" stroke-width="1.5"/>`+txt(x+w/2,y+h/2+fs*0.36,label,fs,tcol,700,"middle");
}
function uiInput(x,y,w,h,value,placeholder=false,fs=18){
  return card(x,y,w,h,"#0d0f16",C.line2,h/2,1.5)+txt(x+24,y+h/2+fs*0.36,value,fs,placeholder?C.dim:C.txt,400)
  + (placeholder?"":`<line x1="${x+30+value.length*fs*0.92}" y1="${y+12}" x2="${x+30+value.length*fs*0.92}" y2="${y+h-12}" stroke="${C.acc}" stroke-width="2"/>`);
}
function chip(x,y,label,on=false,fs=15){
  const w=label.length*fs*0.95+30;
  return `<rect x="${x}" y="${y}" width="${w}" height="${fs*2.1}" rx="${fs*1.05}" fill="${on?C.acc:"transparent"}" stroke="${on?C.acc:C.line2}" stroke-width="1.5"/>`+txt(x+w/2,y+fs*1.4,label,fs,on?"#fff":C.sub,on?700:400,"middle") + `<!--w:${w}-->`;
}
function chipRow(x,y,labels,activeIdx=0,fs=15){
  let out="",cx=x;
  labels.forEach((l,i)=>{ out+=chip(cx,y,l,i===activeIdx,fs); cx += l.length*fs*0.95+30+14; });
  return out;
}
function toggle(x,y,on=true){
  return `<rect x="${x}" y="${y}" width="58" height="30" rx="15" fill="${on?C.green:C.line2}"/><circle cx="${on?x+43:x+15}" cy="${y+15}" r="11" fill="#fff"/>`;
}
function avatar(x,y,r,label,color=C.acc){
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`+txt(x,y+r*0.38,label,r*0.85,"#fff",700,"middle");
}
function bar(x,y,w,h,ratio,color=C.acc){
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h/2}" fill="${C.line}"/><rect x="${x}" y="${y}" width="${Math.max(h,w*ratio)}" height="${h}" rx="${h/2}" fill="${color}"/>`;
}
function aiTag(x,y,label="AI",fs=14){
  const w=label.length*fs*0.8+26;
  return `<rect x="${x}" y="${y}" width="${w}" height="${fs*1.9}" rx="${fs*0.55}" fill="url(#accG)"/>`+txt(x+w/2,y+fs*1.3,"✦ "+label,fs,"#fff",800,"middle");
}
function chatAI(x,y,w,lines,fs=18){
  const h=lines.length*fs*1.7+34;
  let out = aiTag(x,y,"AI 감독")+card(x,y+34,w,h,C.card2,C.line,16);
  lines.forEach((l,i)=> out+=txt(x+22,y+66+i*fs*1.7,l,fs,C.txt));
  return out;
}
function chatUser(x,y,w,text,fs=18){
  return `<rect x="${x}" y="${y}" width="${w}" height="${fs*2.6}" rx="16" fill="url(#accG)"/>`+txt(x+w/2,y+fs*1.65,text,fs,"#fff",500,"middle");
}
function listRow(x,y,w,h,title,meta,btnLabel="참여하기"){
  return card(x,y,w,h,C.card,C.line,14)+txt(x+28,y+h/2-8,title,20,C.txt,700)+txt(x+28,y+h/2+22,meta,15,C.sub)
  +uiBtn(x+w-150,y+h/2-21,122,42,btnLabel,"primary",15);
}
function sideRail(x,y,h,activeIdx=0){
  const items=["🏠 홈","🔥 인기","🌿 브랜치","🎪 이벤트","✏️ 내 작품","⚙️ 설정"];
  let out = `<rect x="${x}" y="${y}" width="210" height="${h}" fill="#10131d"/><line x1="${x+210}" y1="${y}" x2="${x+210}" y2="${y+h}" stroke="${C.line}" stroke-width="1.5"/>`;
  items.forEach((it,i)=>{
    if(i===activeIdx) out+=`<rect x="${x+14}" y="${y+22+i*58}" width="182" height="44" rx="12" fill="${C.acc}" opacity="0.18"/>`;
    out += txt(x+32,y+50+i*58,it,17,i===activeIdx?C.acc:C.sub,i===activeIdx?700:400);
  });
  return out;
}

/* ── 흑백 웹툰 그림체 키트 (종이 + 잉크) ── */
function toonPanel(x,y,w,h,r=8){
  return `<g filter="url(#soft)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${C.paper}" stroke="${C.ink}" stroke-width="4"/></g>`;
}
/* 잉크 사람: 철수(안경) 등 — 간단한 라인 드로잉 */
function inkBoy(x,y,s,opts={}){
  const {glasses=true, walk=false, arm="down", face="calm"} = opts;
  const eyes = glasses
    ? `<circle cx="-11" cy="-4" r="9" fill="none" stroke="${C.ink}" stroke-width="3"/><circle cx="11" cy="-4" r="9" fill="none" stroke="${C.ink}" stroke-width="3"/><line x1="-2" y1="-4" x2="2" y2="-4" stroke="${C.ink}" stroke-width="3"/><circle cx="-11" cy="-4" r="2" fill="${C.ink}"/><circle cx="11" cy="-4" r="2" fill="${C.ink}"/>`
    : `<circle cx="-9" cy="-4" r="2.5" fill="${C.ink}"/><circle cx="9" cy="-4" r="2.5" fill="${C.ink}"/>`;
  const mouth = {calm:`<path d="M-6,12 Q0,16 6,12" stroke="${C.ink}" stroke-width="2.5" fill="none"/>`,
                 shock:`<ellipse cx="0" cy="13" rx="5" ry="7" fill="none" stroke="${C.ink}" stroke-width="2.5"/>`,
                 talk:`<ellipse cx="0" cy="13" rx="6" ry="4" fill="none" stroke="${C.ink}" stroke-width="2.5"/>`}[face];
  const legs = walk
    ? `<path d="M-6,88 L-20,128 M6,88 L22,124 M-20,128 L-30,130 M22,124 L32,126" stroke="${C.ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`
    : `<path d="M-8,88 L-9,128 M8,88 L9,128 M-9,128 L-20,130 M9,128 L20,130" stroke="${C.ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
  const arms = {down:`<path d="M-22,46 Q-30,64 -27,82 M22,46 Q30,64 27,82" stroke="${C.ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
                up:`<path d="M-22,46 Q-40,20 -46,2 M22,46 Q40,20 46,2" stroke="${C.ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
                point:`<path d="M-22,46 Q-30,64 -27,82 M22,44 Q44,38 58,34" stroke="${C.ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`}[arm];
  return `<g transform="translate(${x},${y}) scale(${s})" stroke-linejoin="round">
    <circle cx="0" cy="-8" r="26" fill="#fff" stroke="${C.ink}" stroke-width="3.5"/>
    <path d="M-24,-18 Q-18,-36 0,-36 Q20,-36 24,-16 Q12,-26 0,-26 Q-14,-26 -24,-18 Z" fill="${C.ink}"/>
    ${eyes}${mouth}
    <path d="M-20,20 L-24,50 Q-24,74 -18,88 L18,88 Q24,74 24,50 L20,20 Q0,26 -20,20 Z" fill="#fff" stroke="${C.ink}" stroke-width="3.5"/>
    <line x1="0" y1="26" x2="0" y2="86" stroke="${C.ink}" stroke-width="2"/>
    <path d="M-20,22 L0,34 L20,22" fill="none" stroke="${C.ink}" stroke-width="2.5"/>
    ${arms}${legs}
  </g>`;
}
/* 검은 실루엣 인물 (정체불명) */
function inkShadow(x,y,s){
  return `<g transform="translate(${x},${y}) scale(${s})">
    <circle cx="0" cy="-8" r="24" fill="${C.ink}"/>
    <path d="M-20,14 Q-26,60 -18,110 L18,110 Q26,60 20,14 Q0,22 -20,14 Z" fill="${C.ink}"/>
    <circle cx="-8" cy="-10" r="3.5" fill="#fff"/><circle cx="8" cy="-10" r="3.5" fill="#fff"/>
  </g>`;
}
/* 만화 말풍선 (흑백) */
function inkBubble(cx,cy,w,h,text,fs=19,shout=false){
  const shape = shout
    ? `<path d="${spiky(cx,cy,w/2,h/2)}" fill="#fff" stroke="${C.ink}" stroke-width="3.5"/>`
    : `<ellipse cx="${cx}" cy="${cy}" rx="${w/2}" ry="${h/2}" fill="#fff" stroke="${C.ink}" stroke-width="3.5"/>
       <path d="M ${cx-10} ${cy+h/2-4} L ${cx-22} ${cy+h/2+22} L ${cx+8} ${cy+h/2-6}" fill="#fff" stroke="${C.ink}" stroke-width="3.5" stroke-linejoin="round"/>`;
  return shape+txt(cx,cy+fs*0.36,text,fs,C.ink,700,"middle");
}
function spiky(cx,cy,rx,ry){
  let d="",n=14;
  for(let i=0;i<n;i++){
    const a1=(i/n)*Math.PI*2, a2=((i+0.5)/n)*Math.PI*2;
    d += (i===0?"M":"L")+(cx+Math.cos(a1)*rx)+","+(cy+Math.sin(a1)*ry)+" L"+(cx+Math.cos(a2)*rx*1.22)+","+(cy+Math.sin(a2)*ry*1.22)+" ";
  }
  return d+"Z";
}
/* 집중선 */
function speedLines(cx,cy,r1,r2,n=22){
  let out="";
  for(let i=0;i<n;i++){ const a=(i/n)*Math.PI*2 + 0.1;
    out+=`<line x1="${cx+Math.cos(a)*r1}" y1="${cy+Math.sin(a)*r1}" x2="${cx+Math.cos(a)*r2}" y2="${cy+Math.sin(a)*r2}" stroke="${C.ink}" stroke-width="${2+(i%3)}" opacity="0.85"/>`; }
  return out;
}
/* 복도 배경 (원근 라인) */
function corridor(x,y,w,h){
  const cx=x+w*0.5, cy=y+h*0.45;
  return `<clipPath id="cor${x}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath><g clip-path="url(#cor${x})">
  <line x1="${x}" y1="${y+h*0.78}" x2="${cx}" y2="${cy}" stroke="${C.ink}" stroke-width="3"/>
  <line x1="${x+w}" y1="${y+h*0.78}" x2="${cx}" y2="${cy}" stroke="${C.ink}" stroke-width="3"/>
  <line x1="${x}" y1="${y+h*0.1}" x2="${cx}" y2="${cy}" stroke="${C.ink}" stroke-width="2"/>
  <line x1="${x+w}" y1="${y+h*0.1}" x2="${cx}" y2="${cy}" stroke="${C.ink}" stroke-width="2"/>
  <rect x="${x+w*0.08}" y="${y+h*0.22}" width="${w*0.13}" height="${h*0.34}" fill="none" stroke="${C.ink}" stroke-width="2.5"/>
  <rect x="${x+w*0.79}" y="${y+h*0.22}" width="${w*0.13}" height="${h*0.34}" fill="none" stroke="${C.ink}" stroke-width="2.5"/>
  <rect x="${x}" y="${y+h*0.86}" width="${w}" height="${h*0.14}" fill="url(#halftone)"/>
  </g>`;
}
function sfx(x,y,t,fs=26,rot=-6){ return `<text x="${x}" y="${y}" fill="${C.ink}" font-size="${fs}" font-weight="900" transform="rotate(${rot} ${x} ${y})" letter-spacing="2">${t}</text>`; }

/* 자주 쓰는 컷: 철수 복도 씬 */
function cutChulsooWalk(x,y,w,h,withShadow=false){
  let out = toonPanel(x,y,w,h) + corridor(x+8,y+8,w-16,h-16);
  out += inkBoy(x+w*0.42, y+h*0.58, Math.min(w,h)/260, {walk:true});
  out += sfx(x+w*0.16, y+h*0.85, "뚜벅뚜벅", Math.min(w,h)/13);
  if(withShadow){ out += inkShadow(x+w*0.78, y+h*0.5, Math.min(w,h)/300); out += sfx(x+w*0.7, y+h*0.24, "…!?", Math.min(w,h)/11, 4); }
  return out;
}

/* ── 잉크 소품: 썸네일 차별화용 ── */
function inkGirl(x,y,s){
  return `<g transform="translate(${x},${y}) scale(${s})">
    <circle cx="0" cy="-8" r="26" fill="#fff" stroke="${C.ink}" stroke-width="3.5"/>
    <path d="M-26,-16 Q-28,-40 0,-38 Q28,-40 26,-16 Q29,12 22,28 L15,-6 Q0,-18 -15,-6 L-22,28 Q-29,12 -26,-16 Z" fill="${C.ink}"/>
    <circle cx="-9" cy="-4" r="2.5" fill="${C.ink}"/><circle cx="9" cy="-4" r="2.5" fill="${C.ink}"/>
    <path d="M-6,12 Q0,16 6,12" stroke="${C.ink}" stroke-width="2.5" fill="none"/>
    <path d="M-16,20 L-24,62 L24,62 L16,20 Q0,26 -16,20 Z" fill="#fff" stroke="${C.ink}" stroke-width="3.5"/>
    <path d="M-12,62 L-13,96 M12,62 L13,96" stroke="${C.ink}" stroke-width="4.5" stroke-linecap="round"/>
  </g>`;
}
function inkChicken(x,y,s,crown=false){
  return `<g transform="translate(${x},${y}) scale(${s})">
    <ellipse cx="0" cy="20" rx="46" ry="36" fill="#fff" stroke="${C.ink}" stroke-width="3.5"/>
    <circle cx="30" cy="-22" r="22" fill="#fff" stroke="${C.ink}" stroke-width="3.5"/>
    <path d="M50,-26 L68,-19 L50,-10 Z" fill="${C.ink}"/>
    <path d="M18,-40 q3,-12 10,-3 q4,-11 11,-2 q6,-7 8,3 L18,-38 Z" fill="${C.ink}"/>
    <circle cx="34" cy="-26" r="3.2" fill="${C.ink}"/>
    <path d="M-14,8 Q-36,18 -16,34 Q-2,38 4,26" fill="none" stroke="${C.ink}" stroke-width="3"/>
    <path d="M-10,55 L-10,72 M-17,72 L-3,72 M18,55 L18,72 M11,72 L25,72" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round"/>
    ${crown?`<path d="M14,-46 L18,-68 L28,-54 L38,-70 L46,-52 L50,-44 Z" fill="#fff" stroke="${C.ink}" stroke-width="3"/>`:""}
  </g>`;
}
function inkMoon(x,y,r){
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${C.ink}" stroke-width="3"/>
  <circle cx="${x-r*0.3}" cy="${y-r*0.15}" r="${r*0.18}" fill="none" stroke="${C.ink}" stroke-width="2"/>
  <circle cx="${x+r*0.25}" cy="${y+r*0.32}" r="${r*0.12}" fill="none" stroke="${C.ink}" stroke-width="2"/>`;
}
function inkBat(x,y,s){
  return `<path transform="translate(${x},${y}) scale(${s})" d="M0,0 Q-8,-10 -22,-6 Q-14,0 -20,8 Q-8,6 0,12 Q8,6 20,8 Q14,0 22,-6 Q8,-10 0,0 Z" fill="${C.ink}"/>`;
}
function inkRocket(x,y,s,rot=-24){
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
    <path d="M0,-46 Q17,-20 14,14 L-14,14 Q-17,-20 0,-46 Z" fill="#fff" stroke="${C.ink}" stroke-width="3.5"/>
    <circle cx="0" cy="-12" r="8" fill="none" stroke="${C.ink}" stroke-width="3"/>
    <path d="M-14,0 L-30,24 L-13,16 M14,0 L30,24 L13,16" fill="none" stroke="${C.ink}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M-6,16 Q0,32 6,16 M0,18 L0,42" stroke="${C.ink}" stroke-width="3" fill="none"/>
  </g>`;
}
function inkDice(x,y,s,rot=-14){
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
    <rect x="-22" y="-22" width="44" height="44" rx="8" fill="#fff" stroke="${C.ink}" stroke-width="3.5"/>
    <circle cx="-9" cy="-9" r="4" fill="${C.ink}"/><circle cx="9" cy="-9" r="4" fill="${C.ink}"/>
    <circle cx="0" cy="0" r="4" fill="${C.ink}"/>
    <circle cx="-9" cy="9" r="4" fill="${C.ink}"/><circle cx="9" cy="9" r="4" fill="${C.ink}"/>
  </g>`;
}
function inkHeart(x,y,s){
  return `<path transform="translate(${x},${y}) scale(${s})" d="M0,12 C-3,3 -16,-8 -16,-17 C-16,-26 -5,-28 0,-19 C5,-28 16,-26 16,-17 C16,-8 3,3 0,12 Z" fill="#fff" stroke="${C.ink}" stroke-width="3"/>`;
}

/* ── 장르별 썸네일 컷 : 한눈에 구분되는 구도 ── */
function thumbSchool(x,y,w,h){ return cutChulsooWalk(x,y,w,h); }
function thumbChicken(x,y,w,h){
  const m=Math.min(w,h);
  return toonPanel(x,y,w,h)
  + `<line x1="${x+w*0.1}" y1="${y+h*0.84}" x2="${x+w*0.9}" y2="${y+h*0.84}" stroke="${C.ink}" stroke-width="3"/>`
  + inkChicken(x+w*0.44, y+h*0.5, m/135, true)
  + sfx(x+w*0.63, y+h*0.32, "꼬끼오!!", m/11, 7)
  + sfx(x+w*0.08, y+h*0.3, "치킨왕국", m/13, -5);
}
function thumbHorror(x,y,w,h){
  const m=Math.min(w,h);
  return toonPanel(x,y,w,h)
  + `<rect x="${x+7}" y="${y+7}" width="${w-14}" height="${h-14}" rx="5" fill="url(#halftone)"/>`
  + inkMoon(x+w*0.78, y+h*0.27, m*0.16)
  + inkBat(x+w*0.28, y+h*0.2, m/115) + inkBat(x+w*0.48, y+h*0.32, m/160)
  + inkShadow(x+w*0.42, y+h*0.6, m/175)
  + sfx(x+w*0.08, y+h*0.87, "으스스…", m/12, -4);
}
function thumbRomance(x,y,w,h){
  const m=Math.min(w,h);
  return toonPanel(x,y,w,h)
  + inkBoy(x+w*0.32, y+h*0.6, m/215) + inkGirl(x+w*0.63, y+h*0.6, m/215)
  + inkHeart(x+w*0.47, y+h*0.24, m/85)
  + sfx(x+w*0.72, y+h*0.34, "두근", m/12, 8);
}
function thumbSF(x,y,w,h){
  const m=Math.min(w,h);
  return toonPanel(x,y,w,h)
  + inkRocket(x+w*0.62, y+h*0.42, m/105)
  + `<circle cx="${x+w*0.2}" cy="${y+h*0.32}" r="${m*0.1}" fill="#fff" stroke="${C.ink}" stroke-width="3"/>
     <ellipse cx="${x+w*0.2}" cy="${y+h*0.32}" rx="${m*0.18}" ry="${m*0.055}" fill="none" stroke="${C.ink}" stroke-width="2.5"/>`
  + [[0.13,0.68],[0.34,0.55],[0.82,0.72],[0.72,0.14],[0.45,0.2]].map(([fx,fy])=>`<circle cx="${x+w*fx}" cy="${y+h*fy}" r="2.6" fill="${C.ink}"/>`).join("")
  + sfx(x+w*0.08, y+h*0.88, "슈우웅—", m/12);
}
function thumbRandom(x,y,w,h){
  const m=Math.min(w,h);
  return toonPanel(x,y,w,h)
  + `<line x1="${x+w*0.4}" y1="${y+8}" x2="${x+w*0.6}" y2="${y+h-8}" stroke="${C.ink}" stroke-width="3" stroke-dasharray="10 8"/>`
  + inkHeart(x+w*0.2, y+h*0.4, m/100)
  + inkDice(x+w*0.76, y+h*0.55, m/130)
  + sfx(x+w*0.13, y+h*0.8, "?!", m/8, -8)
  + sfx(x+w*0.58, y+h*0.24, "장르 룰렛", m/13, 6);
}
function thumbDaily(x,y,w,h){
  const m=Math.min(w,h);
  return toonPanel(x,y,w,h)
  + `<g transform="translate(${x+w*0.64},${y+h*0.46}) rotate(42)">
      <rect x="-8" y="-${m*0.28}" width="16" height="${m*0.46}" fill="#fff" stroke="${C.ink}" stroke-width="3"/>
      <path d="M-8,${m*0.18} L0,${m*0.32} L8,${m*0.18} Z" fill="#fff" stroke="${C.ink}" stroke-width="3"/>
      <path d="M-3,${m*0.24} L0,${m*0.32} L3,${m*0.24} Z" fill="${C.ink}"/>
    </g>`
  + `<path d="M${x+w*0.14},${y+h*0.74} q${w*0.09},-${h*0.22} ${w*0.26},-${h*0.08}" stroke="${C.ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
  + sfx(x+w*0.1, y+h*0.3, "오늘의 1컷", m/12);
}

/* ════════════════ 장면 정의 (30컷) ════════════════ */
const SCENES = {

/* ── 소개 ── */
"intro-1": () => S(`
  ${txt(797,150,"Relay",64,C.txt,800,"end")}
  ${txt(803,150,"Toon",64,C.acc,800,"start")}
  ${txt(800,215,"AI가 세계관을 기억하고, 모두가 함께 그리는 릴레이 웹툰 플랫폼",26,C.sub,400,"middle")}
  ${uiBtn(640,255,150,52,"시작하기","primary",19)}${uiBtn(810,255,150,52,"둘러보기","ghost",19)}
  ${cutChulsooWalk(210,390,360,300)}
  ${toonPanel(620,390,360,300)}${speedLines(800,540,60,170)}${inkBoy(800,560,1.0,{face:"shock",arm:"up"})}${sfx(680,460,"두둥!!",34)}
  ${toonPanel(1030,390,360,300)}${inkShadow(1210,530,1.05)}${inkBubble(1130,470,170,70,"누구야?",22)}
  ${txt(390,740,"1. 누군가 그리면",20,C.sub,600,"middle")}
  ${txt(800,740,"2. AI가 이어주고",20,C.sub,600,"middle")}
  ${txt(1210,740,"3. 다음 사람이 잇는다",20,C.sub,600,"middle")}
  ${aiTag(770,332,"AI Story Bible이 세계관 유지",15)}
  ${txt(800,845,"개인 연재 · 팀 협업 · 공개 릴레이 · 평행세계 브랜치",20,C.dim,400,"middle")}
`),

"intro-2": () => S(`
  ${txt(800,110,"무엇이 다른가",40,C.txt,800,"middle")}
  ${card(170,170,600,620,C.card,C.line,24)}
  ${txt(470,240,"기존 웹툰 플랫폼",26,C.sub,800,"middle")}
  ${card(300,290,340,90,C.card2,C.line,16)}${avatar(350,335,24,"작",C.dim)}${txt(395,328,"작가 1명이 제작",19,C.txt,700)}${txt(395,356,"주 1회 연재 · 마감 압박",14,C.dim)}
  <path d="M470,395 L470,445" stroke="${C.dim}" stroke-width="3" marker-end="none"/>
  ${card(300,455,340,90,C.card2,C.line,16)}${txt(470,495,"플랫폼 (단방향 유통)",18,C.sub,600,"middle")}${txt(470,523,"댓글 외 참여 수단 없음",14,C.dim,400,"middle")}
  <path d="M470,560 L470,610" stroke="${C.dim}" stroke-width="3"/>
  ${card(300,620,340,90,C.card2,C.line,16)}${txt(470,660,"독자 = 소비자",18,C.sub,600,"middle")}${txt(470,688,"보기만 한다",14,C.dim,400,"middle")}
  ${card(830,170,600,620,C.card,C.acc,24,2.5)}
  ${txt(1130,240,"Relay Toon",26,C.acc,800,"middle")}
  ${card(960,290,340,90,C.card2,C.line,16)}${avatar(1010,335,24,"백",C.acc)}${avatar(1050,335,24,"친",C.acc2)}${avatar(1090,335,24,"AI","#39415c")}${txt(1130,328,"모두가 창작자",19,C.txt,700)}
  <path d="M1130,395 L1130,445" stroke="${C.acc}" stroke-width="3"/>
  ${card(960,455,340,90,C.card2,C.acc,16)}${aiTag(985,478)}${txt(1060,498,"AI 감독이 세계관 관리",18,C.txt,600)}${txt(985,527,"설정 충돌 검증 · 빈 컷 자동 생성",14,C.sub)}
  <path d="M1130,560 L1130,610" stroke="${C.acc}" stroke-width="3"/>
  ${card(960,620,340,90,C.card2,C.line,16)}${txt(1130,655,"독자 = 참여자 = 수익 파트너",17,C.txt,700,"middle")}${txt(1130,686,"기여도 기반 보상 분배",14,C.acc2,400,"middle")}
`),

"intro-3": () => S(`
  ${txt(800,100,"살아있는 세계관 — 하나의 IP가 무한히 자란다",34,C.txt,800,"middle")}
  <line x1="330" y1="480" x2="1270" y2="480" stroke="${C.acc}" stroke-width="7" stroke-linecap="round"/>
  ${txt(330,445,"1화",17,C.sub)}${txt(1230,445,"127화 →",17,C.sub)}
  ${[440,620,800,980].map(x=>`<circle cx="${x}" cy="480" r="8" fill="${C.acc}"/>`).join("")}
  <circle cx="800" cy="480" r="14" fill="${C.acc}" filter="url(#glow)"/>
  <path d="M800,480 Q930,330 1060,290" stroke="${C.acc2}" stroke-width="4.5" fill="none"/>
  ${thumbRomance(1060,190,220,170)}
  ${txt(1170,150,"로맨스 세계선",19,C.acc2,700,"middle")}
  <path d="M800,480 Q930,640 1060,680" stroke="${C.warn}" stroke-width="4.5" fill="none"/>
  ${thumbHorror(1060,560,220,170)}
  ${txt(1170,790,"공포 세계선",19,C.warn,700,"middle")}
  <path d="M620,480 Q500,640 400,690" stroke="#5ca9ff" stroke-width="4.5" fill="none"/>
  ${thumbSF(290,560,220,170)}
  ${txt(400,790,"SF 세계선 (40화 분기)",19,"#5ca9ff",700,"middle")}
  ${card(600,200,240,120,C.card,C.acc,18,2)}${aiTag(625,222)}${txt(720,270,"Story Bible",20,C.txt,800,"middle")}${txt(720,298,"모든 세계선의 설정 기억",14,C.sub,400,"middle")}
  <path d="M720,320 L790,462" stroke="${C.acc}" stroke-width="2.5" stroke-dasharray="7 6"/>
`),

/* ── 메인 기능 ── */
"feat-main-1": () => S(win(140,60,1320,780) + `
  ${txt(190,160,"새 컷 만들기",30,C.txt,800)}
  ${chipRow(190,190,["3컷 모드","1컷","자유"],0,15)}
  ${card(190,250,900,430,"#10131d",C.line,18)}
  <rect x="330" y="290" width="620" height="350" rx="8" fill="${C.paper}" stroke="${C.ink}" stroke-width="3" stroke-dasharray="14 10" opacity="0.9"/>
  ${txt(640,450,"아직 컷이 없습니다",22,"#9a958a",600,"middle")}
  ${txt(640,485,"아래에 한 줄만 적으면 AI가 그려드려요",17,"#b5b0a3",400,"middle")}
  ${card(1120,250,290,430,C.card,C.line,18)}
  ${txt(1145,295,"AI 자동 연출",19,C.txt,800)}
  ${["컷 구성 · 카메라","배경 · 조명","표정 · 감정","말풍선 · 효과음"].map((t,i)=>card(1145,315+i*82,240,66,C.card2,C.line,12)+txt(1170,355+i*82,t,16,C.sub)+`<circle cx="${1360}" cy="${348+i*82}" r="10" fill="${C.acc}" opacity="0.9"/><path d="M${1355},${348+i*82} l4,4 l7,-8" stroke="#fff" stroke-width="2.5" fill="none"/>`).join("")}
  ${uiInput(190,720,940,76,"철수가 복도를 걷는다.")}
  ${uiBtn(1160,720,250,76,"✦ AI 생성","primary",22)}
`),

"feat-main-2": () => S(win(140,60,1320,780) + `
  ${txt(190,160,"AI가 연출까지 완성했어요",30,C.txt,800)}
  ${aiTag(560,138,"생성 완료 · 3.2초",15)}
  ${cutChulsooWalk(190,200,620,470)}
  ${inkBubble(620,300,260,80,"오늘도 평화롭군",22)}
  ${card(860,200,550,330,C.card,C.line,18)}
  ${txt(890,245,"자동 연출 내역",19,C.txt,800)}
  ${["원근 복도 배경 + 로우앵글","걷기 동작 · 뚜벅뚜벅 효과음","말풍선 위치 자동 배치","병맛 톤 유지 (Story Bible 참조)"].map((t,i)=>
    `<circle cx="905" cy="${285+i*56}" r="10" fill="${C.green}"/><path d="M900,${285+i*56} l4,4 l7,-8" stroke="#fff" stroke-width="2.5" fill="none"/>`+txt(930,291+i*56,t,17,C.sub)).join("")}
  ${uiBtn(860,560,170,60,"승인","green",19)}${uiBtn(1050,560,170,60,"수정 요청","dark",19)}${uiBtn(1240,560,170,60,"다시 생성","ghost",19)}
  ${uiInput(190,720,940,76,"다음 장면을 입력하세요...",true)}
  ${uiBtn(1160,720,250,76,"✦ AI 생성","primary",22)}
`),

"feat-main-3": () => S(win(140,60,1320,780) + `
  ${txt(190,160,"AI 감독과 대화하며 만들기",30,C.txt,800)}
  ${chatUser(880,200,420,"철수가 학교를 걷는다.")}
  ${chatAI(190,270,760,["병맛 분위기를 유지해서, 뒤에서 이상한 목소리가","들리는 연출을 추가할까요?"])}
  ${chatUser(1080,430,220,"좋아요 👍")}
  ${chatAI(190,500,800,["마지막 컷은 다음 참여자가 이어가기 쉽도록","정체불명의 인물을 등장시키겠습니다."])}
  ${uiInput(190,720,940,76,"메시지 입력...",true)}
  ${uiBtn(1160,720,250,76,"전송","primary",21)}
  ${card(1030,240,380,160,C.card,C.line,16)}
  ${txt(1055,275,"실시간 미리보기",15,C.sub,700)}
  ${cutChulsooWalk(1055,290,330,95)}
`),

"feat-main-4": () => S(win(140,60,1320,780) + `
  ${txt(190,160,"컷 완성 — AI는 모든 것을 기억합니다",30,C.txt,800)}
  ${cutChulsooWalk(190,200,620,470,true)}
  ${card(860,200,550,470,C.card,C.acc,18,2)}
  ${aiTag(890,228,"Story Bible 자동 업데이트")}
  ${[["👤 등장인물","철수 — 주인공, 안경, 병맛 내성 보유"],
     ["📍 장소","학교 복도 (2층 동관)"],
     ["🔒 비밀 떡밥","그림자의 정체 — 심은 나 + AI만 인지 (위키 비공개)"],
     ["🕐 연표","127화 — 방과후 복도 조우 사건"]].map(([k,v],i)=>
    card(890,270+i*92,490,76,C.card2,C.line,12)+txt(915,302+i*92,k,16,C.acc2,700)+txt(915,330+i*92,v,16,C.sub)).join("")}
  ${txt(890,682,"✓ 1000화가 지나도 철수는 같은 철수",17,C.green,700)}
  ${uiBtn(190,720,300,64,"릴레이에 올리기","primary",20)}${uiBtn(510,720,300,64,"임시 저장","dark",20)}
`),

/* ── 1인 작업 ── */
"feat-solo-1": () => S(win(140,60,1320,780) + `
  ${txt(800,170,"새 작품 시작하기",34,C.txt,800,"middle")}
  ${txt(370,250,"작품 제목",17,C.sub,700)}
  ${uiInput(370,270,860,70,"병맛 고등학교")}
  ${txt(370,400,"장르 (복수 선택)",17,C.sub,700)}
  ${chipRow(370,420,["병맛","개그","판타지","로맨스","SF","공포"],0,17)}
  ${txt(370,530,"연재 방식",17,C.sub,700)}
  ${card(370,550,410,110,C.card,C.acc,16,2.5)}${txt(400,595,"1인 연재",20,C.txt,800)}${txt(400,630,"나 혼자 + AI 어시스턴트",15,C.sub)}
  ${card(820,550,410,110,C.card,C.line,16)}${txt(850,595,"협업/릴레이",20,C.sub,800)}${txt(850,630,"함께 만들기 (나중에 전환 가능)",15,C.dim)}
  ${chatAI(370,680,620,["세계관 초안을 만들어 드릴까요? 학교 배경 추천!"],17)}
  ${uiBtn(1060,700,170,64,"만들기 ✦","primary",20)}
`),

"feat-solo-2": () => S(win(140,60,1320,780) + `
  ${txt(190,160,"1인 연재 스튜디오",30,C.txt,800)}
  ${txt(480,160,"『병맛 고등학교』 12화 작업 중",18,C.sub)}
  ${cutChulsooWalk(190,200,400,300)}
  ${toonPanel(620,200,400,300)}${speedLines(820,350,70,160,18)}${inkBoy(820,370,0.85,{face:"shock",arm:"up"})}${sfx(680,270,"철컹!",30)}
  ${toonPanel(1050,200,360,300)}
  ${txt(1230,350,"3컷 — 비어 있음",19,"#9a958a",600,"middle")}
  ${card(620,540,790,130,C.card,C.acc,16,2)}
  ${aiTag(645,562,"AI 어시스턴트")}
  ${txt(645,620,'3컷 추천 : 그림자 인물 등장 + 대사 "드디어 만났군, 철수."',19,C.txt)}
  ${uiBtn(1180,600,190,50,"적용하기","primary",17)}
  ${card(190,540,400,130,C.card,C.line,16)}
  ${txt(215,580,"연재 현황",16,C.sub,700)}
  ${txt(215,620,"구독자 892 · 조회 12.4k · 좋아요 3.1k",17,C.txt)}
  ${uiInput(190,720,940,68,"다음 컷 내용을 입력하세요...",true,18)}
  ${uiBtn(1160,720,250,68,"✦ AI 생성","primary",20)}
`),

"feat-solo-3": () => S(win(140,60,1320,780) + `
  ${txt(800,158,"『병맛 고등학교』 공개 설정",30,C.txt,800,"middle")}
  ${[["작품 공개","모두가 감상할 수 있어요",true,192],
     ["브랜치(평행세계) 허용","다른 창작자가 내 작품에서 분기 가능",true,296],
     ["팬 참여 이벤트","특정 화를 릴레이로 개방",false,400]].map(([t,d,on,y])=>
    card(360,y,880,90,C.card,C.line,18)+txt(400,y+40,t,20,C.txt,700)+txt(400,y+68,d,14,C.sub)+toggle(1140,y+30,on)).join("")}
  ${card(360,504,880,124,C.card,C.acc,18,2)}
  ${txt(400,548,"세계관 규칙 강도",20,C.txt,700)}
  ${txt(400,578,"설정 변경을 어디까지 허용할지 — 자유 모드는 개연성 검사 없이 카오스 OK",14,C.sub)}
  ${chip(872,532,"엄격",false,15)}${chip(962,532,"유연 (개연성 심사)",true,15)}${chip(1180,532,"자유",false,15)}
  ${card(360,652,880,82,C.card2,C.acc,18)}
  ${aiTag(390,669)}
  ${txt(460,700,"유연 모드 : 개연성이 제시되면 기존 설정 변경(반전·복선 회수)을 허용합니다.",15,C.sub)}
  ${uiBtn(640,758,320,60,"저장하기","primary",20)}
`),

/* ── 협업방 ── */
"feat-collab-1": () => S(win(140,60,1320,780) + `
  <rect x="140" y="114" width="1320" height="726" fill="#000" opacity="0.45"/>
  ${card(480,220,640,470,C.card,C.line,26)}
  ${txt(800,290,"비공개 협업방 만들기",28,C.txt,800,"middle")}
  ${card(560,330,480,130,"#10131d",C.acc,18,2.5)}
  ${txt(800,380,"초대 코드",16,C.sub,400,"middle")}
  ${txt(800,435,"TOON-4F2A",44,C.acc,800,"middle")}
  ${uiBtn(560,490,230,56,"코드 복사","primary",18)}${uiBtn(810,490,230,56,"링크 공유","dark",18)}
  ${txt(560,600,"참여 중인 멤버 (4)",16,C.sub,700)}
  ${avatar(590,640,22,"백",C.acc)}${avatar(645,640,22,"친1",C.acc2)}${avatar(700,640,22,"친2",C.warn)}${avatar(755,640,22,"친3","#e668a7")}
  <circle cx="810" cy="640" r="22" fill="none" stroke="${C.line2}" stroke-width="2" stroke-dasharray="6 5"/>${txt(810,647,"+",22,C.dim,400,"middle")}
`),

"feat-collab-2": () => S(win(140,60,1320,780) + `
  ${txt(190,160,"멤버 및 권한 관리",30,C.txt,800)}
  ${txt(190,195,"『우리들의 병맛 대서사시』 · 비공개 협업방",17,C.sub)}
  ${txt(830,145,"운영 방식",14,C.dim,700)}
  ${chip(830,158,"역할 분담",true,14)}
  ${chip(950,158,"공동 감독 — 모두가 감독＋작화",false,14)}
  ${card(190,230,1220,80,C.card2,C.line,14)}
  ${txt(230,278,"멤버",16,C.sub,700)}${txt(700,278,"역할",16,C.sub,700)}${txt(1000,278,"권한",16,C.sub,700)}
  ${[["백","나 (방장)",C.acc,"방장","컷 작성 · 승인 · 설정 · 멤버 관리","primary"],
     ["친1","친구1",C.acc2,"작성자","컷 작성 · 제출","dark"],
     ["친2","친구2",C.warn,"검수자","컷 승인 · 반려","dark"],
     ["친3","친구3","#e668a7","열람자","감상 · 댓글","ghost"]].map(([ini,name,color,role,perm,btn],i)=>{
    const y=330+i*105;
    return card(190,y,1220,88,C.card,C.line,16)+avatar(250,y+44,26,ini,color)+txt(300,y+52,name,20,C.txt,700)
    +uiBtn(660,y+22,140,44,role,btn,16)+txt(1000,y+52,perm,16,C.sub);
  }).join("")}
  ${uiBtn(1180,742,230,60,"멤버 초대 +","primary",18)}
`),

"feat-collab-3": () => S(win(140,60,1320,780) + `
  ${txt(190,150,"공동 작업 캔버스",28,C.txt,800)}
  ${avatar(450,142,16,"백",C.acc)}${avatar(486,142,16,"친1",C.acc2)}${txt(516,148,"2명 작업 중",15,C.sub)}
  ${cutChulsooWalk(190,185,390,290)}
  <rect x="190" y="185" width="390" height="290" rx="8" fill="none" stroke="${C.acc2}" stroke-width="3"/>
  ${txt(210,215,"✏️ 친구1 편집 중",15,C.acc2,700)}
  ${toonPanel(610,185,390,290)}${inkBoy(800,330,0.8,{glasses:false,face:"talk"})}${inkBubble(700,250,180,66,"야, 철수!",20)}
  <rect x="610" y="185" width="390" height="290" rx="8" fill="none" stroke="${C.acc}" stroke-width="3"/>
  ${txt(630,215,"✏️ 내가 편집 중",15,C.acc,700)}
  ${toonPanel(1030,185,380,290)}${txt(1220,335,"3컷 대기",18,"#9a958a",600,"middle")}
  ${card(190,510,1220,120,"#2b1a20",C.red,18,2.5)}
  ${aiTag(220,532,"AI 설정 검증")}
  ${txt(220,590,"⚠ 2컷의 철수에게 안경이 없습니다 — 개연성을 제시하면 '반전'으로 인정돼요.",18,"#ffb3ad",700)}
  ${uiBtn(1050,545,165,50,"개연성 제시","dark",15)}
  ${uiBtn(1230,545,150,50,"자동 수정","red",16)}
  ${uiInput(190,670,1000,64,"팀 채팅 : 친구1 — 2컷 대사 좀 봐줘 ㅋㅋ",false,17)}
  ${uiBtn(1220,670,190,64,"전송","dark",18)}
`),

/* ── 오픈방 ── */
"feat-open-1": () => S(win(140,60,1320,780) + `
  ${txt(190,155,"『무한 병맛 고교』",28,C.txt,800)}
  ${chip(500,128,"공개 릴레이",true,14)}
  ${txt(190,190,"127화 · 참여자 3,204명 · 🔥 지금 12명 대기 중",17,C.sub)}
  ${cutChulsooWalk(190,230,380,290,true)}
  ${txt(380,550,"지난 참여자 @manhwa_king",15,C.dim,400,"middle")}
  ${card(600,230,380,290,"#171331",C.acc,10,4)}
  <rect x="618" y="248" width="344" height="220" rx="6" fill="${C.paper}" stroke="${C.ink}" stroke-width="3" stroke-dasharray="12 9"/>
  ${txt(790,340,"내 차례!",24,"#8a6cff",800,"middle")}
  ${txt(790,375,"이 컷을 이어 그려주세요",16,"#9a958a",400,"middle")}
  ${txt(790,550,"⏱ 내 턴 · 14:32 남음",16,C.acc,700,"middle")}
  ${card(1010,230,380,290,"#10131d",C.line,10)}
  ${txt(1200,370,"다음 컷",18,C.dim,600,"middle")}
  ${txt(1200,550,"다음 참여자의 자리",15,C.dim,400,"middle")}
  ${card(190,600,1220,60,C.card2,C.line,14)}
  ${txt(220,637,"📋 릴레이 규칙 : 턴당 1~3컷 · 병맛 유지 · 규칙 강도 유연 — 개연성이 있으면 설정 변경 OK (AI 심사)",16,C.sub)}
  ${uiInput(190,690,940,72,"다음 장면 : 갑자기 하늘에서 치킨이 떨어진다",false,19)}
  ${uiBtn(1160,690,250,72,"✦ 컷 그리기","primary",21)}
`),

"feat-open-2": () => S(win(140,60,1320,780) + `
  ${txt(190,160,"1컷만 그려도 괜찮아요",30,C.txt,800)}
  ${txt(190,195,"빈 컷은 AI가 흐름에 맞게 자동으로 채웁니다",18,C.sub)}
  ${toonPanel(190,240,380,290)}${inkBoy(380,390,0.85,{arm:"up",face:"shock"})}${sfx(250,310,"우당탕!",28)}
  ${txt(380,560,"✏️ 내가 그린 컷",16,C.txt,700,"middle")}
  ${toonPanel(600,240,380,290)}${corridor(610,250,360,270)}${inkShadow(790,390,0.7)}${sfx(680,320,"스윽…",24)}
  ${aiTag(618,258,"AI 생성",13)}
  ${txt(790,560,"AI가 채운 2컷",16,"#8a6cff",700,"middle")}
  ${toonPanel(1010,240,380,290)}${inkBoy(1150,400,0.7,{walk:true})}${inkShadow(1300,390,0.55)}${inkBubble(1200,300,190,64,"거기 서!",20,true)}
  ${aiTag(1028,258,"AI 생성",13)}
  ${txt(1200,560,"열린 결말로 마무리 → 다음 사람 몫",16,"#8a6cff",700,"middle")}
  ${card(190,620,1220,90,C.card,C.acc,16,2)}
  ${aiTag(220,642)}
  ${txt(300,676,"이어 그리기 쉽도록 마지막 컷에 새 인물을 등장시켰어요. 다음 참여자가 정체를 정하게 됩니다.",17,C.sub)}
  ${uiBtn(590,740,420,58,"릴레이에 제출하기","primary",19)}
`),

"feat-open-3": () => S(win(140,60,1320,780) + `
  ${txt(190,160,"끝나지 않는 웹툰",30,C.txt,800)}
  ${txt(190,195,"참여가 이어지는 한, 이야기는 계속됩니다",18,C.sub)}
  <line x1="220" y1="470" x2="1380" y2="470" stroke="${C.line2}" stroke-width="5"/>
  ${[["121화","@kim",0],["122화","@lee",1],["123화","@park",2],["124화","AI 자동",3],["125화","@choi",4]].map(([ep,by,i])=>{
    const x=300+i*220, cur=i===4;
    return `<circle cx="${x}" cy="470" r="${cur?13:9}" fill="${cur?C.acc:C.acc2}" ${cur?'filter="url(#glow)"':""}/>`
    + [thumbSchool,thumbChicken,thumbRomance,thumbHorror,thumbSF][i](x-85, i%2===0?260:520, 170, 130)
    + txt(x, i%2===0?425:685, ep+" · "+by, 15, cur?C.acc:C.sub, cur?800:400, "middle");
  }).join("")}
  ${txt(1445,485,"∞",46,C.acc,800)}
  ${card(190,730,1220,80,C.card2,C.line,16)}
  ${txt(220,762,"지금까지 이 작품을 거쳐간 창작자",16,C.sub)}
  ${txt(220,792,"1,847명 · AI 자동 생성 컷 312개 · 평균 턴 소요 9분",18,C.txt,700)}
  ${avatar(1240,770,18,"+",C.dim)}${txt(1270,777,"당신 차례",16,C.acc,700)}
`),

/* ── 브랜치 ── */
"feat-branch-1": () => S(win(140,60,1320,780) + `
  ${txt(190,160,"브랜치 만들기 — 분기점 선택",30,C.txt,800)}
  ${txt(190,195,"『무한 병맛 고교』에서 나만의 평행세계를 시작하세요",18,C.sub)}
  ${[48,49,50,51,52].map((ep,i)=>{
    const x=210+i*245, sel=ep===50;
    return card(x,240,215,270,sel?"#171331":C.card,sel?C.acc:C.line,14,sel?3:1.5)
    + toonPanel(x+22,262,171,140,6)
    + (ep===50? inkBoy(x+107,335,0.42,{face:"shock",arm:"up"}) : inkBoy(x+107,335,0.4,{walk:true}))
    + txt(x+107,445,ep+"화",24,sel?C.acc:C.sub,sel?800:600,"middle")
    + (sel? txt(x+107,480,"이 화에서 분기",15,C.acc,700,"middle") : "");
  }).join("")}
  <path d="M800,510 L800,570 M800,570 Q680,620 620,670 M800,570 Q920,620 980,670" stroke="${C.acc2}" stroke-width="4" fill="none" stroke-dasharray="10 8"/>
  <circle cx="620" cy="680" r="10" fill="${C.acc2}" filter="url(#glow)"/><circle cx="980" cy="680" r="10" fill="${C.warn}" filter="url(#glow)"/>
  ${txt(800,730,"50화의 설정 그대로 — 이후는 완전히 새로운 이야기",19,C.sub,400,"middle")}
  ${uiBtn(620,760,360,62,"🌿 여기서 브랜치 생성","primary",20)}
`),

"feat-branch-2": () => S(win(140,60,1320,780) + `
  ${txt(190,160,"Story Bible 자동 복사",30,C.txt,800)}
  ${txt(190,195,"설정을 다시 쓸 필요 없이 바로 시작",18,C.sub)}
  ${card(190,240,540,450,C.card,C.line,18)}
  ${txt(220,285,"원작 Story Bible",20,C.txt,800)}${chip(420,262,"~50화 기준",false,13)}
  ${[["👤 인물 12","철수(안경) · 영희 · 그림자 인물 外"],
     ["📍 장소 7","학교 · 옥상 · 지하실 · 치킨집 外"],
     ["🎒 아이템 4","수상한 일기장 · 황금 치킨 外"],
     ["🧩 떡밥 (회수 2)","비밀 떡밥은 심은 사람에게만 승계"]].map(([k,v],i)=>
    card(220,310+i*88,480,72,C.card2,C.line,12)+txt(245,340+i*88,k,16,C.acc2,700)+txt(245,366+i*88,v,15,C.sub)).join("")}
  <g filter="url(#glow)"><path d="M760,440 L830,440 M810,420 L840,443 L810,466" stroke="${C.acc}" stroke-width="5" fill="none" stroke-linecap="round"/></g>
  ${aiTag(755,380,"자동 복사",14)}
  ${card(870,240,540,450,"#171331",C.acc,18,2.5)}
  ${txt(900,285,"내 브랜치 Bible",20,C.acc,800)}${chip(1100,262,"51화~ 독립",true,13)}
  ${[["👤 인물 12 + α","원작 그대로 + 새 인물 추가 가능",C.sub],
     ["📍 장소 7","복사됨 — 자유롭게 확장",C.sub],
     ["✦ 새 전개","51화부터 로맨스 노선 전환!",C.acc2],
     ["✦ 독립 연표","원작과 별개로 성장",C.acc2]].map(([k,v,vc],i)=>
    card(900,310+i*88,480,72,C.card2,C.line,12)+txt(925,340+i*88,k,16,C.acc,700)+txt(925,366+i*88,v,15,vc)).join("")}
  ${uiBtn(640,730,320,60,"브랜치 시작하기","primary",20)}
`),

"feat-branch-3": () => S(win(140,60,1320,780) + `
  ${txt(190,155,"세계선 지도",28,C.txt,800)}
  ${txt(400,155,"『무한 병맛 고교』 — 브랜치 12개",17,C.sub)}
  ${chipRow(1000,128,["인기순","최신순","깊이순"],0,14)}
  <line x1="260" y1="450" x2="1340" y2="450" stroke="${C.acc}" stroke-width="7" stroke-linecap="round"/>
  ${txt(260,415,"원작 · 1화",15,C.sub)}${txt(1270,415,"127화 →",15,C.sub)}
  <circle cx="760" cy="450" r="12" fill="${C.acc}" filter="url(#glow)"/>${txt(760,420,"50화",15,C.acc,700,"middle")}
  <circle cx="540" cy="450" r="9" fill="${C.acc}"/>${txt(540,420,"40화",14,C.sub,400,"middle")}
  <path d="M760,450 Q900,330 1030,300" stroke="${C.acc2}" stroke-width="4" fill="none"/>
  ${card(1030,240,300,110,C.card,C.acc2,14,2)}${txt(1055,280,"Branch A · 로맨스선",18,C.acc2,700)}${txt(1055,310,"@fan_02 · 23화 진행 · ❤ 8.2k",14,C.sub)}
  <path d="M1180,350 Q1250,380 1290,420 " stroke="${C.acc2}" stroke-width="2.5" fill="none" stroke-dasharray="7 6"/>
  ${card(1180,420,220,80,C.card,C.line,12)}${txt(1200,452,"A-1 · 새드엔딩선",15,C.sub,700)}${txt(1200,478,"5화 · 진행 중",13,C.dim)}
  <path d="M760,450 Q900,570 1030,600" stroke="${C.warn}" stroke-width="4" fill="none"/>
  ${card(1030,550,300,110,C.card,C.warn,14,2)}${txt(1055,590,"Branch B · 공포선",18,C.warn,700)}${txt(1055,620,"@horror_j · 17화 · ❤ 5.9k",14,C.sub)}
  <path d="M540,450 Q430,590 360,630" stroke="#5ca9ff" stroke-width="4" fill="none"/>
  ${card(210,610,300,110,C.card,"#5ca9ff",14,2)}${txt(235,650,"Branch C · SF선",18,"#5ca9ff",700)}${txt(235,680,"@sf_mania · 31화 · ❤ 12.1k",14,C.sub)}
  ${card(210,240,300,110,C.card2,C.line,14)}${txt(235,278,"읽는 방법",15,C.sub,700)}${txt(235,306,"세계선을 골라 이어 읽으세요",15,C.txt)}
  ${uiBtn(235,318,150,0,"",1)}
`),

/* ── 이벤트 ── */
"feat-event-1": () => S(win(140,60,1320,780) + topnav(140,114,1320,"이벤트") + `
  ${txt(190,230,"🎪 진행 중인 이벤트",28,C.txt,800)}
  ${[["하루 한 컷 이어그리기","매일 1컷 · 전국민 릴레이","참여 1,024명 · D-3",C.acc,190,270,true],
     ["심야 공포 릴레이","밤 12시에만 열리는 방","참여 312명 · 매일 밤",C.warn,830,270,false],
     ["랜덤 장르 챌린지","AI가 매 턴 장르를 뒤섞는 카오스","참여 87명 · 상시",C.acc2,190,560,false],
     ["기업 콜라보 — 치킨왕","브랜드 캐릭터 릴레이","🏆 상금 500만원 · D-14","#e668a7",830,560,false]].map(([t,d,meta,c,x,y,hot],idx)=>
    card(x,y,580,260,hot?"#171331":C.card,hot?C.acc:C.line,20,hot?3:1.5)
    + (hot?chip(x+430,y+24,"HOT 🔥",true,13):"")
    + txt(x+34,y+65,t,25,C.txt,800)+txt(x+34,y+105,d,17,C.sub)
    + [thumbDaily,thumbHorror,thumbRandom,thumbChicken][idx](x+34,y+130,150,100)
    + txt(x+215,y+165,meta,16,c,700)
    + uiBtn(x+215,y+185,150,46,"참여하기","primary",15)
  ).join("")}
`),

"feat-event-2": () => S(win(140,60,1320,780) + `
  ${txt(190,160,"『하루 한 컷 이어그리기』 342일차",28,C.txt,800)}
  ${chip(720,133,"이벤트 릴레이",true,14)}
  ${card(190,200,1220,110,C.card,C.acc,18,2)}
  ${aiTag(220,222,"AI 브리핑")}
  ${txt(220,282,"어제까지 줄거리 : 주인공이 치킨 왕국에 도착했습니다. 규칙 : 하루 1컷 · 병맛 유지 · 기존 캐릭터 준수",18,C.sub)}
  ${toonPanel(190,350,380,280)}${inkBoy(310,490,0.75,{walk:true})}${inkChicken(480,510,0.55,true)}${sfx(240,420,"치킨왕국…!",24)}
  ${txt(380,660,"어제의 컷 @chicken_lover",15,C.dim,400,"middle")}
  ${card(600,350,380,280,"#171331",C.acc,10,4)}
  <rect x="618" y="368" width="344" height="210" rx="6" fill="${C.paper}" stroke="${C.ink}" stroke-width="3" stroke-dasharray="12 9"/>
  ${txt(790,455,"오늘 내 컷",22,"#8a6cff",800,"middle")}
  ${txt(790,490,"⏱ 오늘 23:59까지",15,"#9a958a",400,"middle")}
  ${card(1010,350,380,280,"#10131d",C.line,10)}
  ${txt(1200,480,"내일 누군가의 컷",17,C.dim,600,"middle")}
  ${uiInput(190,690,940,72,"주인공이 치킨 왕좌에 앉으려는 순간...",false,19)}
  ${uiBtn(1160,690,250,72,"✦ 참여하기","primary",21)}
`),

/* ── 메인화면 ── */
"main-screen-1": () => S(win(140,60,1320,780) + topnav(140,114,1320,"홈") + sideRail(140,173,667,0) + `
  ${txt(390,230,"🔥 실시간 릴레이 진행 중",24,C.txt,800)}
  ${[["무한 병맛 고교","127화 · 12명 대기",0],["치킨 왕국 연대기","342화 · 릴레이 중",1],["심야 공포관","66화 · 밤에만 오픈",2]].map(([t,m,i])=>{
    const x=390+i*350;
    return card(x,255,320,250,C.card,C.line,16)
    + [thumbSchool,thumbChicken,thumbHorror][i](x+18,273,284,140)
    + txt(x+24,450,t,19,C.txt,700)+txt(x+24,480,m,14,C.sub)
    + chip(x+220,437,"LIVE",true,12);
  }).join("")}
  ${txt(390,570,"🌿 이번 주 인기 브랜치",24,C.txt,800)}
  ${[["병맛고교 로맨스선","❤ 8.2k",0],["병맛고교 공포선","❤ 5.9k",1],["40화 SF 세계선","❤ 12.1k",2]].map(([t,m,i])=>{
    const x=390+i*350;
    return card(x,595,320,180,C.card,C.line,16)
    + `<path d="M${x+30},${640} L${x+120},${640} M${x+75},${640} Q${x+140},${670} ${x+180},${700}" stroke="${C.acc}" stroke-width="4" fill="none"/><circle cx="${x+185}" cy="${702}" r="7" fill="${C.acc2}"/>`
    + txt(x+24,735,t,18,C.txt,700)+txt(x+230,735,m,15,C.warn,700);
  }).join("")}
`),

"main-screen-2": () => S(win(140,60,1320,780) + topnav(140,114,1320,"탐색") + `
  ${uiInput(240,210,880,70,"🔍 병맛",false,21)}
  ${uiBtn(1150,210,210,70,"검색","primary",20)}
  ${chipRow(240,320,["전체","병맛","공포","로맨스","판타지","SF","일상"],1,16)}
  ${[["무한 병맛 고교","127화 · 참여 3,204명 · 브랜치 12개 · ❤ 45k",390],
     ["치킨 왕국 연대기","342화 · 참여 8,911명 · 브랜치 31개 · ❤ 120k",510],
     ["병맛 사무실 (신규 🔥)","3화 · 참여 45명 · 지금 시작하기 좋아요",630]].map(([t,m,y])=>listRow(240,y,1120,100,t,m)).join("")}
  ${txt(800,790,"3,847개의 살아있는 세계관이 참여자를 기다립니다",17,C.dim,400,"middle")}
`),

"main-screen-3": () => S(win(140,60,1320,780) + `
  ${txt(190,155,"『무한 병맛 고교』 127화",26,C.txt,800)}
  ${chip(560,130,"🌿 브랜치 12",false,14)}${chip(700,130,"❤ 45k",false,14)}
  ${cutChulsooWalk(190,190,640,480,true)}
  ${inkBubble(430,290,240,76,"지하실의 비밀이…",21)}
  ${card(880,190,530,480,"#171331",C.acc,18,2.5)}
  ${aiTag(910,215,"AI 위키 — 읽다가 궁금하면 바로")}
  ${[["👤 등장인물 12","철수 · 영희 · 그림자 인물…"],
     ["🧩 회수된 떡밥 2","미회수 떡밥은 비공개 — 스포일러 방지"],
     ["📖 지금까지 줄거리","3줄 요약 · 10줄 요약 · 전체"],
     ["🕐 연표","1화 ~ 127화 사건 정리"]].map(([k,v],i)=>
    card(910,260+i*92,470,76,C.card2,C.line,12)+txt(935,292+i*92,k,17,C.acc2,700)+txt(935,320+i*92,v,15,C.sub)).join("")}
  ${txt(1145,655,"신규 독자도 위키만 읽으면 127화부터 OK",16,C.green,700,"middle")}
  ${uiBtn(190,710,200,60,"◀ 126화","dark",18)}
  ${uiBtn(410,710,420,60,"이 화에서 브랜치 만들기 🌿","primary",18)}
  ${uiBtn(850,710,200,60,"128화 ▶","dark",18)}
`),

/* ── 개인계정 ── */
"account-1": () => S(win(140,60,1320,780) + topnav(140,114,1320,"") + `
  ${avatar(320,290,60,"백",C.acc)}
  ${txt(430,270,"백현조",34,C.txt,800)}
  ${chip(560,244,"크리에이터 Lv.7",true,14)}
  ${txt(430,315,"팔로워 1,204 · 팔로잉 87",18,C.sub)}
  ${uiBtn(1180,250,200,54,"프로필 편집","dark",17)}
  ${[["내 작품","7","연재 중 2"],["참여한 릴레이","42","이번 주 5회"],["만든 브랜치","5","❤ 총 21k"],["기여 컷","318","AI 협업 64%"]].map(([k,n,m],i)=>{
    const x=240+i*300;
    return card(x,400,270,180,C.card,C.line,18)+txt(x+28,445,k,17,C.sub,700)+txt(x+28,515,n,44,C.txt,800)+txt(x+28,550,m,14,C.dim);
  }).join("")}
  ${txt(240,650,"📌 대표 작품",20,C.txt,800)}
  ${card(240,670,880,120,C.card,C.line,16)}
  ${thumbSchool(262,688,150,84)}
  ${txt(440,720,"병맛 고등학교",21,C.txt,700)}${txt(440,752,"구독자 892 · 12화 연재 중 · 브랜치 허용",15,C.sub)}
  ${uiBtn(1150,700,180,56,"작품 보기","primary",17)}
`),

"account-2": () => S(win(140,60,1320,780) + `
  ${txt(190,160,"기여도 대시보드",30,C.txt,800)}
  ${chipRow(500,133,["무한 병맛 고교","병맛 고등학교","전체"],0,14)}
  ${[["참여량","컷 89개 작성",0.8,C.acc],
     ["조회수 기여","내 컷 구간 12.4k뷰",0.65,C.acc2],
     ["독자 반응","좋아요 · 명장면 저장",0.72,C.warn],
     ["AI 스토리 평가","떡밥 회수 · 전개 기여",0.88,"#e668a7"]].map(([k,d,r,c],i)=>{
    const y=220+i*90;
    return txt(240,y+22,k,19,C.txt,700)+txt(240,y+48,d,14,C.sub)+bar(560,y+8,600,26,r,c)+txt(1190,y+28,Math.round(r*100)+"점",18,c,800);
  }).join("")}
  ${card(240,600,700,180,"#171331",C.acc,20,2.5)}
  ${txt(275,650,"이번 달 예상 보상",18,C.sub)}
  ${txt(275,715,"₩ 128,400",44,C.txt,800)}
  ${txt(530,715,"+ 2,450 토큰",26,C.acc,800)}
  ${txt(275,755,"『무한 병맛 고교』 수익의 4.2% (기여도 자동 산정)",15,C.dim)}
  ${card(980,600,430,180,C.card,C.line,20)}
  ${txt(1015,650,"정산 계좌",17,C.sub,700)}
  ${txt(1015,695,"카카오뱅크 ****1234",19,C.txt)}
  ${uiBtn(1015,720,180,46,"정산 내역","dark",15)}
`),

"account-3": () => S(win(140,60,1320,780) + `
  ${txt(190,160,"AI 토큰 지갑",30,C.txt,800)}
  ${card(190,210,520,300,"#171331",C.acc,24,2.5)}
  ${txt(230,270,"보유 토큰",18,C.sub)}
  ${txt(230,350,"🪙 2,450",52,C.txt,800)}
  ${txt(230,400,"이번 달 +720 획득 · -180 사용",16,C.acc2)}
  ${uiBtn(230,430,180,52,"충전하기","primary",17)}${uiBtn(430,430,180,52,"내역 보기","dark",17)}
  ${card(760,210,650,140,C.card,C.line,18)}
  ${txt(790,250,"＋ 이렇게 모아요",18,C.acc2,800)}
  ${txt(790,290,"창작 참여 +50 · 좋아요 받기 +5 · 조회 보너스 +120",17,C.sub)}
  ${txt(790,322,"이벤트 우승 +300 · 광고 시청 +10",17,C.sub)}
  ${card(760,370,650,140,C.card,C.line,18)}
  ${txt(790,410,"－ 이렇게 써요",18,C.warn,800)}
  ${txt(790,450,"AI 컷 생성 -10 · 고화질 -30 · 특수 효과 -20",17,C.sub)}
  ${txt(790,482,"고속 생성 -15 · 프리미엄 그림체 -50",17,C.sub)}
  ${card(190,560,1220,220,C.card2,C.line,20)}
  ${txt(230,610,"창작의 선순환",20,C.txt,800)}
  ${[["✏️ 창작",C.acc],["🪙 보상",C.warn],["✦ AI 기능",C.acc2],["📈 성장","#e668a7"]].map(([t,c],i)=>{
    const x=280+i*300;
    return card(x,640,200,90,C.card,c,16,2)+txt(x+100,695,t,20,C.txt,700,"middle")
    + (i<3?`<path d="M${x+210},685 L${x+290},685 M${x+272},670 L${x+295},685 L${x+272},700" stroke="${C.dim}" stroke-width="3.5" fill="none"/>`:"");
  }).join("")}
  <path d="M1180,740 Q800,830 320,740" stroke="${C.dim}" stroke-width="3" fill="none" stroke-dasharray="9 8"/>
`),

/* ── 수익구조 ── */
"revenue-1": () => S(`
  ${txt(800,110,"수익 구조",40,C.txt,800,"middle")}
  ${txt(800,155,"4개의 수익원이 플랫폼 수익 풀로 모입니다",19,C.sub,400,"middle")}
  ${[["📺 광고","무료 이용자 · 컷 사이 배너",C.acc2,180],
     ["⭐ 구독","월 9,900원 · 광고 제거 + 토큰",C.acc,540],
     ["💝 후원","좋아하는 창작자에게 직접",C.warn,900],
     ["📜 IP 라이선스","단행본 · 굿즈 · 2차 창작",  "#e668a7",1260]].map(([t,d,c,x])=>
    card(x,210,320,150,C.card,c,20,2)+txt(x+160,275,t,25,C.txt,800,"middle")+txt(x+160,320,d,15,C.sub,400,"middle")
    +`<path d="M${x+160},370 Q${x+160},430 ${800+(x+160-800)*0.25},480" stroke="${c}" stroke-width="3.5" fill="none" stroke-dasharray="9 8"/>`).join("")}
  ${card(560,490,480,140,"#171331",C.acc,24,3)}
  ${txt(800,550,"플랫폼 수익 풀",30,C.txt,800,"middle")}
  ${txt(800,595,"월 정산 · 투명한 분배 리포트 공개",16,C.sub,400,"middle")}
  <path d="M800,640 L800,700 M780,682 L800,706 L820,682" stroke="${C.acc2}" stroke-width="4" fill="none"/>
  ${card(480,720,300,120,C.card,C.line,18)}${txt(630,770,"창작자 분배",21,C.txt,800,"middle")}${txt(630,805,"기여도 기반 자동 정산",15,C.acc2,400,"middle")}
  ${card(820,720,300,120,C.card,C.line,18)}${txt(970,770,"플랫폼 운영",21,C.txt,800,"middle")}${txt(970,805,"AI 인프라 · 서비스 개발",15,C.sub,400,"middle")}
`),

"revenue-2": () => S(win(140,60,1320,780) + `
  ${txt(190,160,"기여도 기반 자동 분배",30,C.txt,800)}
  ${txt(190,195,"협업 작품의 수익은 AI가 산정한 기여도로 나눠집니다",18,C.sub)}
  ${card(190,240,560,200,"#171331",C.acc,20,2.5)}
  ${txt(225,290,"『무한 병맛 고교』 4월 수익",19,C.sub)}
  ${txt(225,360,"₩ 3,200,000",46,C.txt,800)}
  ${txt(225,405,"광고 1.8M · 구독 0.9M · 후원 0.5M",15,C.dim)}
  ${card(190,480,560,290,C.card,C.line,20)}
  ${txt(225,530,"AI 기여도 산정 기준",18,C.txt,800)}
  ${["참여량 (컷 수 · 회차)","조회수 · 체류 기여","좋아요 · 명장면 저장","스토리 기여 (떡밥 · 전개) — AI 평가","독자 투표"].map((t,i)=>
    txt(255,575+i*38,"· "+t,16,C.sub)).join("")}
  ${card(820,240,590,530,C.card,C.line,20)}
  ${txt(855,290,"분배 결과 (상위 3명)",19,C.txt,800)}
  ${[["백현조 (나)","컷 89 · 스토리 기여 1위",42,C.acc],
     ["@manhwa_king","컷 71 · 조회 기여 1위",35,C.acc2],
     ["@fan_02","컷 44 · 명장면 다수",23,C.warn]].map(([n,d,p,c],i)=>{
    const y=330+i*130;
    return avatar(890,y+35,26,n[0]==="@"?n[1].toUpperCase():"백",c)+txt(940,y+28,n,19,C.txt,700)+txt(940,y+56,d,14,C.sub)
    + bar(890,y+75,380,20,p/100,c)+txt(1330,y+92,p+"%",22,c,800,"end")
    + txt(1330,y+40,"₩"+(3200000*p/100/10000).toFixed(0)+"만",17,C.txt,700,"end");
  }).join("")}
  ${txt(855,745,"나머지 1,844명에게도 기여분만큼 자동 지급 (현금 또는 토큰)",15,C.dim)}
`),

"revenue-3": () => S(`
  ${txt(800,110,"토큰 이코노미 — 창작의 선순환",38,C.txt,800,"middle")}
  <circle cx="800" cy="500" r="250" fill="none" stroke="${C.line2}" stroke-width="3" stroke-dasharray="14 12"/>
  ${card(650,180,300,110,C.card,C.acc,20,2.5)}
  ${txt(800,228,"✏️ 창작 참여",24,C.txt,800,"middle")}${txt(800,262,"컷 그리기 · 릴레이 · 브랜치",14,C.sub,400,"middle")}
  ${card(1090,445,320,110,C.card,C.acc2,20,2.5)}
  ${txt(1250,493,"🪙 보상 획득",24,C.txt,800,"middle")}${txt(1250,527,"기여도 정산 · 현금/토큰",14,C.sub,400,"middle")}
  ${card(650,710,300,110,C.card,C.warn,20,2.5)}
  ${txt(800,758,"✦ AI 기능 사용",24,C.txt,800,"middle")}${txt(800,792,"고화질 · 특수효과 · 고속 생성",14,C.sub,400,"middle")}
  ${card(190,445,320,110,C.card,"#e668a7",20,2.5)}
  ${txt(350,493,"📈 콘텐츠 성장",24,C.txt,800,"middle")}${txt(350,527,"더 좋은 작품 · 더 많은 독자",14,C.sub,400,"middle")}
  ${[[985,275,1170,420,C.acc2],[1200,570,1000,715,C.warn],[615,715,420,570,"#e668a7"],[400,420,610,275,C.acc]].map(([x1,y1,x2,y2,c])=>{
    const a=Math.atan2(y2-y1,x2-x1);
    return `<path d="M${x1},${y1} Q${(x1+x2)/2+(y2-y1)*0.18},${(y1+y2)/2-(x2-x1)*0.18} ${x2},${y2}" stroke="${c}" stroke-width="4.5" fill="none"/>
    <path d="M${x2},${y2} L${x2-18*Math.cos(a-0.45)},${y2-18*Math.sin(a-0.45)} L${x2-18*Math.cos(a+0.45)},${y2-18*Math.sin(a+0.45)} Z" fill="${c}"/>`;
  }).join("")}
  ${txt(800,485,"🪙",40,C.txt,400,"middle")}
  ${txt(800,540,"창작 → 보상 → 재투자 → 성장",19,C.sub,400,"middle")}
`),
};

/* 목업(index.html)에서 사용 */
window.TOON_SCENES = SCENES;
