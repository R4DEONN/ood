(()=>{"use strict";var t,e;!function(t){t.CIRCLE="circle",t.RECTANGLE="rectangle",t.LINE="line",t.TRIANGLE="triangle",t.TEXT="text"}(t||(t={}));class i{#t;#e;constructor(t,e){this.#t=t,this.#e=e}draw(t){this.#e.draw(t,this.#t)}move(t,e){this.#e.move(t,e)}getType(){return this.#e.getType()}getColor(){return this.#t}setColor(t){this.#t=t}getParameterString(){return this.#e.getParameterString()}setDrawingStrategy(t){this.#e=t}}class s{#i;#s;#r;constructor(t,e,i){this.#i=t,this.#s=e,this.#r=i}draw(t,e){t.setColor(e),t.drawRectangle(this.#i,this.#s,this.#r)}getType(){return t.RECTANGLE}move(t,e){this.#i.x+=t,this.#i.y+=e}getParameterString(){return`${this.#i.x} ${this.#i.y} ${this.#s} ${this.#r}`}}class r{#h;#n;#a;constructor(t,e,i){this.#h=t,this.#n=e,this.#a=i}draw(t,e){t.setColor(e),t.drawPolygon([this.#h,this.#n,this.#a])}getType(){return t.TRIANGLE}move(t,e){this.#h.x+=t,this.#h.y+=e,this.#n.x+=t,this.#n.y+=e,this.#a.x+=t,this.#a.y+=e}getParameterString(){return`${this.#h.x} ${this.#h.y} ${this.#n.x} ${this.#n.y} ${this.#a.x} ${this.#a.y}`}}class h{#o;#c;constructor(t,e){this.#o=t,this.#c=e}draw(t,e){t.setColor(e),t.drawCircle(this.#o,this.#c,this.#c)}getType(){return t.CIRCLE}move(t,e){this.#o.x+=t,this.#o.y+=e}getParameterString(){return`${this.#o.x} ${this.#o.y} ${this.#c}`}}class n{#h;#n;constructor(t,e){this.#h=t,this.#n=e}draw(t,e){t.setColor(e),t.drawLine(this.#h,this.#n)}getType(){return t.LINE}move(t,e){this.#h.x+=t,this.#h.y+=e,this.#n.x+=t,this.#n.y+=e}getParameterString(){return`${this.#h.x} ${this.#h.y} ${this.#n.x} ${this.#n.y}`}}class a{#l;#i;#d;constructor(t,e,i){this.#i=t,this.#l=i,this.#d=e}draw(t,e){t.setColor(e),t.drawText(this.#i,this.#d,this.#l)}getType(){return t.TEXT}move(t,e){this.#i.x+=t,this.#i.y+=e}getParameterString(){return`${this.#i.x} ${this.#i.y} ${this.#d} ${this.#l}`}}!function(t){t.ADD_SHAPE="AddShape",t.DRAW_SHAPE="DrawShape",t.DRAW="DrawPicture",t.MOVE_PICTURE="MovePicture",t.MOVE_SHAPE="MoveShape",t.DELETE_SHAPE="DeleteShape",t.LIST="List",t.CHANGE_SHAPE_COLOR="ChangeColor",t.CHANGE_SHAPE="ChangeShape"}(e||(e={}));const o=document.createElement("canvas");o.width=window.innerWidth,o.height=window.innerHeight-50;const c=document.getElementById("content"),l=document.getElementById("input");c.appendChild(o);const d=new class{#p;#g;constructor(t){this.#p=t,this.#g=t.getContext("2d")}drawCircle(t,e){this.#g.beginPath(),this.#g.arc(t.x,t.y,e,0,2*Math.PI),this.#g.closePath(),this.#g.fill()}drawRectangle(t,e,i){this.#g.fillRect(t.x,t.y,e,i)}drawPolygon(t){this.#g.beginPath(),this.moveTo(t[0]),t.forEach(((t,e)=>{e>0&&this.lineTo(t)})),this.#g.closePath(),this.#g.fill()}drawLine(t,e){this.#g.beginPath(),this.moveTo(t),this.lineTo(e),this.#g.closePath(),this.#g.stroke()}drawText(t,e,i){this.#g.font=`${e}px serif`,this.#g.fillText(i,t.x,t.y)}lineTo(t){this.#g.lineTo(t.x,t.y)}moveTo(t){this.#g.moveTo(t.x,t.y)}setColor(t){this.#g.fillStyle=t,this.#g.strokeStyle=t}}(o),p=new class{#u=new Map;#p;constructor(t){this.#p=t}draw(){this.#u.forEach((t=>t.draw(this.#p)))}enumerateShapes(t){this.#u.forEach(t)}addShape(t,e){this.#u.set(t,e)}drawShape(t){this.#u.get(t)?.draw(this.#p)}getShape(t){return this.#u.get(t)}deleteShape(t){this.#u.delete(t)}setCanvas(t){this.#p=t}}(d),g=new class{#P;constructor(t){this.#P=t}applyCommand(t){const i=t.split(" ");switch(i[0]){case e.ADD_SHAPE:{const t=this._createShape(i[3],i.slice(2));return this.#P.addShape(i[1],t),!0}case e.DRAW_SHAPE:return this.#P.drawShape(i[1]),!0;case e.DRAW:return this.#P.draw(),!0;case e.MOVE_PICTURE:return this.#P.enumerateShapes((t=>t.move(+i[1],+i[2]))),!0;case e.MOVE_SHAPE:{const t=this.#P.getShape(i[1]);return t?.move(+i[2],+i[3]),!0}case e.DELETE_SHAPE:return this.#P.deleteShape(i[1]),!0;case e.LIST:{let t=1;return this.#P.enumerateShapes(((e,i)=>{console.log(`${t} ${e.getType()} ${i} ${e.getColor()} ${e.getParameterString()}`),t++})),!0}case e.CHANGE_SHAPE_COLOR:{const t=this.#P.getShape(i[1]);return t?.setColor(i[2]),!0}case e.CHANGE_SHAPE:{const t=this._createStrategy(i[2],i.slice(3)),e=this.#P.getShape(i[1]);return e?.setDrawingStrategy(t),!0}default:return!1}}_createShape(t,e){const s=e.slice(2),r=this._createStrategy(t,s);return new i(e[0],r)}_createStrategy(e,i){switch(e){case t.RECTANGLE:return new s({x:+i[0],y:+i[1]},+i[2],+i[3]);case t.TRIANGLE:return new r({x:+i[0],y:+i[1]},{x:+i[2],y:+i[3]},{x:+i[4],y:+i[5]});case t.CIRCLE:return new h({x:+i[0],y:+i[1]},+i[2]);case t.LINE:return new n({x:+i[0],y:+i[1]},{x:+i[2],y:+i[3]});case t.TEXT:return new a({x:+i[0],y:+i[1]},+i[2],i.slice(3).join(" "));default:throw new Error("Wrong shape type")}}}(p);l.addEventListener("change",(()=>{g.applyCommand(l.value),l.value=""})),["AddShape sh1 #123456 rectangle 100 200 30 40","AddShape tr1 #00fefe triangle 0 0 100 0 0 100","AddShape circ #febb38 circle 100 200 25","AddShape ln1 #fe0000 line 10 20 35 88","AddShape txt1 #ffaa88 text 100.3 100.2 12.8 Hello world","DrawPicture","List","MoveShape circ 0 -50","ChangeShape sh1 circle 100 200 15","MovePicture 300 0","DeleteShape txt1","ChangeColor sh1 #febb38","DrawPicture"].forEach((t=>{g.applyCommand(t)}))})();