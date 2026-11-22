import{mkdirSync,readdirSync,readFileSync,writeFileSync}from"node:fs";
import{join}from"node:path";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
function R(p,q){
const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536),n=p.length;
let s=0,c=0,pc=0,t=0,i=0,l=0;
const F=()=>o.subarray(0,l);
for(;;){
if(t==1e6)return[F(),10];
if(pc<0||pc>=n)return[F(),9];
const y=p[pc];
let m,u,v;
if(y<8){m=y==1?1:y==2?4:0;u="00011223"[y]|0;v="01102233"[y]|0}
else if(y>15&&y<35&&y!=31){m=0;u=y==23||y==27?1:2;v=1}
else if(y>47&&y<53){m=y==52?0:2;u="01100"[y-48]|0;v=0}
else if(y==64||y==65){m=0;u=y-63;v=65-y}
else if(y>79&&y<84){m=0;u="1101"[y-80]|0;v=y==82?1:0}
else return[F(),5];
if(pc+m>=n)return[F(),9];
t++;
if(s<u)return[F(),2];
if(s-u+v>256)return[F(),3];
pc+=1+m;
switch(y){
case 0:return[F(),0];
case 1:D[s++]=(p[pc-1]<<24)>>24;break;
case 2:D[s++]=p[pc-4]|p[pc-3]<<8|p[pc-2]<<16|p[pc-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const a=D[s-1];D[s-1]=D[s-2];D[s-2]=a;break}
case 6:D[s]=D[s-2];s++;break;
case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 48:case 49:case 50:{const r=(p[pc-2]|p[pc-1]<<8)<<16>>16;let k=1;if(y>48){const z=D[--s];k=y==49?z==0:z!=0}if(k)pc+=r;break}
case 51:if(c==64)return[F(),7];C[c++]=pc;pc=p[pc-2]|p[pc-1]<<8;break;
case 52:if(!c)return[F(),8];pc=C[--c];break;
case 64:{const a=D[s-1];if(a<0||a>255)return[F(),6];D[s-1]=M[a];break}
case 65:{const a=D[s-1];if(a<0||a>255)return[F(),6];s-=2;M[a]=D[s];break}
case 80:{const w=String(D[--s]);if(l+w.length>65536)return[F(),11];for(let j=0;j<w.length;j++)o[l++]=w.charCodeAt(j);break}
case 81:if(l+1>65536)return[F(),11];o[l++]=D[--s]&255;break;
case 82:D[s++]=i<q.length?q[i++]:-1;break;
case 83:return[F(),D[--s]&255];
default:{
const b=D[--s],a=D[s-1];let r;
if(y==16)r=a+b|0;else if(y==17)r=a-b|0;else if(y==18)r=Math.imul(a,b);
else if(y==19){if(!b)return[F(),4];r=(a/b)|0}
else if(y==20){if(!b)return[F(),4];r=a%b|0}
else if(y==21){if(!b)return[F(),4];r=Math.floor((a>>>0)/(b>>>0))|0}
else if(y==22){if(!b)return[F(),4];r=(a>>>0)%(b>>>0)|0}
else if(y==24)r=a&b;else if(y==25)r=a|b;else if(y==26)r=a^b;
else if(y==28)r=a<<(b&31);else if(y==29)r=a>>(b&31);else if(y==30)r=a>>>(b&31)|0;
else if(y==32)r=a==b?1:0;else if(y==33)r=a<b?1:0;else r=(a>>>0)<(b>>>0)?1:0;
D[s-1]=r;break}
}
}
}
for(const d of readdirSync(I).sort()){
const r=R(readFileSync(join(I,d,"program.bin")),readFileSync(join(I,d,"input.bin")));
mkdirSync(join(O,d),{recursive:true});
writeFileSync(join(O,d,"stdout.bin"),r[0]);
writeFileSync(join(O,d,"exit.txt"),r[1]+"\n");
}
