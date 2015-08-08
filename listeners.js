// Listeners: handle mouse and keyboard events

// mouse listeners
document.onmousemove = function handleMouseMove(event)
{   
    mouse.x = event.x - canvas.offsetLeft + screenX; // note: doesn't take into account borders yet
    mouse.y = event.y - canvas.offsetTop + screenY; 
}

// key listeners
window.onkeydown = function(event)
{
    switch(event.keyCode)
    {
        case (37): // left arrow
            screenX -= 3; 
            break;
        case (38): // up arrow
            screenY -= 3; 
            break; 
        case (39): // right arrow
            screenX += 3; 
            break; 
        case (40): // down arrow
            screenY += 3; 
            break; 
    }
    
    // block default actions:
    if ([32, 37, 38, 39, 40].indexOf(event.keyCode) != -1) 
    {
        event.preventDefault(); 
    }
}