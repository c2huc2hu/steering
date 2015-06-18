// main.js

var lastTime = 0; 

var canvas; // main canvas for the game 
var ctx; // context for the game, so you can draw on this. 
var mousex = 0;
var mousey = 0;

var boids = []; 

function init()
{
    // Initialize boids
    boids.push(new DumbObject(10, 50, 5, 100), new DumbObject(60, 30, 5, 100)); 
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
    for(i=0; i<boids.length; i++)
    {
        boids[i].steer(mousex - boids[i].x, mousey - boids[i].y); 
        boids[i].update(dt); 
    }
}

function render(context)
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draw the circle for the target
    context.beginPath(); 
    context.strokeStyle = "#00FF00"; 
    context.arc(mousex, mousey, 5, 0, 2 * Math.PI); 
    context.stroke(); 
    
    for(i=0; i<boids.length; i++)
    {
        boids[i].render(context); 
    }
}

// Begin game
init();