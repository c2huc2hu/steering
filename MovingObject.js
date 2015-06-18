// Object with no acceleration, but has velocity. Default sprite is included for debugging. 

var MovingObject = function(x, y)
{
    this.x = x; 
    this.y = y; 
    
    this.vx = 10; 
    this.vy = 10; 
}

// dt: time difference in seconds
MovingObject.prototype.update = function(dt)
{
    this.x += this.vx * dt; 
    this.y += this.vy * dt; 
}

MovingObject.prototype.render = function(context)
{
    context.beginPath(); 
    context.strokeStyle = "#888888";
    context.arc(this.x, this.y, 5, 0, 2 * Math.PI); 
    context.moveTo(this.x, this.y); 
    context.lineTo(this.x + this.vx, this.y + this.vy); 
    context.fill();
    context.stroke();
}