// assets.js: load data into assets.bulletTypes, assets.shipTypes etc.

assets = {
    "bulletTypes":{
        "light bullet": {"speed":100, "damage":20, "pierce":0.1}, 
        "plasma bomb":  {"speed":30, "damage":200, "pierce":1}
    },
    "shipTypes":{
        "scout":{       "maxSpeed":250, "maxForce":200, "turnSpeed":1, "health":60, "shield":50,
                        "weapons":[ {"type":"light machine gun", "offsetX":0, "offsetY":0, "dmgModifier":1}], 
                        "modules":[]}, 
        "interceptor":{ "maxSpeed":200, "maxForce":300, "turnSpeed":1.3, "health":130, "shield":100,
                        "weapons":[ {"type":"light machine gun", "offsetX":0, "offsetY":0, "dmgModifier":1}, 
                                    {"type":"heavy machine gun", "offsetX":0, "offsetY":10, "dmgModifier":1}],
                        "modules":[]},
        "bomber":{      "maxSpeed":150, "maxForce":200, "turnSpeed":0.6, "health":150, "shield":80, 
                        "weapons":[ {"type":"bomb launcher", "offsetX":0, "offsetY":0, "dmgModifier":1}], 
                        "modules":[]}
    },
    "weaponTypes":{
        "_comment":"Holds data for weapon modules",
        "light machine gun": {"bulletType":"light bullet", "health":100, "radius":3, "cooldown":1, "turnspeed":1.5, "minAngle":0, "maxAngle":6.29}, 
        "heavy machine gun": {"bulletType":"light bullet", "health":200, "radius":5, "cooldown":0.75, "turnspeed":1, "minAngle":0, "maxAngle":6.29}, 
        "bomb launcher": {"bulletType":"plasma bomb", "health":200, "radius":5, "cooldown":4, "turnspeed":0.5, "minAngle":0, "maxAngle":1.57} 
    },
}

/*
How to actually load assets from a server. 
var assets = {} 

b = new batchLoad(['bulletTypes', 'shipTypes'], '.json');
assets = b.result; // asynchronous: assets will not necessarily be assigned when we're done. 
*/ 