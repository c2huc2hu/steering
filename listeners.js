// Listeners: handle mouse and keyboard events

function initListeners()
{
    document.onmousemove = handleMouseMove; 
}

function handleMouseMove(event)
{
    
    mousex = event.x - canvas.offsetLeft; // note: doesn't take into account borders yet
    mousey = event.y - canvas.offsetTop; 
}

initListeners(); 