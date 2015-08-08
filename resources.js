// resources.js

var images; // canvas containing images 

function initImages()
{
    // Prepare the boid image (and others if I add them). Returns a canvas containing the images. 
    
    //var auxcanvas = document.createElement("canvas"); // use this instead to hide the auxiliary canvas
    var auxcanvas = document.getElementById("auxcanvas"); 
    var aux = auxcanvas.getContext("2d"); 
    aux.fillStyle="#FF0000";

    aux.moveTo(0, 0);
    aux.lineTo(30, 10);
    aux.lineTo(0, 20); 
    aux.lineTo(0, 0); 
    aux.fill();
    aux.stroke(); 
    aux.save(); 
    return auxcanvas; 
}
