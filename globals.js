// globals.js: Global objects. I know that this is bad form, but passing objects through functions is a pain

// Display constants
var canvasWidth = 512; 
var canvasHeight = 512; 
var fieldWidth = 2048; 
var fieldHeight = 1024; 
var screenX = 0; // coordinates of the top left corner
var screenY = 0; 

// Global arrays
var bullets = []; 
var ships = []; 
var moduleQT = new QuadTree(0, 0, fieldWidth, fieldHeight, 10); // modules go here so I can check for collisions

var bulletTypes = []; 
var shipTypes = []; 


/* Remove array[index] from the array in O(1) time. Messes up the order of the objects */ 
function remove(array, index)
{
    array[index] = array.pop(); 
}