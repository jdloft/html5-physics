// debug.js

var Debug = true;

function debug(text){
    if(Debug){ console.log(window.performance.now().toFixed(0) + " " + text) }
}
