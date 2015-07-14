// An object that can steer somewhat intelligently towards a point
var DumbObject = function(x, y, maxSpeed, maxForce)
{
    SteeringObject.call(this, x, y, maxSpeed, maxForce); 
    this.stoppingDistance = this.maxSpeed*this.maxSpeed / 2 / this.maxForce; 
}
DumbObject.prototype = Object.create(SteeringObject.prototype); 

// head towards the target. desiredSpeed defaults to the maximum speed. 
DumbObject.prototype.seek = function(target, desiredSpeed)
{
    desiredSpeed = desiredSpeed || this.maxSpeed; //default speed is maxSpeed
    var desiredvx = (target.x - this.x); 
    var desiredvy = (target.y - this.y); 
    var velocity = Math.sqrt(desiredvx*desiredvx + desiredvy*desiredvy); 
    desiredvx *= desiredSpeed / velocity; 
    desiredvy *= desiredSpeed / velocity; 
    
    console.log(Math.sqrt(this.vx*this.vx+this.vy*this.vy));
    var forcex = desiredvx - this.vx * 60; 
    var forcey = desiredvy - this.vy * 60;  
    var force = Math.sqrt(forcex*forcex + forcey*forcey); 
    
    if (force > this.maxForce)
        this.steer(forcex * this.maxForce / force, forcey * this.maxForce / force); 
    else
        this.steer(forcex, forcey); 
}

DumbObject.prototype.flee = function(target)
{
    this.seek(target, -this.maxSpeed); 
}

DumbObject.prototype.arrive = function(target)
{
    var dx = target.x - this.x; 
    var dy = target.y - this.y;     
    if (dx == 0 && dy == 0)
    {
        return; 
    }
    
    if (dx*dx + dy*dy <= this.stoppingDistance*this.stoppingDistance)
    {
        var desiredSpeed = this.maxSpeed * Math.sqrt(dx*dx + dy*dy) / this.stoppingDistance; 
        console.log(desiredSpeed)
        this.seek(target, desiredSpeed); 
    }
    else
    {
        this.seek(target); 
    }
}

DumbObject.prototype.update = function(dt)
{
    Object.getPrototypeOf(DumbObject.prototype).update.call(this, dt); 
}

DumbObject.prototype.render = function(context)
{
    Object.getPrototypeOf(DumbObject.prototype).render.call(this, context); 
   
    if (this.desiredvx)
    {
        context.beginPath(); 
        context.strokeStyle = "#000088";
        context.moveTo(this.x, this.y); 
        context.lineTo(this.x + this.desiredvx, this.y + this.desiredvy); 
        context.stroke(); 
    }
}