var WeaponModule = function(ship, offsetX, offsetY, bullet, cooldown)
{
    Module.call(this, ship, offsetX, offsetY); 
    this.bullet = bullet; 
    this.cooldown = cooldown; 
    
    this.lastFire = Date.now();
    this.heading = 0; 
    this.turnSpeed = 2; // TEMPORARY CONSTANT: will be replaced when I actually make weapon types
    this.radius = 5; // another temporary constant
}
WeaponModule.prototype = Object.create(Module.prototype);

WeaponModule.prototype.aim = function(target)
{
    this.target = target; 
}

WeaponModule.prototype.fire = function()
{
    if (Date.now() - this.lastFire > this.cooldown)
    {
        var newBullet = this.bullet.clone(this.x, this.y, this.heading + this.ship.heading); 
        newBullet.source = this.ship;
        bullets.push(newBullet); 
        
        this.lastFire = Date.now(); 
    }
}

WeaponModule.prototype.render = function(context)
{
    context.beginPath(); 
    context.strokeStyle = "#AA4444"; 
    context.moveTo(this.x, this.y); 
    context.lineTo(this.x + Math.cos(this.heading + this.ship.heading) * 5, this.y + Math.sin(this.heading + this.ship.heading) * 5);
    context.stroke(); 
    
    Object.getPrototypeOf(WeaponModule.prototype).render.call(this, context); 
}

WeaponModule.prototype.update = function(dt)
{
    if (this.target === undefined)
    {
        return;  // do nothing
    }
    
    var desiredHeading = (Math.atan2(this.target.y - this.y, this.target.x - this.x) - this.ship.heading) % (2 * Math.PI); 
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
}
