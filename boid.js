// Class boid

var Boid = function(x, y)
{
    this.x = x; 
    this.y = y; 
    this.vx = 10;  // x velocity in pixels / second
    this.vy = 10;  // y velocity in pixels / second
}

Boid.prototype.update = function(dt)
{
    this.x += this.vx * dt / 1000; 
    this.y += this.vy * dt / 1000; 
}

Boid.prototype.render = function(context)
{
    context.drawImage(images, this.x, this.y); 
}