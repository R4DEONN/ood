(()=>{"use strict";class t{_input;_closeButton;_onInputFn;_onCloseFn;constructor(t,e){this._input=t,this._closeButton=e;const s=t=>{this._onInputFn?.(t.target.value),this._input.value=""},r=()=>{this._closeButton.removeEventListener("click",r),this._input.removeEventListener("change",s),this._onCloseFn?.()};this._closeButton.addEventListener("click",r),this._input.addEventListener("change",s)}registerOnClose(t){this._onCloseFn=t}registerOnInput(t){this._onInputFn=t}}class e{_shapes=[];addShape(t){this._shapes.push(t)}getShape(t){return this._shapes[t]}getShapeCount(){return this._shapes.length}}var s;!function(t){t.Green="green",t.Blue="blue",t.Red="red",t.Yellow="yellow",t.White="white",t.Black="black",t.Pink="pink"}(s||(s={}));class r{_color;constructor(t){this._color=function(t){return{[s.Green]:"#008000",[s.Blue]:"#0000FF",[s.Red]:"#FF0000",[s.Yellow]:"#FFFF00",[s.White]:"#FFFFFF",[s.Black]:"#000000",[s.Pink]:"#FFC0CB"}[t]||""}(t)}draw(t){throw new Error("Not implemented.")}getColor(){return this._color}}class i extends r{_leftTop;_width;_height;constructor(t,e,s,r){super(t),this._leftTop=e,this._width=s,this._height=r}draw(t){t.setColor(this._color),t.drawRectangle(this._leftTop,this._width,this._height)}getLeftTop(){return this._leftTop}getRightBottom(){return{x:this._leftTop.x+this._width,y:this._leftTop.y+this._height}}}class n{x;y;constructor(t,e){this.x=t,this.y=e}}class o extends r{_center;_radius;_vertexCount;constructor(t,e,s,r){if(r<3)throw new Error("VertexCount must be more than 2");super(t),this._center=e,this._radius=s,this._vertexCount=r}draw(t){const e=[],s=2*Math.PI/this._vertexCount;for(let t=0;t<this._vertexCount;t++){const r=t*s-Math.PI/2,i=this._center.x+this._radius*Math.cos(r),o=this._center.y+this._radius*Math.sin(r);e.push(new n(i,o))}t.setColor(this._color),t.drawPolygon(e)}getCenter(){return this._center}getVertexCount(){return this._vertexCount}}class h extends r{_firstVertex;_secondVertex;_thirdVertex;constructor(t,e,s,r){super(t),this._firstVertex=e,this._secondVertex=s,this._thirdVertex=r}draw(t){t.setColor(this._color),t.drawPolygon([this._firstVertex,this._secondVertex,this._thirdVertex])}getVertex(t){switch(t){case 1:return this._firstVertex;case 2:return this._secondVertex;case 3:return this._thirdVertex;default:throw new Error("Unknown Vertex index")}}}class c extends r{_center;_horizontalRadius;_verticalRadius;constructor(t,e,s,r){super(t),this._center=e,this._horizontalRadius=s,this._verticalRadius=r}draw(t){t.setColor(this._color),t.drawEllipse(this._center,this._horizontalRadius,this._verticalRadius)}getCenter(){return this._center}getHorizontalRadius(){return this._horizontalRadius}getVerticalRadius(){return this._verticalRadius}}class a{createShape(t){let e=t.split(" ");const s=e[0],r=e[1],n=e.slice(2).map((t=>Number(t)));switch(s){case"rectangle":return new i(r,{x:n[0],y:n[1]},n[2],n[3]);case"regularpolygon":return new o(r,{x:n[0],y:n[1]},n[2],n[3]);case"triangle":return new h(r,{x:n[0],y:n[1]},{x:n[2],y:n[3]},{x:n[4],y:n[5]});case"ellipse":return new c(r,{x:n[0],y:n[1]},n[2],n[3]);default:throw new Error("Unsupported shape type")}}}class l{_shapeFactory=new a;createDraft(t,s){const r=new e;t.registerOnInput((t=>{if(!t)return;const e=this._shapeFactory.createShape(t);r.addShape(e)})),t.registerOnClose((()=>{s(r)}))}}class u{drawPicture(t,e){const s=t.getShapeCount();for(let r=0;r<s;r++)t.getShape(r).draw(e)}}class _{#t;#e;constructor(t){this.#t=t,this.#e=t.getContext("2d")}drawEllipse(t,e,s){this.#e.beginPath(),this.#e.ellipse(t.x,t.y,e,s,0,0,2*Math.PI),this.#e.closePath(),this.#e.fill()}drawRectangle(t,e,s){this.#e.fillRect(t.x,t.y,e,s)}drawPolygon(t){this.#e.beginPath(),this.moveTo(t[0]),t.forEach(((t,e)=>{e>0&&this.lineTo(t)})),this.#e.closePath(),this.#e.fill()}drawLine(t,e){this.#e.beginPath(),this.moveTo(t),this.lineTo(e),this.#e.closePath(),this.#e.stroke()}drawText(t,e,s){this.#e.font=`${e}px serif`,this.#e.fillText(s,t.x,t.y)}lineTo(t){this.#e.lineTo(t.x,t.y)}moveTo(t){this.#e.moveTo(t.x,t.y)}setColor(t){this.#e.fillStyle=t,this.#e.strokeStyle=t}}const d=document.getElementById("canvas");function x(t){const e=new _(d);(new u).drawPicture(t,e)}d.width=window.innerWidth,d.height=window.innerHeight-50,function(){const e=document.getElementById("input"),s=document.getElementById("endButton"),r=new t(e,s);(new l).createDraft(r,x)}()})();