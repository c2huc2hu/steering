// My implementation of a Quad Tree for collision detection: https://en.wikipedia.org/wiki/Quadtree
// The tree stores bounding rectangles (i.e. the size of ships), and queries points (assumes that projectiles are point objects)
// It assumes integer rectangle sizes, so you may end up with some nodes larger than others. 

var QuadTree = function(left, top, right, bottom, nodeCapacity)
{
    this.nodeCapacity = nodeCapacity; // the maximum number of objects at a given node. 
    this.root = new QuadTree.Node(left, top, right, bottom); 
}

QuadTree.TOP_LEFT = 0; 
QuadTree.TOP_RIGHT = 1; 
QuadTree.BOTTOM_LEFT = 2; 
QuadTree.BOTTOM_RIGHT = 3; 

/* 
    Insert an object into the tree. 
    
    Parameters
    object: the object to be inserted. It must have a bounding rectangle with the parameters left, top, right, bottom. Assume that right > top and bottom > top.
*/ 
QuadTree.prototype.insert = function(object)
{
    var curNode = this.root; 
    if (object.left < curNode.left || object.right > curNode.right || object.top < curNode.top || object.bottom > curNode.bottom) 
        throw "New object's bounding box is too large"
    
    while(true)
    {
        var middleX = (curNode.left + curNode.right) / 2; 
        var middleY = (curNode.top + curNode.bottom) / 2; 
        
        // if the new object doesn't fit into the children, we've found the right node. 
        if ((object.left < middleX && middleX < object.right) || (object.top < middleY && middleY < object.bottom))
        {
            curNode.leaves.push(object); 
            break; 
        }
        
        // if the current node is a leaf, stop here too. 
        if (curNode.children == null)
        {
            curNode.leaves.push(object); 
            break; 
        }
        
        // otherwise, move to the appropriate child
        var newNode = 0; 
        if (object.left >= middleX)
            newNode += 1; 
        if (object.top >= middleY)
            newNode += 2; 
        curNode = curNode.children[newNode]; 
    }
    
    // subdivide node if necessary. Note: if this node already has children, we know that we've already tried to subdivide it
    if (curNode.children == null && curNode.leaves.length >= this.nodeCapacity)
    {
        this.subdivide(curNode); 
    }
}

/* 
    Since my ships will be represented by circles instead of rectangles, convert the circle to a rectangle 
    circle must have: radius, x, y
    (this is a non-standard function for quad trees, but I need it)
*/ 
QuadTree.prototype.insertCircle = function(circle)
{
    circle.top = circle.y - circle.radius; 
    circle.bottom = circle.y + circle.radius; 
    circle.left = circle.x - circle.radius; 
    circle.right = circle.x + circle.radius; 
    this.insert(circle); 
}

QuadTree.prototype.subdivide = function(node)
{
    var middleX = (node.left + node.right) / 2; 
    var middleY = (node.bottom + node.top) / 2; 
    
    node.children = [new QuadTree.Node(node.left, node.top, middleX, middleY), new QuadTree.Node(middleX, node.top, node.right, middleY), 
                new QuadTree.Node(node.left, middleY, middleX, node.bottom), new QuadTree.Node(middleX, middleY, node.right, node.bottom)]; 

    var oldLeaves = []; 
    while(node.leaves.length > 0)
    {
        var curObj = node.leaves.pop();
        // if the current object doesn't fit into the children, put it into "oldLeaves"
        if ((curObj.left < middleX && middleX < curObj.right) || (curObj.top < middleY && middleY < curObj.bottom))
        {
            oldLeaves.push(curObj); 
        } 
        else // put the object into the correct child
        {
            var newNode = 0; 
            if (curObj.left >= middleX)
                newNode += 1; 
            if (curObj.top >= middleY)
                newNode += 2; 
            node.children[newNode].leaves.push(curObj); 
        }
    }
    node.leaves = oldLeaves; 
}

/* 
Check if there's a bounding box that includes point.x, point.y
If there is, return the object with that bounding box. Otherwise return null. If there are multiple boxes that contain it, it will return the largest, and then the first added. 

    point: an object with x, y. This is the point that will be checked
    refinementFunction (optional): a function that takes as arguments: candidate objects and the point and returns whether to accept the candidate object. 
            This can be used for refined collision detection or preventing a projectile from hitting its source. 
 */ 
QuadTree.prototype.query = function(point, refinementFunction)
{
    var curNode = this.root; 
    
    while(true)
    {
        // check the current node first
        for (var i=0; i < curNode.leaves.length; i++)
            if (curNode.leaves[i].left < point.x && point.x < curNode.leaves[i].right && curNode.leaves[i].top < point.y && point.y < curNode.leaves[i].bottom)
                if(refinementFunction(curNode.leaves[i], point)) // if refinementFunction returns true, return the object. 
                    return curNode.leaves[i]; 
        
        // return false if this is a leaf node. 
        if (curNode.children == null)
            return null; 
        
        // otherwise go to the appropriate child node 
        var newNode = 0; 
        if (point.x >= (curNode.left + curNode.right) / 2)
            newNode += 1; 
        if (point.y >= (curNode.top + curNode.bottom) / 2)
            newNode += 2; 
        curNode = curNode.children[newNode]
    }
}

/*
Return an array of all objects within rectangle. If they are on the line, they count. 
Parameters: 
rectangle: must have top <= bottom, left <= right. 
*/ 
/*QuadTree.prototype.queryRect = function(rectangle)
{
    function getAllChildren(node)
    {
        if  (node.children == undefined)
            return node.leaves; 
        else
            return node.leaves.concat(getAllChildren(node.children[0])).concat(getAllChildren(node.children[1])).concact(getAllChildren(node.children[2])).concat(getAllChildren(node.children[3])); 
    }
    
    function getContainedChildren (node, rectangle)
    {
        var result = []; 
        for (var i=0; i < node.leaves.length; i++)
        {
            if (rectangle.right > node.leaves[i].left && rectangle.left  ) // TODO: Work on this
                throw "Finish this"
        }
    }
    
    
    var result = []; 
    var curNode = 
} */ 

QuadTree.Node = function(left, top, right, bottom)
{
    this.leaves = []; // objects that have not been put into any of the children (either because they don't fit or because this hasn't been subdivided yet)
    children = null; 
    
    this.left = left; 
    this.right = right; 
    this.top = top; 
    this.bottom = bottom; 
}