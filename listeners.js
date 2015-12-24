// Listeners: handle mouse and keyboard events

// mouse listeners
window.onmousemove = function handleMouseMove(event)
{   
    mouse.x = event.x - canvas.offsetLeft + screenX; // note: doesn't take into account borders yet
    mouse.y = event.y - canvas.offsetTop + screenY; 
}

window.onmousedown = function handleMouseDown(event)
{
    mouse.clickX = event.x - canvas.offsetLeft + screenX;
    mouse.clickY = event.y - canvas.offsetTop + screenY; 
    mouse.down = true; 
}

window.onmouseup = function handleMouseUp(event)
{
    mouse.down = false;
    
    var selected = false;  // flag for if anything was selected
    
    if (ui.state == ui.states.ACTION)
    {
        //console.log("moving ships")
        var newDestination = {x:mouse.x, y:mouse.y}; 
        for(var i=0; i<ui.selected.length; i++)
        {
            ui.selected[i].setMoveState(Ship.moveStates.ARRIVE, newDestination); 
            ui.state = ui.states.SELECT; 
        }
        ui.selected = []; 
    }
    
    if (ui.state == ui.states.SELECT)
    {
        for(var i=0; i<ships.length;i++)
        {
            if(((mouse.x < ships[i].x) ^ (mouse.clickX < ships[i].x)) && ((mouse.y < ships[i].y) ^ (mouse.clickY < ships[i].y)))
            {
                selected = true; 
                ships[i].selected = true; 
                ui.selected.push(ships[i]); 
            }
        }
        if (selected)
        {
            ui.state = ui.states.ACTION; 
            //console.log("ships selected");
            //console.log(ui.selected);
        }
    }
    
    mouse.clickX = undefined; 
    mouse.clickY = undefined; 
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

mouse.render = function(context)
{
    // draw the selection box if possible.
    if (mouse.down) // and mouse is on screen
    {
        context.beginPath(); 
        context.strokeStyle = "#00AA00"; 
        context.rect(mouse.clickX - screenX, mouse.clickY - screenY, mouse.x - mouse.clickX, mouse.y - mouse.clickY); 
        context.stroke(); 
    }    
}

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