// An object that can change direction, but is constrained by a maximum speed and force. 
// I will need to fudge these a little bit, because discrete != analytical

var DumbObject = function(x, y, maxSpeed, maxForce)
{
    MovingObject.call(this, x, y); 
    this.maxSpeed = maxSpeed; 
    this.maxForce = maxForce; 
    this.steerX = 0; // steering forces 
    this.steerY = 0; 
}

DumbObject.prototype = Object.create(MovingObject.prototype); 

// Give the direction (and magnitude if less than maxForce) of the steering force
DumbObject.prototype.steer = function(steerX, steerY)
{
    this.steerX = steerX; 
    this.steerY = steerY; 
}

// Overload default functions
DumbObject.prototype.update = function(dt)
{
    function square(x) { return x * x; } // helper function
    
    // cap the magnitude of the steering force to maxForce
    if(square(this.steerX) + square(this.steerY) > square(this.maxForce))
    {
        var scaleFactor = square(this.maxForce) / (square(this.steerX) + square(this.steerY));
        this.steerX *= scaleFactor; 
        this.steerY *= scaleFactor; 
    }
    
    this.vx += this.steerX * dt; 
    this.vy += this.steerY * dt; 
    
    // cap the magnitude of the velocity
    if(square(this.vx) + square(this.vy) > square(this.maxSpeed))
    {
        var scaleFactor = square(this.maxSpeed) / (square(this.vx) + square(this.vy));
        this.vx *= scaleFactor; 
        this.vy *= scaleFactor; 
    }
    
    this.x += this.vx; 
    this.y += this.vy; 
}