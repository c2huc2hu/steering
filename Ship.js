var Ship = function (x, y, maxSpeed, maxForce, turnSpeed)
{
    DumbObject.call(this, x, y, maxSpeed, maxForce); 
    this.turnSpeed = turnSpeed;  // radians / second
    
    this.heading = 0; // measured clockwise from pointing right. 
    this.modules = []; 
}
Ship.prototype = Object.create(DumbObject.prototype);

Ship.prototype.addModule = function(type, offsetX, offsetY)
{
    this.modules.push(new Module(offsetX, offsetY, this)); 
}

Ship.prototype.clone = function(ship)
{
    
}

Ship.prototype.update = function(dt)
{
    Object.getPrototypeOf(Ship.prototype).update.call(this, dt); 
    
    var curHeading = Math.atan2(this.vy, this.vx); 
    if (curHeading - this.heading < this.turnSpeed)
        this.heading = curHeading; 
    else if (curHeading - this.heading < 0)
        this.heading += this.turnSpeed * dt; 
    else if (curHeading - this.heading > 0)
    {
        this.heading -= this.turnSpeed * dt; 
    }
    this.heading = (this.heading + 2 * Math.PI) % (2 * Math.PI);
}

Ship.prototype.render = function(context)
{
    Object.getPrototypeOf(Ship.prototype).render.call(this, context); 
    for (i = 0; i < this.modules.length; i++)
    {
        this.modules[i].render(context); 
    }
}