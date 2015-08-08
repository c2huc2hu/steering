// app.js

var lastTime = 0;
var frame = 0; // frame counter

var canvas; // main canvas for the game 
var ctx; // context for the game, so you can draw on this. 
var mouse = {x:0, y:0}; 

var initGraph = function() {};   //placeholders for functions defined later
var updateGraph = function() {}; 

function init()
{    
    // initialize the types of bullets. in the future, this will probably go elsewhere
    bulletTypes.push(new Bullet(0, 0, 500)); 

    // Initialize ships
    ships.push(new Ship(10, 50, 100, 70, 1))
    ships.push(new Ship(30, 50, 100, 70, 1)); 
    ships[1].addWeaponModule(5, 5, bulletTypes[0], 500);
    ships[1].modules[0].aim(ships[0]); 
    ships[1].addModule("engine module", 5, -5);
    ships[0].addModule("engine module", 5, -5);
    
    ships[0].vx = 100
    
    //images = initImages(); 
    
    canvas = document.getElementById("canvas")
    canvas.width = canvasWidth; 
    canvas.height = canvasHeight;
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
    //ships[0].seek(mouse);
    ships[1].modules[0].fire();
    ships[1].arrive(mouse);
    
    for(var i = 0; i<ships.length; i++)
    {
        ships[i].update(dt); 
    }
    for(var i = 0; i<bullets.length;i++)
    {
        bullets[i].update(dt); 
    }
    
    frame++; 
    
    updateGraph(); 
}

function render(context)
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    // render the mouse
    context.beginPath(); 
    context.strokeStyle = "#00FF00"; 
    context.arc(mouse.x, mouse.y, 5, 0, 2 * Math.PI); 
    context.stroke(); 
    
    for(var i = 0; i<ships.length; i++)
    {
        ships[i].render(context); 
    }
    for(var i = 0; i<bullets.length; i++)
    {
        bullets[i].render(context); 
    }
}

// Begin game
init();
