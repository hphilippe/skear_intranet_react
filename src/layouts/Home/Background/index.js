import React from "react";
import { Helmet } from "react-helmet";
import './style.css';

const Background = () => {
  return (
    <div className="background_particle">
      <div id="particle-canvas"></div>

      <Helmet
        script={[
          { "src": "../../../public/js/particle-network.min.js", "type": "text/javascript" }
        ]}
      />
      <Helmet
        script={[{ 
          type: 'text/javascript', 
          innerHTML: `!function(t){var i="object"==typeof self&&self.self===self&&self||"object"==typeof global&&global.global===global&&global;"function"==typeof define&&define.amd?define(["exports"],function(s){i.ParticleNetwork=t(i,s)}):"object"==typeof module&&module.exports?module.exports=t(i,{}):i.ParticleNetwork=t(i,{})}(function(t,i){var s=function(t){this.canvas=t.canvas,this.g=t.g,this.particleColor=t.options.particleColor,this.x=Math.random()*this.canvas.width,this.y=Math.random()*this.canvas.height,this.velocity={x:(Math.random()-.5)*t.options.velocity,y:(Math.random()-.5)*t.options.velocity}};return s.prototype.update=function(){(this.x>this.canvas.width+20||this.x<-20)&&(this.velocity.x=-this.velocity.x),(this.y>this.canvas.height+20||this.y<-20)&&(this.velocity.y=-this.velocity.y),this.x+=this.velocity.x,this.y+=this.velocity.y},s.prototype.h=function(){this.g.beginPath(),this.g.fillStyle=this.particleColor,this.g.globalAlpha=.7,this.g.arc(this.x,this.y,1.5,0,2*Math.PI),this.g.fill()},(i=function(t,i){this.i=t,this.i.size={width:this.i.offsetWidth,height:this.i.offsetHeight},i=void 0!==i?i:{},this.options={particleColor:void 0!==i.particleColor?i.particleColor:"#fff",background:void 0!==i.background?i.background:"#1a252f",interactive:void 0===i.interactive||i.interactive,velocity:this.setVelocity(i.speed),density:this.j(i.density)},this.init()}).prototype.init=function(){if(this.k=document.createElement("div"),this.i.appendChild(this.k),this.l(this.k,{position:"absolute",top:0,left:0,bottom:0,right:0,"z-index":1}),/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.options.background))this.l(this.k,{background:this.options.background});else{if(!/\.(gif|jpg|jpeg|tiff|png)$/i.test(this.options.background))return console.error("Please specify a valid background image or hexadecimal color"),!1;this.l(this.k,{background:'url("'+this.options.background+'") no-repeat center',"background-size":"cover"})}if(!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.options.particleColor))return console.error("Please specify a valid particleColor hexadecimal color"),!1;this.canvas=document.createElement("canvas"),this.i.appendChild(this.canvas),this.g=this.canvas.getContext("2d"),this.canvas.width=this.i.size.width,this.canvas.height=this.i.size.height,this.l(this.i,{position:"relative"}),this.l(this.canvas,{"z-index":"20",position:"relative"}),window.addEventListener("resize",function(){return(this.i.offsetWidth!==this.i.size.width||this.i.offsetHeight!==this.i.size.height)&&(this.canvas.width=this.i.size.width=this.i.offsetWidth,this.canvas.height=this.i.size.height=this.i.offsetHeight,clearTimeout(this.m),void(this.m=setTimeout(function(){this.o=[];for(var t=0;t<this.canvas.width*this.canvas.height/this.options.density;t++)this.o.push(new s(this));this.options.interactive&&this.o.push(this.p),requestAnimationFrame(this.update.bind(this))}.bind(this),500)))}.bind(this)),this.o=[];for(var t=0;t<this.canvas.width*this.canvas.height/this.options.density;t++)this.o.push(new s(this));this.options.interactive&&(this.p=new s(this),this.p.velocity={x:0,y:0},this.o.push(this.p),this.canvas.addEventListener("mousemove",function(t){this.p.x=t.clientX-this.canvas.offsetLeft,this.p.y=t.clientY-this.canvas.offsetTop}.bind(this)),this.canvas.addEventListener("mouseup",function(t){this.p.velocity={x:(Math.random()-.5)*this.options.velocity,y:(Math.random()-.5)*this.options.velocity},this.p=new s(this),this.p.velocity={x:0,y:0},this.o.push(this.p)}.bind(this))),requestAnimationFrame(this.update.bind(this))},i.prototype.update=function(){this.g.clearRect(0,0,this.canvas.width,this.canvas.height),this.g.globalAlpha=1;for(var t=0;t<this.o.length;t++){this.o[t].update(),this.o[t].h();for(var i=this.o.length-1;i>t;i--){var s=Math.sqrt(Math.pow(this.o[t].x-this.o[i].x,2)+Math.pow(this.o[t].y-this.o[i].y,2));s>120||(this.g.beginPath(),this.g.strokeStyle=this.options.particleColor,this.g.globalAlpha=(120-s)/120,this.g.lineWidth=.7,this.g.moveTo(this.o[t].x,this.o[t].y),this.g.lineTo(this.o[i].x,this.o[i].y),this.g.stroke())}}0!==this.options.velocity&&requestAnimationFrame(this.update.bind(this))},i.prototype.setVelocity=function(t){return"fast"===t?1:"slow"===t?.33:"none"===t?0:.66},i.prototype.j=function(t){return"high"===t?5e3:"low"===t?2e4:isNaN(parseInt(t,10))?1e4:t},i.prototype.l=function(t,i){for(var s in i)t.style[s]=i[s]},i});var canvasDiv=document.getElementById("particle-canvas"),options={particleColor:"#888",background:"https://raw.githubusercontent.com/JulianLaval/canvas-particle-network/master/img/demo-bg.jpg",interactive:!0,speed:"medium",density:"high"},particleCanvas=new ParticleNetwork(canvasDiv,options);`
        }]}
      />

    </div>
  );
}

export default Background;
