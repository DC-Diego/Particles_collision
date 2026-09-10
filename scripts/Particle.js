export class Particle{

  constructor(x,y, radius, mass = 1, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.force = [0,0];
    this.mass = mass;
  }

  isColliding(particle){
    const dy = this.y-particle.y;
    const dx = this.x-particle.x;
    const radius = Math.pow(this.radius+particle.radius,2);
    return dx*dx+dy*dy <= radius;

  }



  applyForce(F, q_mass = 1){
    // console.log(this.mass,q_mass)
    this.force[0] += F[0]*q_mass/this.mass;
    this.force[1] += F[1]*q_mass/this.mass;

  }

  setForce(F){
    this.force = F;
  }

  move(){
    console.log(this.force)
    this.x += this.force[0];
    this.y += this.force[1];


  }






}
