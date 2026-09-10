import { Particle } from "./Particle.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

const WIDTH = document.body.clientWidth;
const HEIGHT = document.body.clientHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

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



function getRandomColor(){
  const r = Math.round(Math.random()*255);
  const g = Math.round(Math.random()*255);
  const b = Math.round(Math.random()*255);

  return "#"+r.toString(16)+""+g.toString(16)+""+b.toString(16)+"";


}

console.log(getRandomColor())




function createPoints(){
  for(let i =0; i < 500;i++){
    const mass = Math.random()*2+0.1;
    const p1 = new Particle(Math.random()*WIDTH,Math.random()*HEIGHT,5, mass ,getRandomColor());
    const fx = Math.random()*2-1;
    const fy = Math.random()*2-1;
    p1.applyForce([fx,fy], mass);
    POINTS.push(p1);
    


  }


}
createPoints();
/*
const p1 = new Particle(50,300,5, 1 ,getRandomColor());
p1.applyForce([1,0], 1);
const p2 = new Particle(450,300,5, 2, getRandomColor());
p2.applyForce([-1, 0], 2);


POINTS.push(p1);
POINTS.push(p2);*/




const run = setInterval(()=>{
  clearCanvas();
  POINTS.forEach(p=>{
    drawPoint(p.x,p.y,p.radius,p.color);
    const p_force = [p.force[0], p.force[1]]
    POINTS.forEach(q=>{
      if(p!=q){
        if(p.isColliding(q)){
          const q_force = [q.force[0], q.force[1]]
          const resultant = [q.force[0]*q.mass+p.force[0]*p.mass ,q.force[1]*q.mass+p.force[1]*p.mass]
          p.applyForce(q_force, q.mass);
          q.applyForce([p_force[0],p_force[1]], p.mass);
          // p.setForce(resultant);
          // q.setForce(resultant);
        }

      }


    })

    
    p.move();

  });




}, 10);





// drawPoint(50,50, "#ff0000")



