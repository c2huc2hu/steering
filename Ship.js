var Ship = function (x, y, type)
{
    // load properties: turnSpeed (rad/s), maxSpeed (px/s), maxForce (??)
    this.type = type; 
    var obj = assets.shipTypes[type]; 
    for(var prop in obj)
        this[prop] = obj[prop];    
    
    DumbObject.call(this, x, y, this.maxSpeed, this.maxForce); 
    
    this.modules = []; 
    for (var i in obj.weapons)
    {
        this.addWeaponModule(obj.weapons[i].offsetX, obj.weapons[i].offsetY, obj.weapons[i].type); 
        for(var prop in obj.weapons[i])
            this.modules[i][prop] = obj.weapons[i][prop]; 
    }
        
    for(var module in obj.modules)
    {
        this.addModule(obj.modules[i].offsetX, obj.modules[i].offsetY, obj.modules[i].type); 
        for(var prop in obj.modules[i])
            this.modules[length(this.modules) - 1][prop] = obj.modules[i][prop]
    }
    
    this.heading = 0; // measured clockwise from pointing right. 
    this.moveState = Ship.moveStates.STOP;
    this.destroyed = false; 
}
Ship.prototype = Object.create(DumbObject.prototype);

Ship.moveStates = {STOP: "MOVESTATE STOP", ATTACK: "MOVESTATE ATTACK", FOLLOW: "MOVESTATE FOLLOW", ARRIVE: "MOVESTATE ARRIVE", DOCK: "MOVESTATE DOCK"}; 

Ship.prototype.addWeaponModule = function(offsetX, offsetY, weaponType)
{
    this.modules.push(new WeaponModule(this, offsetX, offsetY, weaponType)); 
}

Ship.prototype.addModule = function(offsetX, offsetY, type)
{
    this.modules.push(new Module(this, offsetX, offsetY, type)); 
}

// Handles bullets hitting the ship. The dmgModifier multiplies the damage, and should come from the module 
// Return the amount of damage the ship's hull takes (to assign that damage to the module)
Ship.prototype.takeDamage = function(bullet, dmgModifier)
{
    var result; 
    if (this.shield == 0)
    {
        this.health -= bullet.damage * dmgModifier; 
        result = bullet.damage * dmgModifier; 
    } 
    else if (this.shield > bullet.damage)
    {
        this.shield -= bullet.damage; // modifier doesn't affect shield damage
        this.health -= bullet.damage * bullet.pierce; 
        result = bullet.damage * bullet.pierce; 
    }
    else 
    {
        var dmg = (bullet.damage - this.shield) * dmgModifier + this.shield * bullet.pierce;  // damage not absorbed by shield 
        this.health -= dmg; 
        this.shield = 0; 
        result = dmg; 
    }
    
    if (this.health <= 0)
    {
        this.destroyed = true; 
    }
    return result; 
}

Ship.prototype.update = function(dt)
{
    switch(this.moveState)
    {
        case Ship.moveStates.STOP: 
            break; 
        case Ship.moveStates.ATTACK: 
        case Ship.moveStates.FOLLOW:
            this.seek(this.target); 
            break; 
        case Ship.moveStates.ARRIVE:
        case Ship.moveStates.DOCK:
            this.arrive(this.target); 
            break; 
    }
    
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
    
    // draw a health bar if selected. 
    if (this.selected)
    {
        context.beginPath(); 
        context.fillStyle = "#BB0000"; 
        context.fillRect(this.x - 10, this.y - 10, 20, 5); 
        context.stroke(); 
        
        context.beginPath(); 
        context.fillStyle = "#00BB00"; 
        context.fillRect(this.x - 10, this.y - 10, this.health / assets.shipTypes[this.type].health * 20, 5); 
        context.stroke();  
        
        context.beginPath(); 
        context.fillStyle = "#0000BB"; 
        context.fillRect(this.x - 10, this.y - 15, 20, 5); 
        context.stroke(); 
        
        //context.beginPath(); 
        context.fillStyle = "#0055BB"; 
        context.fillRect(this.x - 10, this.y - 15, this.shield / assets.shipTypes[this.type].shield * 20, 5); 
        context.stroke();  
    }
}

Ship.prototype.setMoveState = function(moveState, target)
{
    this.moveState = moveState; 
    this.target = target; 
}