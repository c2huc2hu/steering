var Bullet = function(x, y, speed) // add some more parameters here for damage and stuff
{
    MovingObject.call(this, x, y); 
    this.speed = speed; 
}
Bullet.prototype = Object.create(MovingObject.prototype); 

// clones this type of bullet. properties x, y, heading are specific to individual bullets and should be set accordingly
Bullet.prototype.clone = function(x, y, heading)
{
    var b = new Bullet(x, y, this.speed); 
    b.vx = this.speed * Math.cos(heading); 
    b.vy = this.speed * Math.sin(heading); 
    return b; 
}

Bullet.prototype.render = function(context)
{
    context.beginPath(); 
    context.strokeStyle = "#FF4444"; 
    context.moveTo(this.x, this.y); 
    context.lineTo(this.x + this.vx * 0.05, this.y + this.vy * 0.05); 
    context.stroke(); 
}