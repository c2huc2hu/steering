var Bullet = function(x, y, type) // add some more parameters here for damage and stuff
{
    MovingObject.call(this, x, y); 
    this.type = type; // string which gives the lookup in assets.bulletTypes
    
    // copy all properties from the json: damage, speed so far. 
    var obj = assets.bulletTypes[type]; 
    for(var prop in obj)
        this[prop] = obj[prop];     
}
Bullet.prototype = Object.create(MovingObject.prototype); 

/*// static method to load from an object with properties: speed and damage
Bullet.loadFromObject = function(o)
{
    var b = new Bullet(0, 0, o.speed); 
    b.damage = o.damage; 
    return b; 
}*/ 

// Sets the heading of the bullet. 
Bullet.prototype.setHeading = function(heading)
{
    this.vx = this.speed * Math.cos(heading); 
    this.vy = this.speed * Math.sin(heading);    
}

Bullet.prototype.render = function(context)
{
    context.beginPath(); 
    context.strokeStyle = "#FF4444"; 
    context.moveTo(this.x - screenX, this.y - screenY); 
    context.lineTo(this.x + this.vx * 0.05 - screenX, this.y + this.vy * 0.05 - screenY); 
    context.stroke(); 
}