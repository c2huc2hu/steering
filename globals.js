// globals.js: Global objects. I know that this is bad form, but passing objects through functions is a pain

// globals: 
var bullets = []; 
var ships = []; 

var bulletTypes = []; 
var shipTypes = []; 

/* Remove array[index] from the array in O(1) time. Messes up the order of the objects */ 
function remove(array, index)
{
    array[index] = array.pop(); 
}