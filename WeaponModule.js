var WeaponModule = function(ship, offsetX, offsetY, type)
{
    Module.call(this, ship, offsetX, offsetY); 
    this.type = type; // should be a string 
    
    // copy all properties from the json: bulletType, cooldown, minAngle, maxAngle, turnSpeed, radius so far 
    var obj = assets.weaponTypes[type]; 
    for(var prop in obj)
        this[prop] = obj[prop];
    
    this.lastFire = Date.now(); 
    this.heading = 0; 
}
    
WeaponModule.prototype = Object.create(Module.prototype);

WeaponModule.prototype.aim = function(target)
{
    this.target = target; 
}

WeaponModule.prototype.fire = function()
{
    if (Date.now() - this.lastFire > this.cooldown * 1000)
    {
        var newBullet = new Bullet(this.x, this.y, this.bulletType);
        newBullet.setHeading(this.heading + this.ship.heading); 
        newBullet.source = this.ship;
        bullets.push(newBullet); 
        
        this.lastFire = Date.now(); 
    }
}

WeaponModule.prototype.render = function(context)
{
    context.beginPath(); 
    context.strokeStyle = "#AA4444"; 
    context.moveTo(this.x - screenX, this.y - screenY); 
    context.lineTo(this.x + Math.cos(this.heading + this.ship.heading) * 5 - screenX, this.y + Math.sin(this.heading + this.ship.heading) * 5 - screenY);
    context.stroke(); 
    
    Object.getPrototypeOf(WeaponModule.prototype).render.call(this, context); 
}

WeaponModule.prototype.update = function(dt)
{
    if (this.target === undefined)
    {
        return; // do nothing
    }
    
    var desiredHeading = (Math.atan2(this.target.y - this.y, this.target.x - this.x) - this.ship.heading) % (2 * Math.PI); 
    var newHeading; 
    if (Math.abs(desiredHeading - this.heading) % (2 * Math.PI) < this.turnSpeed * dt)
        this.heading = desiredHeading; 
    else if ((desiredHeading - this.heading + 4 * Math.PI) % (2 * Math.PI) < Math.PI)
    {
        newHeading = this.heading + this.turnSpeed * dt; 
    }
    else 
    {
        newHeading = this.heading - this.turnSpeed * dt; 
    }
    
    newHeading = (newHeading + 2 * Math.PI) % (2 * Math.PI);
    
    // if this.minAngle, newHeading , this.maxAngle are in that order, or first/ second inversion (think music chords), the position is allowed.
    // otherwise we ignore the change in heading. I'm sure this could be more efficient, but it's readable right now. 
    if((this.minAngle < newHeading && newHeading  < this.maxAngle) ||
      (newHeading < this.maxAngle && this.maxAngle < this.minAngle) || 
      (this.maxAngle < this.minAngle && this.minAngle < newHeading))
    {
        this.heading = newHeading; 
    }
    
    this.heading = Math.max(this.heading, this.minAngle);  // restrict the angle
    this.heading = Math.min(this.heading, this.maxAngle); 
}
