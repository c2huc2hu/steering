// ui.js

ui = {}; 

ui.states = {SELECT: "UISTATE SELECT", ACTION: "UISTATE ACTION", TARGET: "UISTATE TARGET"}; // these states correspond to subject, verb, object. 
ui.state = ui.states.SELECT; 

ui.mousestates = {RELEASED: "MOUSESTATE RELEASED", HELD: "MOUSESTATE HELD"}; 
ui.mousestate = ui.mousestates.RELEASED; 

ui.selected = []; 
ui.lastClickX = -1; 
ui.lastClickY = -1; 

// features to draw on the screen 
ui.selectBox = false;  // whether to draw the selection box 

ui.update = function(dt) {
    // handle state transitions, and things that happen when the state changes. 
    if (ui.state == ui.states.SELECT)
    {
        if (mouse.down)
        {
            ui.mousestate = ui.mousestates.HELD;    
            ui.selectBox = true; 
            ui.lastClickX = mouse.x; 
            ui.lastClickY = mouse.y; 
        }
        else if (!mouse.down)
        {
            if (keys[17]) // ctrl key
            {
                // unselect ships in the box
            }
            else if (keys[16]) // shift key 
            {
                // add ships to the selection
            }
            else
            {
                // select ships in the box 
            }
            ui.mousestate = ui.mousestates.RELEASED; 
            ui.selectBox = false; 
        }
    }
    
    // handle things that happen every tick on events 
}; 

ui.render = function(context) 
{
    if (ui.selectBox)
    {
        context.beginPath(); 
        context.strokeStyle = "#00BB00"; 
        context.drawRect(ui.lastClickX, ui.lastClickY, mouse.x - ui.lastClickX, mouse.y - ui.lastClickY); 
        context.stroke(); 
    }
}; 