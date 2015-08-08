var WeaponModule = function(ship, offsetX, offsetY, bullet, cooldown)
{
    Module.call(this, ship, offsetX, offsetY); 
    this.bullet = bullet; 
    this.cooldown = cooldown; 
    
    this.lastFire = Date.now();
    this.heading = 0; 
    this.turnSpeed = 2; // TEMPORARY CONSTANT: will be replaced when I actually make weapon types
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
        var relativeX = Math.cos(this.ship.heading) * this.offsetX - Math.sin(this.ship.heading) * this.offsetY; 
        var relativeY = Math.sin(this.ship.heading) * this.offsetX + Math.cos(this.ship.heading) * this.offsetY; 
        
        var newBullet = this.bullet.clone(this.ship.x + relativeX, this.ship.y + relativeY, this.heading + this.ship.heading); 
        bullets.push(newBullet); 
        
        this.lastFire = Date.now(); 
    }
}

WeaponModule.prototype.render = function(context)
{
    var relativeX = Math.cos(this.ship.heading) * this.offsetX - Math.sin(this.ship.heading) * this.offsetY; 
    var relativeY = Math.sin(this.ship.heading) * this.offsetX + Math.cos(this.ship.heading) * this.offsetY; 
    
    context.beginPath(); 
    context.strokeStyle = "#AA4444"; 
    context.moveTo(this.ship.x + relativeX, this.ship.y + relativeY); 
    context.lineTo(this.ship.x + relativeX + Math.cos(this.heading + this.ship.heading) * 5, this.ship.y + relativeY + Math.sin(this.heading + this.ship.heading) * 5);
    context.stroke(); 
    
    Object.getPrototypeOf(WeaponModule.prototype).render.call(this, context); 
}

WeaponModule.prototype.update = function(dt)
{
    if (this.target === undefined)
    {
        return;  // do nothing
    }
    
    var relativeX = Math.cos(this.ship.heading) * this.offsetX - Math.sin(this.ship.heading) * this.offsetY; 
    var relativeY = Math.sin(this.ship.heading) * this.offsetX + Math.cos(this.ship.heading) * this.offsetY; 
    
    var desiredHeading = (Math.atan2(this.target.y - this.ship.y - relativeY, this.target.x - this.ship.x - relativeX) - this.ship.heading) % (2 * Math.PI); 
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
