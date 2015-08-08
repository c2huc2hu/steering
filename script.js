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

aux.fillRect(0, 0, 400, 400);
aux.rotate(1); 
aux.moveTo(0, 0);
aux.lineTo(30, 10);
aux.lineTo(0, 20); 
aux.lineTo(0, 0); 
aux.fill();
aux.stroke(); 




var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.drawImage(auxcanvas, 0, 0);
ctx.drawImage(auxcanvas, 50, 30); 
ctx.drawImage(auxcanvas, 150, 230); 