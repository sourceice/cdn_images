/*
 * @Author: 赵富源
 * @Date: 2020-06-30 14:44:10
 * @LastEditTime: 2020-06-30 14:57:58
 * @FilePath: \无聊产物\js\canvas01.js
 */ 
let ctx = c.getContext("2d");
let cw = (c.width = window.innerWidth);
let ch = (c.height = window.innerHeight);

let w = 7;
let H = 25;
let arrowLength = 100;
let rid = null;

class Arrow {
  constructor(pos, a, n) {
    this.pos = pos;
    this.a = a;
    this.n = n;
  }

  draw() {
    let r=Math.floor(Math.random()*255);
    let g=Math.floor(Math.random()*255);
    let b=Math.floor(Math.random()*255);
    let rgba='rgba('+ r +','+ g +','+ b +',1)';
    let h = H * Math.cos(this.a);
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    //line
    ctx.globalCompositeOperation = "destination-over";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, arrowLength);
    ctx.strokeStyle = this.n % 2 == 0 ? rgba : rgba;
    ctx.stroke();

    if (this.n % 2 == 0) {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = rgba;
      ctx.lineCap = "round";
      //arrow 1
      ctx.beginPath();
      ctx.moveTo(-w, h);
      ctx.lineTo(0, 0);
      ctx.lineTo(w, h);
      ctx.stroke();
      //arrow 2
      ctx.beginPath();
      ctx.moveTo(-w, arrowLength - h);
      ctx.lineTo(0, arrowLength);
      ctx.lineTo(w, arrowLength - h);
      ctx.stroke();
    }
    ctx.restore();
    this.a += 0.075;
  }
}

let ry = [];
let a = 0;
let n = 0;

function Draw() {
  rid = window.requestAnimationFrame(Draw);
  ctx.clearRect(-cw, -ch, 2 * cw, 2 * ch);
  ry.map((arrow) => {
    arrow.draw();
  });
}

function Init() {
  if (rid) {
    cancelAnimationFrame(rid);
    rid = null;
  }
  cw = c.width = window.innerWidth;
  ch = c.height = window.innerHeight;
  ctx.lineWidth = 3;
  a = 0;
  n = 0;
  ry = [];
  for (let y = -arrowLength/2; y < ch+arrowLength/2; y += arrowLength) {
    n++;
    for (let x = 2 * w; x < cw; x += 3 * w) {
      a += 0.2;
      ry.push(new Arrow({ x, y }, a, n));
    }
    a += Math.PI / 3;
  }
  Draw();
}

window.setTimeout(function () {
  Init();
  window.addEventListener("resize", Init, false);
}, 15);