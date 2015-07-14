// main.js

var lastTime = 0; 
var approxdt = 1.0/60; // approximation for 1/the frame rate, i.e. dt used in the update function

var canvas; // main canvas for the game 
var ctx; // context for the game, so you can draw on this. 
var mouse = {x:0, y:0}; 


var boids = []; 

function init()
{
    // Initialize boids
    boids.push(new DumbObject(10, 50, 100, 200), new DumbObject(10, 50, 100, 200)); 
    images = initImages(); 
    
    canvas = document.getElementById("canvas")
    canvas.style.backgroundColor = "#000000"
    ctx = canvas.getContext("2d");
    
    lastTime = Date.now();
    main(); 
}

// main loop
function main() 
{
    var now = Date.now(); 
    var dt = (now - lastTime) / 1000; 
    
    lastTime = now; 
    requestAnimationFrame(main); 
    
    update(dt); 
    render(ctx);
}

function update(dt)
{
    boids[0].arrive(mouse);
    //boids[1].seek(mouse); 
    for(i=0; i<boids.length; i++)
    {
        //boids[i].arrive(mouse); 
        boids[i].update(dt); 
    }
}

function render(context)
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draw the circle for the target
    context.beginPath(); 
    context.strokeStyle = "#00FF00"; 
    context.arc(mouse.x, mouse.y, 5, 0, 2 * Math.PI); 
    context.stroke(); 
    
    for(i=0; i<boids.length; i++)
    {
        boids[i].render(context); 
    }
}

// Begin game
init();