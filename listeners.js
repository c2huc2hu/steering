// Listeners: handle mouse and keyboard events

function initListeners()
{
    document.onmousemove = handleMouseMove; 
}

function handleMouseMove(event)
{
    
    mouse.x = event.x - canvas.offsetLeft; // note: doesn't take into account borders yet
    mouse.y = event.y - canvas.offsetTop; 
}

initListeners(); 