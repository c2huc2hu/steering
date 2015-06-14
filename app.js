// main.js

var lastTime = 0; 
var mainCtx; // context for the game, so you can draw on this. 

var boids = []; 

function init()
{
    // Initialize boids
    boids.push(new Boid(10, 50), new Boid(60, 30)); 
    images = initImages(); 
    mainCtx = document.getElementById("canvas").getContext("2d");
    
    lastTime = Date.now();
    main(); 
}

function main() 
{
    var now = Date.now(); 
    var dt = now - lastTime; 
    
    update(dt); 
    render(mainCtx);    
    
    lastTime = now; 
    requestAnimationFrame(main); 
}

function update(dt)
{
    for(i=0; i<boids.length; i++)
    {
        boids[i].update(dt); 
    }
}

function render(context)
{
    for(i=0; i<boids.length; i++)
    {
        boids[i].render(context); 
    }
}

// Begin game
init();