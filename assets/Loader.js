var Loader = function(filename, ending)
{
    this.filename = filename; 
    this.ending = ending; 
    
    this.request = new XMLHttpRequest(); 
    this.request.overrideMimeType("application/json");
    this.request.open('GET', filename + ending); 
    this.request.parent = this; 
    
    this.request.send(); 
}

/**
    Method to load a bunch of files. It calls whileLoading for however long it takes to load things. 
    When it is finished, this.result contains the result, note that this hasn't necessarily happened 
    by the time we exit
    
    e.g. batchLoad(["array", "dictionary"], ".json") 
        batchLoad.array = [2,45,7]; // contents of array.json 
        batchLoad.dictionary = {2:53, 42:415} // contents of dictionary.json 
*/ 
var batchLoad = function(filenames, ending)
{
    var progress = 0; // number of files loaded 
    this.result = Object(); 
    var interval = setInterval(whileLoading, 100); 
    
    function whenLoaded(e)
    {
        progress += 1; 
        result[e.target.parent.filename] = e.target.responseText; 
        e.target.removeEventListener("load"); 
        console.log(e.target, e.target.response);
        
        if (progress == filenames.length - 1)
        {
            clearInterval(interval); 
            //return result; 
        }
    }
    
    for(var i = 0; i < filenames.length; i++)
    {
        var l = new Loader(filenames[i], ending); 
        l.request.addEventListener("load", whenLoaded); 
    }
    
    function whileLoading() 
    {
        console.log("Loading.... "); 
    }
}

// usage: b = new batchLoad(['bullets', 'ships'], '.json');