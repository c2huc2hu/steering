// ui.js

ui = {}; 

ui.states = {SELECT: "UISTATE SELECT", ACTION: "UISTATE ACTION", TARGET: "UISTATE TARGET"}; // these states correspond to subject, verb, object. 
ui.state = ui.states.SELECT

ui.selected = []; 

ui.update = function(dt) {}; 

ui.render = function(context) {}; 