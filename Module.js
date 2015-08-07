// base class/ placeholder for modules

var Module = function(ship, offsetX, offsetY)
{
    this.ship = ship; // this.ship must have: x, y, heading. 
    this.offsetX = offsetX;  
    this.offsetY = offsetY; 
}

Module.prototype.render = function(context)
{
    // use a rotation matrix to adjust the location
    var relativeX = Math.cos(this.ship.heading) * this.offsetX - Math.sin(this.ship.heading) * this.offsetY; 
    var relativeY = Math.sin(this.ship.heading) * this.offsetX + Math.cos(this.ship.heading) * this.offsetY; 
    
    context.beginPath(); 
    context.strokeStyle = "#444488";
    context.arc(this.ship.x + relativeX, this.ship.y + relativeY, 5, 0, 2 * Math.PI); 
    context.stroke(); 
}

Module.prototype.update = function(dt)
{
    // do nothing. 
}