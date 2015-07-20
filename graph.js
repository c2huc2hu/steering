// graph.js: graph position, velocity and acceleration of the boids. 

var graph; 
var graphctx; 

// initialize the graph canvas
function initGraph()
{
    graph = document.getElementById("graph")
    graph.style.backgroundColor = "#000000"
    graphctx = graph.getContext("2d");
}

function updateGraph()
{
    graphctx.beginPath(); 
    graphctx.strokeStyle = "#FF0000"; // red for position
    graphctx.moveTo(frame % graph.width, Math.sqrt(boids[0].x*boids[0].x+boids[0].y*boids[0].y) / 10 - 1);
    graphctx.lineTo(frame % graph.width, Math.sqrt(boids[0].x*boids[0].x+boids[0].y*boids[0].y) / 10); 
    graphctx.stroke(); 
    
    graphctx.beginPath(); 
    graphctx.strokeStyle = "#00FF00"; // green for velocity
    graphctx.moveTo(frame % graph.width, Math.sqrt(boids[0].vx*boids[0].vx+boids[0].vy*boids[0].vy) / boids[0].maxSpeed * 100 + 149);
    graphctx.lineTo(frame % graph.width, Math.sqrt(boids[0].vx*boids[0].vx+boids[0].vy*boids[0].vy) / boids[0].maxSpeed * 100 + 150); 
    graphctx.stroke(); 
    
    graphctx.beginPath(); 
    graphctx.strokeStyle = "#0000FF"; // blue for acceleration
    graphctx.moveTo(frame % graph.width, Math.sqrt(boids[0].steerX*boids[0].steerX+boids[0].steerY*boids[0].steerY) / boids[0].maxForce * 100 + 299); 
    graphctx.lineTo(frame % graph.width, Math.sqrt(boids[0].steerX*boids[0].steerX+boids[0].steerY*boids[0].steerY) / boids[0].maxForce * 100 + 300); 
    graphctx.stroke(); 
}

