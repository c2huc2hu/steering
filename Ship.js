var Ship = function (x, y, maxSpeed, maxForce, turnSpeed)
{
    DumbObject.call(this, x, y, maxSpeed, maxForce); 
    this.turnSpeed = turnSpeed;  // radians / second
    
    this.heading = 0; // measured clockwise from pointing right. 
    this.modules = []; 
}
Ship.prototype = Object.create(DumbObject.prototype);

Ship.prototype.addWeaponModule = function(offsetX, offsetY, bullet, cooldown)
{
    this.modules.push(new WeaponModule(this, offsetX, offsetY, bullet, cooldown)); 
}

Ship.prototype.addModule = function(type, offsetX, offsetY)
{
    this.modules.push(new Module(this, offsetX, offsetY)); 
}

/* Copy all properties from a ship */ 
Ship.prototype.clone = function(ship) 
{
        
}

Ship.prototype.update = function(dt)
{
    Object.getPrototypeOf(Ship.prototype).update.call(this, dt); 
    
    var desiredHeading = Math.atan2(this.vy, this.vx); 
    if (desiredHeading - this.heading < this.turnSpeed)
        this.heading = desiredHeading; 
    else if (desiredHeading - this.heading < 0)
        this.heading += this.turnSpeed * dt; 
    else if (desiredHeading - this.heading > 0)
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