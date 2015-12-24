// assets.js: load data into assets.bulletTypes, assets.shipTypes etc.

assets = {
    "bulletTypes":{
        "light bullet": {"speed":100, "damage":20}, 
        "plasma bomb":  {"speed":30, "damage":200}
    },
    "shipTypes":{
        "scout":{       "weapons":[ {"type":"light machine gun", "offsetX":0, "offsetY":0}], 
                        "modules":[]}, 
        "interceptor":{ "weapons":[ {"type":"light machine gun", "offsetX":0, "offsetY":0}, 
                                    {"type":"heavy machine gun", "offsetX":0, "offsetY":10}],
                        "modules":[]},
        "bomber":{      "weapons":[ {"type":"plasma bomb", "offsetX":0, "offsetY":0}], 
                        "modules":[]}
    },
    "weaponTypes":{
        "_comment":"Holds data for weapon modules",
        "light machine gun": {"bullet":"light bullet", "health":100, "radius":3, "cooldown":1, "turnspeed":1}, 
        "heavy machine gun": {"bullet":"light bullet", "health":200, "radius":5, "cooldown":0.75, "turnspeed":1}, 

        "bomb launcher": {"bullet":"plasma bomb", "health":200, "radius":5, "cooldown":4, "turnspeed":0.5, "minAngle":0, "maxAngle":1.57}
    },
}

/*
How to actually load assets from a server. 
var assets = {} 

b = new batchLoad(['bulletTypes', 'shipTypes'], '.json');
assets = b.result; // asynchronous: assets will not necessarily be assigned when we're done. 
*/ 