// General Scripting (done with API provided by other .js files)

status = "status";


var up = false;
var down = false;
var left = false;
var right = false;

var speed = 1100;
var jump = 5;

var gameStarted = false;
var title = "#title";

var can;
var ctx;
var mRoot;

$(document).ready(function(){
    var width = window.innerWidth - $("#panel").width();
    var height = window.innerHeight;

    can = document.getElementById("canvas");
    ctx = can.getContext("2d");
    
    can.setAttribute("width", width);
    can.setAttribute("height", height);
    $(can).css("width", width);
    $(can).css("height", height);

    mRoot = new Root("canvas", width, height);

    mRoot.addStaticObject(0, 50, 500, 10);
    mRoot.addStaticObject(0, 200, 400, 10);
    mRoot.addStaticObject(100, 100, 500, 10);
    mRoot.addStaticObject(800, 300, 70, 10);
    mRoot.addStaticObject(0, 40, 10, 8000);
    mRoot.addStaticObject(30, 0, 10, 800);
    mRoot.addStaticObject(400, 500, 800, 10);

    mRoot.getPlayer().gravity = new Vector(0, -13);
    mRoot.getPlayer().setPosition(300, 300);
    mRoot.getPlayer().mass = 50;
    mRoot.getPlayer().maxSpeed = new Vector(12, 1500);
    $("#loadingSplash").remove();
});

function keyDown(e){
	if(e.keyCode == "81"){
		delete mRoot.static_objects.splice(mRoot.getPlayer().getColliding(), 1);
	}
	if(gameStarted == false){
		$(title).animate({ top: "-242px" }, 300, function(){$(title).remove()});
		gameStarted = true;
	}
	if(e.keyCode == "82"){
		respawn(mRoot.getPlayer());
	}
	
	if(e.keyCode == "69"){
		if(!playerColliding){ mRoot.addStaticObject(mRoot.getPlayer().position.getX()-50, mRoot.getPlayer().position.getY()-30, 100, 10) }
	}

    if((e.keyCode == "87" || e.keyCode == "38") && up == false){ // Up Key
        up = true;
        if(mRoot.getPlayer().grounded == 1){
            mRoot.getPlayer().setGrounded(2);
            mRoot.getPlayer().addVelocity(0, jump);
        } else if(mRoot.getPlayer().grounded == 2){
            mRoot.getPlayer().setGrounded(0);
            mRoot.getPlayer().addVelocity(0, jump);
        }
        
        if(mRoot.getPlayer().walled != 0){
            mRoot.getPlayer().setGrounded();
        }
    }
    if((e.keyCode == "83" || e.keyCode == "40") && down == false){ // Down Key
        down = true;
        mRoot.getPlayer().addForce(0, -speed);
    }
    if((e.keyCode == "65" || e.keyCode == "37") && left == false){ // Left Key
        left = true;
        mRoot.getPlayer().addForce(-speed, 0);
    }
    if((e.keyCode == "68" || e.keyCode == "39") && right == false){ // Right Key
        right = true;
        mRoot.getPlayer().addForce(speed, 0);
    }
}

function keyUp(e){
    if((e.keyCode == "87" || e.keyCode == "38") && up == true){ // Up Key
        up = false;
    }
    if((e.keyCode == "83" || e.keyCode == "40") && down == true){ // Down Key
        down = false;
        mRoot.getPlayer().addForce(0, speed);
    }
    if((e.keyCode == "65" || e.keyCode == "37") && left == true){ // Left Key
        left = false;
        mRoot.getPlayer().addForce(speed, 0);
    }
    if((e.keyCode == "68" || e.keyCode == "39") && right == true){ // Right Key
        right = false;
        mRoot.getPlayer().addForce(-speed, 0);
    }
}

window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);

var playerColliding = false;
var timeAcc = 1;
var dTime = 0;
var timeBend = 0;
var physicsUpd = 1;

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

var renderTime = 0.0;
var physicsTime = 0.0;
var start = window.performance.now();

var pprev = window.performance.now();
var pcurr = window.performance.now();

var rprev = window.performance.now();
var rcurr = window.performance.now();

function updateRender(){
    // -------Timing----------
    rcurr = window.performance.now();
    renderTime = ((rcurr - rprev) - timeBend);

    document.getElementById(status).innerHTML = "FPS: " + Number((1000/renderTime).toFixed(0)) + "<br>" +
                     "UPS: " + Number((1000/physicsTime).toFixed(0)) + "<br>" + 
                     "Position: " + mRoot.getPlayer().getPosition().print(2) + "<br>" +
                     "Velocity: " + mRoot.getPlayer().getVelocity().print(2) + "<br>" +
                     "Acceleration: " + mRoot.getPlayer().getAcceleration().print(2);

    // -------Render----------
    mRoot.updateRender();
    
    // -------Respawn---------
    if(mRoot.getPlayer().position.getY() < -500){
        mRoot.getPlayer().setPosition(300, 300);
        mRoot.getPlayer().reset();
    }
    if(timeBend > 0){ sleep(timeBend) }

    requestAnimationFrame(updateRender);
    rprev = rcurr;
}

requestAnimationFrame(updateRender);

function updatePhysics(time){
    pcurr = window.performance.now();
	    // -------Physics---------
    for(var i = physicsUpd; i > 0; i--){
        mRoot.updatePhysics(physicsTime/timeAcc);
        physicsTime = Math.abs((pcurr - pprev) - timeBend);
        pprev = pcurr;
    }

    for(var i = 0; i < mRoot.static_objects.length; i++){
        if(mRoot.getPlayer().col.isColliding(mRoot.static_objects[i].col)){ playerColliding = true; break; } else { playerColliding = false }
    }
    if(playerColliding){
        mRoot.getPlayer().drawable.color = "#f00";
    } else {
        mRoot.getPlayer().drawable.color = "#0f0";
    }
}

var physics = setInterval(function(){ updatePhysics(dTime) }, 1);
