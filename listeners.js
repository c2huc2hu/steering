// Listeners: handle mouse and keyboard events

// mouse listeners
window.onmousemove = function handleMouseMove(event)
{   
    mouse.x = event.x - canvas.offsetLeft + screenX; // note: doesn't take into account borders yet
    mouse.y = event.y - canvas.offsetTop + screenY; 
}

mouse.render = function(context)
{
    context.beginPath(); 
    context.strokeStyle = "#00FF00"; 
    context.arc(mouse.x - screenX, mouse.y - screenY, 5, 0, 2 * Math.PI); 
    context.moveTo(-screenX, -screenY); 
    context.stroke(); 
}
mouse.update = function(dt) {}; 

// key listeners
window.onkeydown = function(event)
{
    keys[event.keyCode] = true; 
    // block default actions for arrow keys and space
    if ([32, 37, 38, 39, 40].indexOf(event.keyCode) != -1) 
    {
        event.preventDefault(); 
    }
}

window.onkeyup = function(event)
{
    keys[event.keyCode] = false; 
}

keys.render = function(context) {}; 
keys.update = function(dt)
{
    var scrollSpd = 100; 
    if (keys[37] != keys[39])
    {
        if (keys[37])
        {
            screenX -= scrollSpd * dt; 
            mouse.x -= scrollSpd * dt; 
        }
        else if (keys[39])
        {
            screenX += scrollSpd * dt; 
            mouse.x += scrollSpd * dt; 
        }
    }
    if (keys[38] != keys[40])
    {
        if (keys[38])
        {
            screenY -= scrollSpd * dt;
            mouse.y -= scrollSpd * dt; 
        }
        else if (keys[40])
        {
            screenY += scrollSpd * dt; 
            mouse.y += scrollSpd * dt; 
        }
    } 
};