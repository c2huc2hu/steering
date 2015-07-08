// An object that can steer somewhat intelligently towards a point
var DumbObject = function(x, y, maxSpeed, maxForce)
{
    SteeringObject.call(this, x, y, maxSpeed, maxForce); 
}
DumbObject.prototype = Object.create(SteeringObject.prototype); 

DumbObject.prototype.seek = function(target)
{
    var desiredvx = target.x - this.x; 
    var desiredvy = target.y - this.y; 
    this.steer(desiredvx * 10000, desiredvy * 10000); 
}

DumbObject.prototype.flee = function(target)
{
    var desiredvx = this.x - target.x; 
    var desiredvy = this.y - target.y;  
    this.steer(desiredvx * 10000, desiredvy * 10000); 
}

DumbObject.prototype.update = function(dt)
{
    Object.getPrototypeOf(DumbObject.prototype).update.call(this, dt); 
}