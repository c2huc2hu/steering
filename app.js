// main.js

var lastTime = 0;
var frame = 0; // frame counter

var canvas; // main canvas for the game 
var ctx; // context for the game, so you can draw on this. 
var mouse = {x:0, y:0}; 

var boids = []; 

var initGraph = function() {};   //placeholders
var updateGraph = function() {}; 

function init()
{
    // Initialize boids
    boids.push(new DumbObject(10, 50, 100, 70), new DumbObject(10, 50, 100, 70)); 
    images = initImages(); 
    
    canvas = document.getElementById("canvas")
    canvas.style.backgroundColor = "#000000"
    ctx = canvas.getContext("2d");
    
    lastTime = Date.now();
    
    // initialize graph canvas
    graph = document.getElementById("graph"); 
    graph.style.backgroundColor = "#000000"
    graphctx = graph.getContext("2d");
    
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
    frame++; 
    
    updateGraph(); 
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