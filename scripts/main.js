const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

const WIDTH = document.body.clientWidth;
const HEIGHT = document.body.clientHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

function drawPoint(x,y,c){
  context.beginPath();
  context.arc(x, y, 5, 0, 2*Math.PI);
  context.fillStyle = c;
  context.fill();
  context.closePath();
}


drawPoint(50,50, "#ff0000")



