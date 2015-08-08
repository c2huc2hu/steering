var Ship = function (x, y, maxSpeed, maxForce, turnSpeed)
{
    DumbObject.call(this, x, y, maxSpeed, maxForce); 
    this.turnSpeed = turnSpeed; // radians / second
    
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
    // walls apply a repulsive force if you get within 100 pixels. 
    if (this.x < 100) 
        this.steerX = this.maxForce; 
    else if (fieldWidth - this.x < 100)
        this.steerX = -this.maxForce; 
    if (this.y < 100)
        this.steerY = this.maxForce; 
    else if (fieldHeight - this.y < 100)
        this.steerY = -this.maxForce;
 
    Object.getPrototypeOf(Ship.prototype).update.call(this, dt); 
 
    // steer the visuals towards where the velocity points.
    var desiredHeading = Math.atan2(this.vy, this.vx); 
    if (Math.abs(desiredHeading - this.heading) % (2 * Math.PI) < this.turnSpeed * dt)
        this.heading = desiredHeading; 
    else if ((desiredHeading - this.heading + 4 * Math.PI) % (2 * Math.PI) < Math.PI)
    {
        this.heading += this.turnSpeed * dt; 
    }
    else 
    {
        this.heading -= this.turnSpeed * dt; 
    }
    this.heading = (this.heading + 2 * Math.PI) % (2 * Math.PI);
    
    for(var i = 0; i<this.modules.length;i++)
    {
        this.modules[i].update(dt); 
    }
}

Ship.prototype.render = function(context)
{    
    Object.getPrototypeOf(Ship.prototype).render.call(this, context); 
    
    for (var i = 0; i < this.modules.length; i++)
    {
        this.modules[i].render(context); 
    } 
    
    context.beginPath(); 
    context.strokeStyle = "#FFFFFF"; 
    context.moveTo(this.x - screenX, this.y - screenY);
    context.lineTo(this.x + Math.cos(this.heading) * 30 - screenX, this.y + Math.sin(this.heading) * 30 - screenY); 
    context.stroke(); 
}