// An object that can change direction, but is constrained by a maximum speed and force. 
// I will need to fudge these a little bit, because discrete != analytical

var SteeringObject = function(x, y, maxSpeed, maxForce)
{
    MovingObject.call(this, x, y); 
    if (maxSpeed == 0) 
        throw "Maximum speed is zero. Use a different type of object instead."; 
    this.maxSpeed = maxSpeed; 
    
    if (maxForce == 0)
        throw "Maximum force is zero. Use a different type of object instead."; 
    this.maxForce = maxForce; 
    this.steerX = 0; // steering forces 
    this.steerY = 0; 
}

SteeringObject.prototype = Object.create(MovingObject.prototype); 

// Give the direction (and magnitude if less than maxForce) of the steering force
SteeringObject.prototype.steer = function(steerX, steerY)
{
    this.steerX = steerX; 
    this.steerY = steerY; 
}

// Overload default functions
SteeringObject.prototype.update = function(dt)
{
    function square(x) { return x * x; } // helper function
    
    // cap the magnitude of the steering force to maxForce
    if(square(this.steerX) + square(this.steerY) > square(this.maxForce * dt))
    {
        var scaleFactor = dt * this.maxForce / Math.sqrt(square(this.steerX) + square(this.steerY));
        this.steerX *= scaleFactor; 
        this.steerY *= scaleFactor; 
    }
    
    this.vx += this.steerX * dt; 
    this.vy += this.steerY * dt; 
        
    // cap the magnitude of the velocity
    if(square(this.vx) + square(this.vy) > square(this.maxSpeed * dt))
    {
        var scaleFactor = dt * this.maxSpeed / Math.sqrt(square(this.vx) + square(this.vy));
        this.vx *= scaleFactor; 
        this.vy *= scaleFactor; 
    }
        
    this.x += this.vx; 
    this.y += this.vy; 
}

SteeringObject.prototype.render = function(context)
{
    context.beginPath(); 
    context.strokeStyle = "#888888";
    context.arc(this.x, this.y, 5, 0, 2 * Math.PI); 
    context.moveTo(this.x, this.y); 
    context.lineTo(this.x + this.vx * 10, this.y + this.vy * 10); 
    context.stroke();  
    
    context.beginPath(); 
    context.moveTo(this.x + this.vx * 10, this.y + this.vy * 10); 
    context.strokeStyle = "#880000"; 
    context.lineTo(this.x + this.vx * 10 + this.steerX * 10, this.y + this.vy * 10 + this.steerY * 10);  // steering force is red. 
    context.stroke();
}