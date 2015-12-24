// function for loading assets
// note: to make json files work locally, I need to start a local server in the root of this project: python -m SimpleHTTPServer
// then, use localhost:8000 as root. 

// this function makes the request. do not use it. 
function _requestJSON(url, callback, targetArray)
{
    function _callback(response, targetArray) 
    {
        for (var i in response) 
            targetArray.push(response[i]); 
    }
    
    var request = new XMLHttpRequest(); 
    request.overrideMimeType("application/json");
    request.open('GET', url); 
    
    request.onreadystatechange = function () {
        console.log("json file loaded, state changed")
        if (request.readyState == 4 && request.status == "200") 
        {
            callback(JSON.parse(request.responseText), targetArray); 
        }
    }
    request.send(); 
}

function loadJSON(url, targetArray)
{
    _requestJSON(url, function(response, targetArray) {
        for (var i in response) targetArray.push(response[i]); },
      targetArray); 
}