// time a procedure 

function timeit(procedure, n) { 
    var t = Date.now(); 
    for (i=0;i<n;i++) { 
        procedure(); 
    } 
    return Date.now() - t; 
}; 