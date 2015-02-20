// General Scripting (done with API provided by other .js files)

var up = false;
var down = false;
var left = false;
var right = false;

var speed = 1100;
var jump = 5;

var title = "#title";

var can;
var ctx;
var mRoot;

var editingDimensions = false;

function keyDown(e){
    if(e.keyCode == "81"){ // Q Key
        if(mRoot.getPlayer().col.isColliding(mRoot.static_objects[mRoot.getPlayer().colIndex].col)){
			debug("[Main] Platform " + mRoot.static_objects[mRoot.getPlayer().colIndex].name + " removed");
            delete mRoot.static_objects.splice(mRoot.getPlayer().colIndex, 1);
        }
    }
    if(e.keyCode == "82"){ // R Key
        respawn(mRoot.getPlayer());
		debug("[Main] Player respawned");
    }
    
    if(e.keyCode == "69"){ // E Key
        if(!playerColliding){ mRoot.addStaticObject(mRoot.getPlayer().position.getX()-50, mRoot.getPlayer().position.getY()-mRoot.getPlayer().col.h, 100, 10) }
    }

    if(e.keyCode == "70"){ // F Key
        mRoot.getPlayer().reset();
    }
}

var playerColliding = false;
var timeAcc = 1;
var dTime = 0;
var timeBend = 0;
var physicsUpd = 1;
var rainbowBackgroundOn = false;

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

var renderID;
var renderTime = 0.0;
var physicsTime = 0.0;
var start = window.performance.now();

var pprev = window.performance.now();
var pcurr = window.performance.now();

var rprev = window.performance.now();
var rcurr = window.performance.now();

var alignCamToCenter = true;
var alignCamSpeed = 300;

function slowAlignCameraToObject (cam, obj, delta, speed){
    var camCenterX = (cam.w/2)-cam.xoff;
    var camCenterY = (cam.h/2)-cam.yoff;
    var objCenterX = obj.position.x+obj.col.w/2;
    var objCenterY = obj.position.y+obj.col.h/2;
    cam.offset((camCenterX-objCenterX)*(delta/speed), (camCenterY-objCenterY)*(delta/speed));
}

function slowAlignObjectToObject (obj1, obj2, delta, speed){
    var obj1CenterX = obj1.position.x+obj1.col.w/2;
    var obj1CenterY = obj1.position.y+obj1.col.h/2;
    var obj2CenterX = obj2.position.x+obj2.col.w/2;
    var obj2CenterY = obj2.position.y+obj2.col.h/2;
    var dist = Math.sqrt((obj2CenterX-obj1CenterX)^2+(obj2CenterY-obj1CenterY)^2);
    var distx = obj2CenterX-obj1CenterX;
    var disty = obj2CenterY-obj1CenterY;
    obj1.addPosition(distx*0.25*(speed*delta/1000), disty*0.25*(speed*delta/1000));
}

function limit(val, min, max){
    if(val <= min){
        return min;
    } else if(val >= max){
        return max;
    } else {
        return val;
    }
}

function updateRender(){
    // -------Timing----------
    rcurr = window.performance.now();
    renderTime = ((rcurr - rprev) - timeBend);

    document.getElementById("fps").textContent = (1000/renderTime).toFixed(0);
    document.getElementById("ups").textContent = (1000/physicsTime).toFixed(0);
    document.getElementById("pos").textContent = mRoot.getPlayer().getPosition().print(2);
    document.getElementById("vel").textContent = mRoot.getPlayer().getVelocity().print(2);
    document.getElementById("acc").textContent = mRoot.getPlayer().getAcceleration().print(2);

    if(playerColliding){
        document.getElementById("nameLabel").innerHTML = mRoot.static_objects[mRoot.getPlayer().colIndex].name;
        if(!editingDimensions){
            document.getElementById("widthControl").value = mRoot.static_objects[mRoot.getPlayer().colIndex].drawable.w;
            document.getElementById("heightControl").value = mRoot.static_objects[mRoot.getPlayer().colIndex].drawable.h;
        }
    } else {
        document.getElementById("nameLabel").innerHTML = "None";
        if(!editingDimensions){
            document.getElementById("widthControl").value = 0;
            document.getElementById("heightControl").value = 0;
        }
    }

    // -------Render----------
    mRoot.updateRender();
    
    // -------Respawn---------
    if(mRoot.getPlayer().position.getY() < -500){
		respawn(mRoot.getPlayer());
    }
    if(timeBend > 0){ sleep(timeBend) }

    if(mRoot.mRender.animationFrame){
        renderID = requestAnimationFrame(updateRender);
    }

    if(alignCamToCenter){
        slowAlignCameraToObject(mRoot.mRender.mCamera, mRoot.getPlayer(), physicsTime, alignCamSpeed);
    }

    slowAlignObjectToObject(mRoot.getInactiveObjectByName("follow1"), mRoot.getPlayer(), physicsTime, 800);
    slowAlignObjectToObject(mRoot.getInactiveObjectByName("follow2"), mRoot.getPlayer(), physicsTime, 600);
    slowAlignObjectToObject(mRoot.getInactiveObjectByName("follow3"), mRoot.getPlayer(), physicsTime, 400);
    slowAlignObjectToObject(mRoot.getInactiveObjectByName("follow4"), mRoot.getPlayer(), physicsTime, 200);
    slowAlignObjectToObject(mRoot.getInactiveObjectByName("follow5"), mRoot.getPlayer(), physicsTime, 100);
	
	var period = 1500;
	if(rainbowBackgroundOn){
		var color = "#"+hexNum(Math.floor((0.5*Math.sin((window.performance.now()%period*Math.PI*2)/period)+0.5)*255))+
				        hexNum(Math.floor((0.5*Math.sin((window.performance.now()%period*Math.PI*2)/period+(1/3)*period)+0.5)*255))+
					    hexNum(Math.floor((0.5*Math.sin((window.performance.now()%period*Math.PI*2)/period+(2/3)*period)+0.5)*255));
		mRoot.mRender.background = color;
	} else {
		mRoot.mRender.background = "#fff";
	}

    rprev = rcurr;
}

var physicsID;

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
}

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
	mInput = new Input(mRoot.getPlayer());
    mRoot.mRender.update();
    mRoot.getPlayer().drawable.color = "#00f"

    mRoot.addInactiveObject(300, 300, 18, 18, "follow1");
    mRoot.getInactiveObjectByName("follow1").drawable.color = "#0533eb";
    mRoot.addInactiveObject(300, 300, 16, 16, "follow2");
    mRoot.getInactiveObjectByName("follow2").drawable.color = "#0a66d7";
    mRoot.addInactiveObject(300, 300, 14, 14, "follow3");
    mRoot.getInactiveObjectByName("follow3").drawable.color = "#0f99c3";
    mRoot.addInactiveObject(300, 300, 12, 12, "follow4");
    mRoot.getInactiveObjectByName("follow4").drawable.color = "#14ccaf";
    mRoot.addInactiveObject(300, 300, 10, 10, "follow5");
    mRoot.getInactiveObjectByName("follow5").drawable.color = "#1aff9b";

    mRoot.getPlayer().gravity = new Vector(0, -13);
    mRoot.getPlayer().setPosition(300, 300);
    mRoot.getPlayer().mass = 50;
    mRoot.getPlayer().maxSpeed = new Vector(6, 1500);
	mRoot.getPlayer().friction = 0.93;
    $("#loadingSplash").remove();

    function resize(e){
        mRoot.mRender.w = window.innerWidth - $("#panel").width();
        mRoot.mRender.h = window.innerHeight;
        can.setAttribute("width", mRoot.mRender.w);
        can.setAttribute("height", mRoot.mRender.h);
        $(can).css("width", mRoot.mRender.w);
        $(can).css("height", mRoot.mRender.h);
        mRoot.mRender.update();
    }

    $(window).resize(resize);

    var tabActive = true;
    window.addEventListener("keydown", keyDown, false);
    window.addEventListener("blur", function(){
        if(tabActive){
            tabActive = false;
            clearInterval(physicsID);
            if(mRoot.mRender.animationFrame){
                cancelAnimationFrame(renderID);
            } else {
                clearInterval(renderID);
            }
        }
    }, false);
    window.addEventListener("focus", function(){
        if(!tabActive){
            tabActive = true;
            pprev = window.performance.now();
            physicsID = setInterval(function(){ updatePhysics(dTime) }, 0);
            if(mRoot.mRender.animationFrame){
                renderID = requestAnimationFrame(updateRender);
            } else {
                renderID = setInterval(updateRender, 0);
            }
        }
    }, false);

    renderID = setInterval(updateRender, 0);
    physicsID = setInterval(function(){ updatePhysics(dTime) }, 0);
	setTimeout(function(){$(title).animate({ top: "-242px" }, 300, function(){$(title).remove()})}, 1000);
});
