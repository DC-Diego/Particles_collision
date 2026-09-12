export class Particle{

  constructor(x,y, radius, mass = 1, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.force = [0,0];
    this.velocity = [0,0]
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
    const ax = this.force[0]/this.mass;
    const ay = this.force[1]/this.mass;

    this.velocity[0] += ax; 
    this.velocity[1] += ay; 

    this.x += this.velocity[0];
    this.y += this.velocity[1];
    
    
    this.velocity[0] *= 0.999999;
    this.velocity[1] *= 0.999999;


    this.force[0] = this.force[1] = 0;



  }






}
