// base class/ placeholder for modules

var Module = function(ship, offsetX, offsetY)
{
    this.ship = ship; // this.ship must have: x, y, heading. 
    this.offsetX = offsetX; 
    this.offsetY = offsetY; 
    
    this.x = this.ship.x + offsetX; 
    this.y = this.ship.y + offsetY; 
    
    this.destroyed = false; 
}

Module.prototype.takeDamage = function(bullet)
{
    this.health -= this.ship.takeDamage(bullet, this.dmgModifier); 
    
    if (this.health <= 0)
    {
        this.destroyed = true; 
    }
}

Module.prototype.render = function(context)
{
    // use a rotation matrix to adjust the location
    var relativeX = Math.cos(this.ship.heading) * this.offsetX - Math.sin(this.ship.heading) * this.offsetY; 
    var relativeY = Math.sin(this.ship.heading) * this.offsetX + Math.cos(this.ship.heading) * this.offsetY; 
    this.x = this.ship.x + relativeX; 
    this.y = this.ship.y + relativeY; 
    
    context.beginPath(); 
    context.strokeStyle = "#444488";
    context.arc(this.x - screenX, this.y - screenY, this.radius, 0, 2 * Math.PI); 
    context.stroke(); 
}

Module.prototype.update = function(dt)
{
    // do nothing. 
}