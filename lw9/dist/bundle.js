(()=>{"use strict";class t{x;y;constructor(t=0,e=0){this.x=t,this.y=e}}class e{width;height;constructor(t=0,e=0){this.width=t,this.height=e}}class i{_value;constructor(t){this._value=void 0!==t?t:{}}ensureUnique(){this._value instanceof i&&(this._value={...this._value})}getValue(){return this._value}write(t){this.ensureUnique(),t(this._value)}}class s{static SIZE=8;pixels;constructor(t=" "){this.pixels=Array.from({length:s.SIZE},(()=>Array(s.SIZE).fill(t)))}setPixel(t,e){t.x>=0&&t.x<s.SIZE&&t.y>=0&&t.y<s.SIZE&&(this.pixels[t.y][t.x]=e)}getPixel(t){return t.x>=0&&t.x<s.SIZE&&t.y>=0&&t.y<s.SIZE?this.pixels[t.y][t.x]:" "}}class n{_size=new e;_tiles;constructor(t,e){if(t.width<0||t.height<0)throw new Error("Size cannot be less than 0");if(e.length>1)throw new Error("Color must be a char");const n=Math.ceil(t.width/s.SIZE),h=Math.ceil(t.height/s.SIZE);this._size=t,this._tiles=Array.from({length:h},(()=>Array.from({length:n},(()=>new i(new s(e))))))}getSize(){return this._size}getPixel(t){if(t.x<0||t.y<0||t.x>=this._size.width||t.y>=this._size.height)return" ";const e=Math.floor(t.x/s.SIZE),i=Math.floor(t.y/s.SIZE),n={x:t.x%s.SIZE,y:t.y%s.SIZE};return this._tiles[i][e].getValue().getPixel(n)}setPixel(t,e){if(t.x<0||t.y<0||t.x>=this._size.width||t.y>=this._size.height)return;const i=Math.floor(t.x/s.SIZE),n=Math.floor(t.y/s.SIZE),h={x:t.x%s.SIZE,y:t.y%s.SIZE};this._tiles[n][i].write((t=>t.setPixel(h,e)))}}function h(t){for(let e=0;e<t.getSize().height;++e){let i="";for(let s=0;s<t.getSize().width;++s)i+=t.getPixel({x:s,y:e});console.log(i)}}function r(t,e,i,s){const n=Math.abs(i.x-e.x);Math.abs(i.y-e.y)>n?function(t,e,i,s){const n=Math.abs(i.x-e.x),h=Math.abs(i.y-e.y);e.y>i.y&&([e,i]=[i,e]);const r=l(i.x-e.x),o=h+1,x=n+1;let a=x/2;for(let n={...e};n.y<=i.y;n.y++)t.setPixel({x:n.x,y:n.y},s),a+=x,a>=o&&(n.x+=r,a-=o)}(t,e,i,s):function(t,e,i,s){const n=Math.abs(i.x-e.x),h=Math.abs(i.y-e.y);e.x>i.x&&([e,i]=[i,e]);const r=l(i.y-e.y),o=n+1,x=h+1;let a=x/2;for(let n={...e};n.x<=i.x;n.x++)t.setPixel({x:n.x,y:n.y},s),a+=x,a>=o&&(n.y+=r,a-=o)}(t,e,i,s)}function l(t){return t>0?1:t<0?-1:0}!function(){h(function(){const t=" CCCC             \nCC  CC   ##    ## \nCC      ####  ####\nCC  CC   ##    ## \n CCCC             \n".split("\n");let e=0,i=t.length;for(const i of t)e=Math.max(e,i.length);const s=new n({width:e,height:i}," ");for(let e=0;e<i;e++){const i=t[e];for(let t=0;t<i.length;t++)s.setPixel({x:t,y:e},i[t])}return s}());const i=new n(new e(30,20),".");r(i,new t(3,2),new t(26,5),"#"),r(i,new t(26,5),new t(21,18),"#"),r(i,new t(21,18),new t(3,2),"#"),h(i)}()})();