import { Particle } from "./Particle.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

const WIDTH = document.body.clientWidth;
const HEIGHT = document.body.clientHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const PARTICLES_COLLISION = false;
const BORDER_COLLISION = true;

const EXPANSION = 4;

function drawPoint(x,y,r,c){
  context.beginPath();
  context.arc(x, y, r, 0, 2*Math.PI);
  context.fillStyle = c;
  context.fill();
  context.closePath();
}

function clearCanvas(){
  context.clearRect(0,0,WIDTH,HEIGHT);

}
const POINTS = [];



function toHex([r,g,b]){
  return "#"+Math.round(r).toString(16).padStart(2,'0')+""
      +Math.round(g).toString(16).padStart(2,'0')+""
      +Math.round(b).toString(16).padStart(2,'0')+"";


}

function getRandomColor(){
  const b = Math.round(Math.max(Math.random(),0.9)*255);
  const g = Math.round(Math.min(Math.random(),0.8)*255);
  const r = Math.round(Math.min(Math.random(),0.2)*255);
  // return "#ff0000"
  return toHex([r,g,b]);

}

console.log(getRandomColor())




function createPoints() {
  for (let i = 0; i < 10000; i++) {
    const n = Math.random()*10;
    const mass =  Math.max(1, Math.min(2,n));

    const p = new Particle(
      (Math.random() -0.5)* WIDTH,
      (Math.random() -0.5)* HEIGHT,
      mass,
      mass,
      getRandomColor()
    );

    p.velocity = [
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ];

    POINTS.push(p);
  }
}

createPoints();
/*
const p1 = new Particle(50,300,5, 1 ,getRandomColor());
p1.applyForce([1,0], 1);
const p2 = new Particle(450,300,5, 2, getRandomColor());
p2.applyForce([-1, 0], 2);


POINTS.push(p1);
POINTS.push(p2);
*/

function resolveCollision(a, b) {

  const dx = b.x - a.x;
  const dy = b.y - a.y;

  const distance = Math.sqrt(dx * dx + dy * dy);

  const nx = dx / distance;
  const ny = dy / distance;

  // Relative velocity
  const rvx = b.velocity[0] - a.velocity[0];
  const rvy = b.velocity[1] - a.velocity[1];

  // Relative velocity along collision normal
  const velocityAlongNormal = rvx * nx + rvy * ny;

  // Already moving apart
  if (velocityAlongNormal > 0) return;

  const restitution = 1;

  const impulse =
    -(1 + restitution) * velocityAlongNormal /
    (1 / a.mass + 1 / b.mass);

  const ix = impulse * nx;
  const iy = impulse * ny;

  a.velocity[0] -= ix / a.mass;
  a.velocity[1] -= iy / a.mass;

  b.velocity[0] += ix / b.mass;
  b.velocity[1] += iy / b.mass;
}



function radialForce(p){
  const pos = [p.x, p.y];
  


  const n = Math.sqrt(pos[0]*pos[0]+pos[1]*pos[1]);
  // const n = 1;

  const newForce = [pos[1]/n-pos[0]/(n*0.05),-pos[0]/n-pos[1]/(n)];
  return newForce;



}

function rgb(hex){
  const r = parseInt(hex.slice(1,3), 16) ;
  const g = parseInt(hex.slice(3,5), 16) ;
  const b = parseInt(hex.slice(5,7), 16) ;
  return [r,g,b];

}


function lerpColor(a1, a2, l) {
  const c1 = rgb(a1);
  const c2 = rgb(a2);

  return toHex([
    c1[0] * (1 - l) + c2[0] * l,
    c1[1] * (1 - l) + c2[1] * l,
    c1[2] * (1 - l) + c2[2] * l
  ]);
}


const run = setInterval(() => {

  clearCanvas();

  POINTS.forEach(p => {

    p.move();

    if(BORDER_COLLISION){
      if (p.x - p.radius <= -WIDTH*EXPANSION/2) {
        p.x = p.radius;
        p.velocity[0] *= -1;
      }

      if (p.x + p.radius >= WIDTH*EXPANSION/2) {
        p.x = WIDTH - p.radius;
        p.velocity[0] *= -1;
      }

      if (p.y - p.radius <= -HEIGHT*EXPANSION/2) {
        p.y = p.radius;
        p.velocity[1] *= -1;
      }

      if (p.y + p.radius >= HEIGHT*EXPANSION/2) {
        p.y = HEIGHT - p.radius;
        p.velocity[1] *= -1;
      }
    }
    // p.velocity = radialForce(p);
    p.applyForce(radialForce(p));
  });

  if(PARTICLES_COLLISION){
    for (let i = 0; i < POINTS.length; i++) {

      for (let j = i + 1; j < POINTS.length; j++) {

        const p = POINTS[i];
        const q = POINTS[j];

        if (p.isColliding(q)) {
          resolveCollision(p, q);
        }
      }
    }
  }


  POINTS.forEach(p => {
    const w =Math.hypot(p.velocity[0],p.velocity[1]);
    const d =Math.hypot(p.x/WIDTH*2,p.y/HEIGHT*2);
    // console.log(w)
    const l1 =       lerpColor(p.color,"#4020ff", Math.min(w/100,1));
    const l2 =       lerpColor("#ffffff",l1, Math.min(d,1))
 
    drawPoint(
      p.x/EXPANSION*2+WIDTH/2,
      p.y/EXPANSION*2+HEIGHT/2,
      p.radius,
      l2
      // p.color
      // lerpColor("#ffffff",p.color, Math.min(p.x*p.x/(WIDTH*WIDTH/8)+p.y*p.y/(HEIGHT*HEIGHT/8),1))
      );
    });
    
  }, 5);




// drawPoint(50,50, "#ff0000")



