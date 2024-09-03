document.write('<!doctype html><meta charset=UTF-8><title>Exilium: The fall of Dominus</title><style>:root{--theme-1:#010615;--theme-2:#292930;--theme-3:#08121c;--theme-4:#18beba;--theme-5:#28485f;--theme-6:#464b4e;--theme-7:#c1c6c9;--theme-8:#efefef;--spacing-1:4px;--spacing-2:8px;--spacing-3:12px;--spacing-4:20px;--spacing-5:32px;--border-radius:5px;--font-family:"Courier New",Roboto,Helvetica,Arial,sans-serif-black;--font-size:14px;--font-size-lg:16px}*{box-sizing:border-box}#c2d{background:var(--theme-1);image-rendering:pixelated}body,html{margin:0;background:var(--theme-1);display:flex;justify-content:center;align-items:center;height:100%;font-family:var(--font-family);font-size:var(--font-size)}button{font-family:var(--font-family);font-size:var(--font-size)}.controls{padding:var(--spacing-4);height:600px;width:300px;border-top:1px solid var(--theme-7);border-right:1px solid var(--theme-7);background:var(--theme-1);background:linear-gradient(180deg,var(--theme-1) 0,var(--theme-2) 50%,var(--theme-1) 100%);color:var(--theme-4);overflow:hidden;overflow-y:auto}.controls button,.controls h3{margin:0 0 var(--spacing-2)}.controls .grid{display:grid;grid-template-columns:50% 50%;gap:10px}.controls .grid .grid-item{height:120px}.controls button:last-of-type{margin:0}.controls section{margin-bottom:var(--spacing-5)}.controls section:last-of-type{margin-bottom:0}.m-0{margin:0}.d-none{display:none}.progress-bar{width:100%}.button{background:var(--theme-1);color:var(--theme-4);padding:var(--spacing-2) var(--spacing-2);text-align:center;width:100%;font-size:var(--font-size-lg);border:2px solid var(--theme-7);border-left-color:var(--theme-6);border-bottom-color:var(--theme-6);border-radius:var(--border-radius)}.button:active{border:2px solid var(--theme-6);border-left-color:var(--theme-7);border-bottom-color:var(--theme-7)}.button:disabled{color:var(--theme-6);border-color:var(--theme-6)}.button.deploy{width:100%;height:110px;cursor:pointer;font-size:12px;padding:var(--spacing-1);color:var(--theme-8);display:flex;align-items:flex-end;justify-content:flex-start;text-align:left}.button.deploy span{text-shadow:-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000;font-weight:700}.button:disabled.deploy{cursor:auto;color:var(--theme-7);filter:grayscale(100%)}.damage-meter{height:600px;width:14px;background:var(--theme-6);position:relative;overflow:hidden}.damage{position:absolute;top:0;left:0;background:var(--theme-2);height:0;width:100%;transition:height .5s;z-index:1}.current-health{height:100%;background:linear-gradient(#83e067,#f8d46f,#e42841);position:absolute;bottom:0;left:0;width:100%;border:1px solid var(--theme-1)}.form-row label{display:block}.tab{background:var(--theme-1);color:var(--theme-4);padding:var(--spacing-2) var(--spacing-2);text-align:center;border:0;border-top:1px solid var(--theme-7);border-radius:var(--border-radius)}.tab.active{border-top:0;border-bottom:1px solid var(--theme-7)}.tab-panel{display:none}.tab-panel.active{display:block}#deploy-infantry{background:url(troopers.png) 0 0/100% no-repeat}#deploy-tank{background:url(negotiator.png) 0 0/100% no-repeat}#deploy-aircraft{background:url(raptor.png) 0 0/100% no-repeat}#deploy-ion-canon{background:url(ion-canon.png) 0 0/100% no-repeat}</style><canvas height=600 id=c2d width=1000></canvas><section class="d-none damage-meter"><div class=damage></div><div class=current-health></div></section><section class="d-none controls"><section><h3 class=m-0>Deployments</h3><div class=grid><div class=grid-item><button class="button deploy" id=deploy-infantry disabled=disabled><span>Vanguard Troopers</span></button><progress class=progress-bar id=infantry-progress max=100 value=0></progress></div><div class="d-none grid-item" id=tank-option><button class="button deploy" id=deploy-tank disabled=disabled><span>Negotiator</span></button><progress class=progress-bar id=tank-progress max=100 value=0></progress></div><div class="d-none grid-item" id=aircraft-option><button class="button deploy" id=deploy-aircraft disabled=disabled><span>Raptor</span></button><progress class=progress-bar id=aircraft-progress max=100 value=0></progress></div><div class="d-none grid-item" id=ion-canon-option><button class="button deploy" id=deploy-ion-canon><span>Ion Canon</span></button><progress class=progress-bar id=ion-canon-progress max=100 value=0></progress></div></div></section><section class=d-none id=research-centre><h3 class=m-0>Research</h3><progress class=progress-bar id=research-progress max=100 value=0></progress><div class=d-none id=research-points></div></section><section class=d-none id=tech-centre><h3 class=m-0>Tech Centre<small>(Points:<span class=points>0</span>)</small></h3><button class="tab active" data-type=infantry>Infantry</button><button class=tab data-type=tank>Tank</button><button class="d-none tab" id=aircraft-tab data-type=aircraft>Aircraft</button><div class="tab-panel active" id=infantry-tech><div class=form-row><label>Attack Power</label><input class=tech-range data-stat=attack data-type=infantry max=10 min=0 type=range value=2></div><div class=form-row><label>Attack Speed</label><input class=tech-range data-stat=attackSpeed data-type=infantry max=10 min=0 type=range value=2></div><div class=form-row><label>Defence</label><input class=tech-range data-stat=health data-type=infantry max=10 min=0 type=range value=2></div><div class=form-row><label>Move Speed</label><input class=tech-range data-stat=moveSpeed data-type=infantry max=10 min=0 type=range value=2></div><div class=form-row><label>Range</label><input class=tech-range data-stat=range data-type=infantry max=10 min=0 type=range value=2></div></div><div class=tab-panel id=tank-tech><div class=form-row><label>Attack Power</label><input class=tech-range data-stat=attack data-type=tank max=10 min=0 type=range value=2></div><div class=form-row><label>Attack Speed</label><input class=tech-range data-stat=attackSpeed data-type=tank max=10 min=0 type=range value=2></div><div class=form-row><label>Defence</label><input class=tech-range data-stat=health data-type=tank max=10 min=0 type=range value=2></div><div class=form-row><label>Move Speed</label><input class=tech-range data-stat=moveSpeed data-type=tank max=10 min=0 type=range value=2></div><div class=form-row><label>Range</label><input class=tech-range data-stat=range data-type=tank max=10 min=0 type=range value=2></div></div><div class=tab-panel id=aircraft-tech><div class=form-row><label>Attack Power</label><input class=tech-range data-stat=attack data-type=aircraft max=10 min=0 type=range value=2></div><div class=form-row><label>Attack Speed</label><input class=tech-range data-stat=attackSpeed data-type=aircraft max=10 min=0 type=range value=2></div><div class=form-row><label>Defence</label><input class=tech-range data-stat=health data-type=aircraft max=10 min=0 type=range value=2></div><div class=form-row><label>Move Speed</label><input class=tech-range data-stat=moveSpeed data-type=aircraft max=10 min=0 type=range value=2></div><div class=form-row><label>Range</label><input class=tech-range data-stat=range data-type=aircraft max=10 min=0 type=range value=2></div></div></section></section>');function g(a,b,c,e){let d=h.C;d.font=`${b}px "Courier New", Roboto, Helvetica, Arial, sans-serif-black`;d.textAlign="center";d.strokeStyle="black";d.lineWidth=4;d.strokeText(a,c,e);d.fillStyle="white";d.fillText(a,c,e)}
class k{constructor(){this.C=c2d.getContext("2d");this.P=new DOMPoint(0,0);c2d.addEventListener("mousemove",a=>{let b=a.clientX-c2d.getBoundingClientRect().left;a=a.clientY-c2d.getBoundingClientRect().top;this.P=new DOMPoint(b,a)})}get g(){return this.C.canvas.width}get h(){return this.C.canvas.height}}let h=new k;function l(a){var b=n,c=[];b.g.ea?.();b.g=a;b.g.V?.(...c)}class q{constructor(...a){this.g=r;this.g.V?.(...a)}}let n;var t,u=t||(t={});u[u.A=0]="A";u[u.B=1]="B";u[u.X=2]="X";u[u.Y=3]="Y";
u[u.LeftBumper=4]="LeftBumper";u[u.RightBumper=5]="RightBumper";u[u.LeftTrigger=6]="LeftTrigger";u[u.RightTrigger=7]="RightTrigger";u[u.Select=8]="Select";u[u.Start=9]="Start";u[u.L3=10]="L3";u[u.R3=11]="R3";u[u.DpadUp=12]="DpadUp";u[u.DpadDown=13]="DpadDown";u[u.DpadLeft=14]="DpadLeft";u[u.DpadRight=15]="DpadRight";
class aa{constructor(){this.O=this.L=this.T=this.U=!1;this.g=new Map;this.C={U:this.U,T:this.T,L:this.L,O:this.O};document.addEventListener("keydown",a=>{this.g.set(a.code,!0)});document.addEventListener("keyup",a=>{this.g.set(a.code,!1)});c2d.addEventListener("click",()=>this.L=!0);this.h=new DOMPoint}}let v=new aa;function w(a){return(a=document.querySelector(a))?a:null}function x(a){a=document.querySelectorAll(a);return 0<a.length?a:null}let ba="#3F3C7D #4C4F9B #7A79C0 #8F8EC4 #A4A1C8 #B9B6D1 #D0C9E3 #C8B9E2 #B0A1E1 #9B8CD0 #7A79C0 #4C4F9B #3F3C7D".split(" ");
function z(a){return 2===a?{fill:"#18beba",border:"#08121c"}:{fill:"#481c7f",border:"#170221"}}let A={attack:11,m:.2,l:.35,j:100,i:16},B={attack:24,m:.12,l:.27,j:150,i:28},C={attack:30,m:.1,l:.4,j:100,i:35};function D(a){return 2===a.I?new DOMPoint(h.P.x,h.h-25):E(a)}function E(a){let b=Math.floor(Math.random()*(h.g-20-20+1))+20;return 2===a.I?new DOMPoint(b,h.h-25):new DOMPoint(b,141)}
class F{constructor(a,b,c){this.type=a;this.I=b;this.position=D(this);this.v=c;this.aa=!1;this.h=c.j}g(){this.position=D(this)}$(a,b,c){let e=z(this.I);var d=b??this.position.x,f=c??this.position.y;let m=this.v.j/this.h;var p=42*m;a.beginPath();"infantry"===this.type?(a.arc(d,f,this.v.i,0,2*Math.PI),a.strokeStyle=e.border,a.stroke(),p=this.v.i*m,a.beginPath(),a.arc(d,f,p,0,2*Math.PI),a.fillStyle=e.fill,a.fill()):"tank"===this.type?(a.rect(b?b-15:this.position.x-15,c?c-21:this.position.y-21,30,42),
a.strokeStyle=e.border,a.stroke(),a.beginPath(),a.rect(b?b-15:this.position.x-15,c?c-21+(42-p):this.position.y-21+(42-p),30,p),a.fillStyle=e.fill,a.fill()):"aircraft"===this.type&&(a.beginPath(),d=b??this.position.x,c=c??this.position.y,f=1===this.I?-1:1,a.moveTo(d,c-40*f/2),a.lineTo(d+14,c+40*f/2),a.lineTo(d-14,c+40*f/2),a.closePath(),a.strokeStyle=e.border,a.stroke(),a.beginPath(),a.moveTo(d,c-40*f/2+(40-p)*f),a.lineTo(d+14,c+40*f/2),a.lineTo(d-14,c+40*f/2),a.closePath(),a.fillStyle=e.fill,a.fill());
a.closePath()}}class J{constructor(a,b){this.currentTime=0;this.da=1E3;this.active=!0;this.type=a;this.speed=b}N(){this.currentTime=0;this.start()}start(){this.active=!0}D(a){this.currentTime+=this.speed*a}K(){}}class ca extends J{constructor(){super(0,.065)}start(){super.start();let a=w("#deploy-infantry");a&&(a.disabled=!0)}K(){this.active=!1;let a=w("#deploy-infantry");a&&(a.disabled=!1)}D(a){super.D(a);if(a=w("#infantry-progress"))a.value=this.currentTime/10}}
class K{constructor(a,b){this.title=a;this.type=b}J(){}}class da extends J{constructor(){super(1,.035)}start(){super.start();let a=w("#deploy-tank");a&&(a.disabled=!0)}K(){this.active=!1;let a=w("#deploy-tank");a&&(a.disabled=!1)}D(a){super.D(a);if(a=w("#tank-progress"))a.value=this.currentTime/10}}class ea extends K{constructor(){super("Build Tank Factory",3)}J(a){w("#tank-option")?.classList.remove("d-none");a.s.push(new da)}}
class fa extends K{constructor(){super("Increase Research Speed",1)}J(a){a.s=a.s.map(b=>{3===b.type&&(b.speed+=.022);return b})}}class L extends K{constructor(){super("Increase Infantry Recruitment Speed",0)}J(a){a.s=a.s.map(b=>{0===b.type&&(b.speed+=.022);return b})}}function M(a){let b=w(".points");b&&(b.textContent=a.g.toString())}
function ha(a){let b=x(".tech-range");b&&b.forEach(c=>{c.oninput=e=>{e=e.target;let {type:d,stat:f}=e?.dataset;if(f&&d){var m=parseInt(e.value,10),p=ia(a,f,d),y=m-p;0<y&&y>a.g?e.value=p.toString():("infantry"===d?"attack"===f?a.G.attack=m:"attackSpeed"===f?a.G.m=m:"health"===f?a.G.j=m:"moveSpeed"===f?a.G.l=m:"range"===f&&(a.G.i=m):"tank"===d?"attack"===f?a.H.attack=m:"attackSpeed"===f?a.H.m=m:"health"===f?a.H.j=m:"moveSpeed"===f?a.H.l=m:"range"===f&&(a.H.i=m):"aircraft"===d&&("attack"===f?a.F.attack=
m:"attackSpeed"===f?a.F.m=m:"health"===f?a.F.j=m:"moveSpeed"===f?a.F.l=m:"range"===f&&(a.F.i=m)),a.g-=y,M(a))}}})}function ja(){let a=x(".tab");a?.forEach(b=>{b.onclick=c=>{c=c.target;let {type:e}=c.dataset;a?.forEach(d=>d.classList.remove("active"));c.classList.add("active");c=w(`#${e}-tech`);x(".tab-panel")?.forEach(d=>d.classList.remove("active"));c?.classList.add("active")}})}
function ia(a,b,c){if("infantry"===c){if("attack"!==b){if("attackSpeed"===b)return a.G.m;if("health"===b)return a.G.j;if("moveSpeed"===b)return a.G.l;if("range"===b)return a.G.i}}else if("tank"===c){if("attack"===b)return a.H.attack;if("attackSpeed"===b)return a.H.m;if("health"===b)return a.H.j;if("moveSpeed"===b)return a.H.l;if("range"===b)return a.H.i}else if("aircraft"===c){if("attack"===b)return a.F.attack;if("attackSpeed"===b)return a.F.m;if("health"===b)return a.F.j;if("moveSpeed"===b)return a.F.l;
if("range"===b)return a.F.i}return a.G.attack}class ka{constructor(){this.g=4;this.G={attack:2,m:2,l:2,j:2,i:2};this.H={attack:2,m:2,l:2,j:2,i:2};this.F={attack:2,m:2,l:2,j:2,i:2};M(this);ha(this);ja();w("#tech-centre")?.classList.remove("d-none")}}class la extends K{constructor(){super("Build Tech Centre",0)}J(a){a.o=new ka}}class N extends K{constructor(){super("Increase Tank Build Speed",2)}J(a){a.s=a.s.map(b=>{1===b.type&&(b.speed+=.02);return b})}}
class O extends K{constructor(a){super(a?`Add ${a} skill points`:"Add tech skill point",5);this.g=1;a&&(this.g=a)}J(a){a.o&&(a=a.o,a.g+=this.g,M(a))}}class ma extends J{constructor(){super(7,.02)}start(){super.start()}K(a){let b=new F("infantry",2,P(a,"infantry"));b.position=E(b);a.units.push(b);super.N()}D(a){super.D(a)}}class na extends K{constructor(){super("Auto Deploy Infantry",6)}J(a){a.s.push(new ma)}}
class Q extends K{constructor(){super("Increase Infantry Auto Deploy Speed",7)}J(a){a.s=a.s.map(b=>{7===b.type&&(b.speed+=.015);return b})}}class oa extends J{constructor(){super(2,.025)}start(){super.start();let a=w("#deploy-aircraft");a&&(a.disabled=!0)}K(){this.active=!1;let a=w("#deploy-aircraft");a&&(a.disabled=!1)}D(a){super.D(a);if(a=w("#aircraft-progress"))a.value=this.currentTime/10}}
class pa extends K{constructor(){super("Build Air Base",8)}J(a){w("#aircraft-option")?.classList.remove("d-none");w("#aircraft-tab")?.classList.remove("d-none");a.s.push(new oa);a.o&&(a=a.o,a.g+=2,M(a))}}class qa extends K{constructor(){super("Increase Aircraft Build Speed",9)}J(a){a.s=a.s.map(b=>{2===b.type&&(b.speed+=.015);return b})}}
let R=w("#research-points"),ra=new Map([[1,[new L]],[2,[new na,new fa]],[3,[new ea]],[5,[new L]],[6,[new la,new N]],[8,[new O]],[9,[new Q,new N]],[11,[new O]],[12,[new pa]],[13,[new O,new Q]],[14,[new qa]],[15,[new O(2)]]]),sa=(a,b)=>{let c=ra.get(b);c?c.forEach(e=>{a.S.some(d=>d.type===e.type)||a.S.push(e)}):10<=b&&a.S.push(new O)},ta=a=>{R?.replaceChildren();sa(a,a.u.level);a.S.forEach(b=>{let c=document.createElement("button");c.textContent=b.title;c.classList.add("button");c.onclick=()=>{a.S=
a.S.filter(e=>e.type!==b.type);b.J(a);a.s.find(e=>3===e.type)?.N()};R?.appendChild(c)})};class ua extends J{constructor(){super(3,.035)}start(){super.start();R?.classList.add("d-none")}K(a){this.active=!1;a.u.level++;var b=a.u.level,c=a.s;5===b&&(c.push(new va),S(c));8===b&&(S(c),wa(c));13===b&&c.push(new xa);R?.classList.remove("d-none");ta(a)}D(a){super.D(a);if(a=w("#research-progress"))a.value=this.currentTime/10}}
class ya extends J{constructor(){super(4,.03)}start(){super.start()}K(a){let b=new F("infantry",1,{attack:10+.3*a.u.level,m:.15+.01*a.u.level,j:100+1*a.u.level,l:.3+.01*a.u.level,i:15+.4*a.u.level});a.units.push(b);super.N()}D(a){super.D(a)}}function za(a,b){a.M-=b;if(b=w(".damage"))b.style.height=`${a.Z-a.M}%`}class Aa{constructor(){this.M=this.Z=100;this.level=0}}
class va extends J{constructor(){super(5,.02)}start(){super.start()}K(a){let b=new F("tank",1,{attack:20+.6*a.u.level,m:.1+.003*a.u.level,j:140+1*a.u.level,l:.2+.008*a.u.level,i:28+.6*a.u.level});a.units.push(b);super.N()}D(a){super.D(a)}}class xa extends J{constructor(){super(6,.02)}start(){super.start()}K(a){let b=new F("aircraft",1,{attack:26+.6*a.u.level,m:.1+.003*a.u.level,j:100+1*a.u.level,l:.38+.008*a.u.level,i:35+.6*a.u.level});a.units.push(b);super.N()}D(a){super.D(a)}}
function S(a){if(a=a.find(b=>4===b.type))a.speed+=.03}function wa(a){if(a=a.find(b=>5===b.type))a.speed+=.025}
function P(a,b){let c;switch(b){case "infantry":a.o?c={attack:A.attack+2*a.o?.G.attack,m:A.m+.05*a.o?.G.m,j:A.j+4*a.o?.G.j,l:A.l+.1*a.o?.G.l,i:A.i+1.5*a.o?.G.i}:c={...A};break;case "tank":a.o?c={attack:B.attack+2*a.o?.H.attack,m:B.m+.05*a.o?.H.m,j:B.j+4*a.o?.H.j,l:B.l+.1*a.o?.H.l,i:B.i+1.5*a.o?.H.i}:c={...B};break;case "aircraft":a.o?c={attack:C.attack+2*a.o?.F.attack,m:C.m+.05*a.o?.F.m,j:C.j+4*a.o?.F.j,l:C.l+.1*a.o?.F.l,i:C.i+1.5*a.o?.F.i}:c={...C};break;default:c={...A}}return c}
function Ba(a){w("#deploy-infantry")?.addEventListener("click",()=>{a.mode=2;a.g=new F("infantry",2,P(a,"infantry"))});w("#deploy-tank")?.addEventListener("click",()=>{a.mode=2;a.g=new F("tank",2,P(a,"tank"))});w("#deploy-aircraft")?.addEventListener("click",()=>{a.mode=2;a.g=new F("aircraft",2,P(a,"aircraft"))});c2d.addEventListener("click",()=>{if(2===a.mode)switch(a.g?.g(),a.g&&a.units.push(a.g),a.g?.type){case "infantry":var b=a.s.find(c=>0==c.type);b&&b.N();break;case "tank":(b=a.s.find(c=>1==
c.type))&&b.N();break;case "aircraft":(b=a.s.find(c=>2==c.type))&&b.N()}a.g=null;a.mode=1})}function Ca(a){a.s.push(new ca);setTimeout(()=>{a.s.push(new ua);a.s.push(new ya);w("#research-centre")?.classList.remove("d-none")},2E4)}function Da(a,b){a.s.filter(c=>c.active).forEach(c=>{c.D(b);c.currentTime>=c.da&&c.K(a)})}class T{constructor(){this.mode=1;this.units=[];this.h=Array.from({length:13},()=>({Z:100,M:100}));this.s=[];this.u=new Aa;this.S=[];this.o=this.g=null;Ba(this);Ca(this)}}
class Ea{V(){w(".damage-meter")?.classList.add("d-none");w(".controls")?.classList.add("d-none");c2d.addEventListener("click",()=>{window.location.reload()})}W(){let a=h.C.canvas.width/2;g("You defeated",60,a,60);g("the Dominus Network",60,a,120);g("Victory is yours! The Dominus Network crumbles, and the dawn ",24,a,240);g("of a new era begins \u2014 The Vanguard has reclaimed freedom for all!",24,a,284);g("Back to Menu",60,a,400);v.L&&window.location.reload()}}let Fa=new Ea;
function V(a,b,c){a.globalAlpha=c;a.beginPath();a.arc(b,50,20,.5*Math.PI,1.5*Math.PI);a.arc(b+30,30,30,Math.PI,1.85*Math.PI);a.arc(b+70,30,40,1.37*Math.PI,1.91*Math.PI);a.arc(b+100,50,30,1.5*Math.PI,.5*Math.PI);a.closePath();a.fillStyle="#FFFFFF";a.fill();a.strokeStyle="#D3D3D3";a.stroke();a.globalAlpha=1}function Ga(a,b){b.forEach(c=>{a.fillStyle="#34363c";a.fillRect(c.x,c.y,c.width,c.height);a.fillStyle="#d6d6bb";c.ca.forEach(e=>{a.fillRect(e.x,e.y,e.size,e.size)})})}
class Ha{V(){w(".damage-meter")?.classList.add("d-none");w(".controls")?.classList.add("d-none");c2d.addEventListener("click",()=>{window.location.reload()})}W(){let a=h.C.canvas.width/2;g("You were defeated",80,a,90);g("Hope fades as the Dominus Network tightens its grip.",24,a,160);g("The Vanguard's resistance has been crushed, but the ",24,a,190);g("fight for freedom is far from over.",24,a,220);g("Back to Menu",60,a,400);v.L&&window.location.reload()}}let Ia=new Ha;
function Ja(a,b,c){a.g.forEach((e,d)=>{e.forEach(f=>{let m=1E3/d.v.m;d.R=(d.R||0)+b;f.R=(f.R||0)+b;d.R>=m&&(f.v.j-=d.v.attack,d.R=0,0>=f.v.j&&W(a,f,c),0>=d.v.j&&W(a,d,c))})})}function W(a,b,c){a.g.has(b)&&(a.g.get(b).forEach(e=>{a.g.get(e).delete(b);0===a.g.get(e).size&&a.g.delete(e)}),a.g.delete(b));c.units=c.units.filter(e=>e!==b)}function Ka(a,b,c){a.g.has(b)||a.g.set(b,new Set);a.g.get(b).add(c);a.g.has(c)||a.g.set(c,new Set);a.g.get(c).add(b)}class La{constructor(){this.g=new Map}}
function Ma(a){let b=h.g/a.h.h.length-5;a.h.h.forEach((c,e)=>{let d=b*(e+1)-22;a.h.units.filter(f=>2===f.I).forEach(f=>{108>=Math.sqrt((f.position.x-d)**2+(f.position.y-40)**2)&&!f.aa&&(c.M-=f.v.attack,f.aa=!0)});Na(a,d,c,ba[e])})}
function Oa(a,b){a.h.units=a.h.units?.filter(c=>{let e=a.h.units.find(d=>{d="infantry"===c.type?d.I!==c.I&&Math.hypot(c.position.x-d.position.x,c.position.y-d.position.y)<c.v.i+d.v.i:"tank"===c.type?d.I!==c.I&&Math.hypot(c.position.x-15-d.position.x,c.position.y-21-d.position.y)<c.v.i+d.v.i:"aircraft"===c.type?d.I!==c.I&&Math.hypot(c.position.x-14-d.position.x,c.position.y-20-d.position.y)<c.v.i+d.v.i:void 0;return d});if(e)Ka(a.C,c,e);else{c.R=void 0;if(2===c.I){if(141>=c.position.y)return!1;c.position.y-=
c.v.l}else if(1===c.I){if(c.position.y>=h.h-50)return za(a.h.u,c.v.attack),!1;c.position.y+=c.v.l}W(a.C,c,a.h)}c.$(a.g);return!0});Ja(a.C,b,a.h)}function Pa(a){a.h.h.every(b=>20>=b.M)&&l(Fa)}function Na(a,b,c,e){c=c.M/c.Z*100;a.g.save();a.g.beginPath();a.g.rect(b,40+(100-c),40,c);a.g.clip();a.g.shadowColor=e;a.g.shadowBlur=4;a.g.shadowOffsetX=0;a.g.shadowOffsetY=0;a.g.drawImage(a.ba,b,40,40,100);a.g.shadowColor="transparent";a.g.shadowBlur=0;a.g.restore()}
class Qa{constructor(){this.ba=new Image;this.g=h.C;this.ba.src="pylon.png";this.h=new T;this.P=[];this.C=new La}V(){this.h=new T;let a=0;for(;a<h.g;){let G=Math.floor(81*Math.random())+20;var b=Math.floor(-39*Math.random())+120,c=a,e=b,d=G,f=100+b,m=a,p=b,y=G;let U=[];for(let H=m+10;H<m+y-10;H+=10)for(let I=p+10;I<p+b-10;I+=10).75<Math.random()&&U.push({x:H,y:I,size:3});this.P.push({x:c,y:e,width:d,height:f,ca:U});a+=G}w(".damage-meter")?.classList.remove("d-none");w(".controls")?.classList.remove("d-none")}W(a){var b=
this.g,c=b.createLinearGradient(0,0,0,h.h);c.addColorStop(0,"#1f313f");c.addColorStop(.05,"#385a64");c.addColorStop(.1,"#618384");c.addColorStop(.15,"#cfd3c2");c.addColorStop(.23,"#6b8a8d");c.addColorStop(.24,"#2a4240");c.addColorStop(1,"#131515");b.fillStyle=c;b.fillRect(0,0,h.g,h.h);b=this.g;c=h.g/2;b.globalAlpha=.6;b.beginPath();b.arc(c,36,26,0,2*Math.PI);b.fillStyle="#d8d1b7";b.fill();b.closePath();b.globalAlpha=1;b=this.g;V(b,50,.14);V(b,750,.24);Ga(this.g,this.P);b=this.g;c=b.createLinearGradient(0,
0,0,h.h);c.addColorStop(0,"#1f313f");c.addColorStop(.05,"#385a64");c.addColorStop(.1,"#618384");c.addColorStop(.15,"#cfd3c2");c.addColorStop(.23,"#6b8a8d");c.addColorStop(.24,"#2a4240");c.addColorStop(1,"#131515");b.fillStyle=c;b.fillRect(0,141,h.g,h.h);b=this.g;c=h.h-50;var e=h.g,d=(e-50)/2;let f=(e+50)/2,m=(e-800)/2;e=(e+800)/2;b.globalAlpha=.2;b.fillStyle="#333";b.strokeStyle="#222";b.beginPath();b.moveTo(d,141);b.lineTo(f,141);b.lineTo(e,c);b.lineTo(m,c);b.closePath();b.fill();b.stroke();b.globalAlpha=
1;Ma(this);b=this.g;b.beginPath();b.moveTo(20,141);b.lineTo(h.g-20,141);b.lineWidth=3;b.strokeStyle="#111";b.stroke();b.closePath();b=this.g;c=h.h-50;b.beginPath();b.moveTo(20,c);b.lineTo(h.g-20,c);b.lineWidth=3;b.strokeStyle="#ccc";b.stroke();b.closePath();Oa(this,a);2==this.h.mode&&(b=h.P.x,c=h.h-25,40>b&&(b=40),b>h.g-40&&(b=h.g-40),d=z(2),this.g.beginPath(),this.g.fillStyle=d.fill,this.g.strokeStyle=d.border,this.h?.g?.$(this.g,b,c),this.g.fill(),this.g.stroke(),this.g.closePath());Da(this.h,a);
v.O&&l(r);Pa(this);0>=this.h.u.M&&l(Ia)}}let X=new Qa;
class Ra{g(){l(X)}V(){c2d.addEventListener("click",this.g)}W(){let a=h.C.canvas.width/2;g("Exilium:",60,a,60);g("The fall of Dominus",45,a,120);g("In a world ruled by fear, the Dominus Network\u2019s 13 towering",20,a,200);g("pylons cast a menacing shadow, controlling every aspect of life.",20,a,232);g("The people live in terror, their freedom crushed by the AI's relentless grip.",20,a,264);g("But the Vanguard, a brave band of rebels, rises to challenge this tyranny.",20,a,294);g("Their mission: destroy the pylons, dismantle the AI, and restore",
20,a,324);g("liberty to a world on the edge of despair.",20,a,354);g("Start Game",60,a,500);v.L&&l(X)}ea(){c2d.removeEventListener("click",this.g)}}let r=new Ra;n=new q(...[]);let Y=0,Z=1E3/60;
(function Sa(a){let c=a-Y;if(c>=Z){Y=a-c%Z;v.C.U=v.U;v.C.T=v.T;v.C.L=v.L;v.C.O=v.O;a=navigator.getGamepads()[0];let e=v.g.get("KeyA")||v.g.get("ArrowLeft")||a?.buttons[14].pressed?-1:0,d=v.g.get("KeyD")||v.g.get("ArrowRight")||a?.buttons[15].pressed?1:0,f=v.g.get("KeyW")||v.g.get("ArrowUp")||a?.buttons[12].pressed?-1:0,m=v.g.get("KeyS")||v.g.get("ArrowDown")||a?.buttons[13].pressed?1:0;v.h.x=e+d||a?.axes[0]||0;v.h.y=f+m||a?.axes[1]||0;.1>Math.hypot(v.h.x,v.h.y)&&(v.h.x=0,v.h.y=0);v.U=0>v.h.y;v.T=
0<v.h.y;v.L=!!(v.g.get("Enter")||a?.buttons[0].pressed||a?.buttons[9].pressed);v.O=!(!v.g.get("Escape")&&!a?.buttons[8].pressed);h.C.clearRect(0,0,h.g,h.h);n.g.W(c)}requestAnimationFrame(Sa)})(0);