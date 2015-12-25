// app.js
var initGraph = function() {};    //placeholders for functions defined later
var updateGraph = function() {}; 

function init()
{    
    // Initialize ships for testing 
    ships.push(new Ship(250, 200, "scout")); 
    ships.push(new Ship(130, 150, "interceptor")); 
    ships.push(new Ship(200, 170, "bomber")); 
    
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

// Check for bullets hitting ships using the quadtree.
function checkCollisions()
{
    function refineCollision(module, bullet)
    {
        if (module.ship == bullet.source)
            return false; // reject. 
        return Math.pow(module.x - bullet.x, 2) + Math.pow(module.y - bullet.y, 2) < Math.pow(module.radius, 2); 
    }
    
    moduleQT = new QuadTree(0, 0, fieldWidth, fieldHeight, 10); 
    for (var i=0; i < ships.length; i++)
    {
        for (var j=0; j < ships[i].modules.length; j++)
        {
            moduleQT.insertCircle(ships[i].modules[j]); 
        }
    }
    
    for (var i=0; i < bullets.length; i++)
    {
        hitModule = moduleQT.query(bullets[i], refineCollision); 
        if (hitModule != null)
        {
            hitModule.takeDamage(bullets[i]); 
            bullets[i].deleteFlag = true; 
        }
    }
    
    // delete bullets
    for(var i=0; i < bullets.length - 1; i++)
    {
        if (bullets[i].deleteFlag)
        {
            bullets[i] = bullets.pop(); 
        }
    }
    if (bullets.length > 0 && bullets[bullets.length-1].deleteFlag)
    {
        bullets.pop(); 
    }
}

function update(dt)
{
    ships[2].seek(mouse);
    ships[1].modules[0].fire();
    
    //ships[1].arrive(mouse);
    
    for(var i = 0; i<ships.length; i++)
    {
        ships[i].update(dt); 
    }
    for(var i = 0; i<bullets.length;i++)
    {
        bullets[i].update(dt); 
    }
    
    checkCollisions();
    frame++; 
    
    updateGraph(); 
    keys.update(dt);
}

function render(context)
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    // render the bounding box
    context.beginPath(); 
    context.strokeStyle = "#00FF00"; 
    context.rect(-screenX, -screenY, fieldWidth, fieldHeight); 
    context.stroke(); 
    
    mouse.render(context); 
    
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