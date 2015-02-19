function timeAcceleration(val){
	timeAcc = val/100;
    document.getElementById("timeAccLabel").innerHTML = (val/100).toFixed(2);
	debug("[Controls] Set time acceleration to " + val);
}

function frameRate(val){
    timeBend = val;
    document.getElementById("frameRateLabel").innerHTML = val;
	debug("[Controls] Set frame delay to " + val);
}

function physicsUpdates(val){
    physicsUpd = val;
    document.getElementById("physicsUpdatesLabel").innerHTML = val;
	debug("[Controls] Set number of physics updates to " + val);
}

function zoom(val){
    mRoot.mRender.mCamera.zoom = (1/(val/100));
    document.getElementById("zoomLabel").innerHTML = "1:"+(1/(val/100)).toFixed(2);
	debug("[Controls] Set camera zoom to 1:" + (1/(val/100)).toFixed(2));
}

function zoomReset(){
    zoom(100);
    document.getElementById("zoomRange").value = 100;
	debug("[Controls] Reset camera zoom to 1:1.00");
}

function gravity(inx, iny){
	mRoot.getPlayer().gravity.x = inx/100;
	mRoot.getPlayer().gravity.y = iny/100;
	document.getElementById("gravityLabel").innerHTML = mRoot.getPlayer().gravity.print(2);
	// debug("[Controls] Set gravity to " + new Vector(inx, iny).print(2));
	
}

function gravSliders(){
	document.getElementById("gravityxRange").value = mRoot.getPlayer().gravity.x*100;
	document.getElementById("gravityyRange").value = mRoot.getPlayer().gravity.y*100;
	debug("[Controls] Updated gravity sliders");
}

function timeAccReset(){
    timeAcceleration(100);
    document.getElementById("timeAccRange").value = 100;
	debug("[Controls] Reset time acceleration to 1.00");
}

function frameRateReset(){
    frameRate(0);
    document.getElementById("frameRateRange").value = 0;
	debug("[Controls] Reset frame delay to 0");
}

function physicsUpdatesReset(){
    physicsUpdates(1);
    document.getElementById("physicsUpdatesRange").value = 1;
	debug("[Controls] Reset amount of physics updates to 1");
}

function updateWidth(val){
    if(playerColliding){
        mRoot.static_objects[mRoot.getPlayer().colIndex].setScale(Number(val), mRoot.static_objects[mRoot.getPlayer().colIndex].col.h);
		debug("[Controls] Changed width of " + mRoot.static_objects[mRoot.getPlayer().colIndex].name + " to " + val + " units");
    }
}

function updateHeight(val){
    if(playerColliding){
        mRoot.static_objects[mRoot.getPlayer().colIndex].setScale(mRoot.static_objects[mRoot.getPlayer().colIndex].col.w, Number(val));
		debug("[Controls] Changed height of " + mRoot.static_objects[mRoot.getPlayer().colIndex].name + " to " + val + " units");
    }
}

var nudgeAmount = 10;
function nudge(dir){
    if(playerColliding){
        if(dir == "up"){
            mRoot.static_objects[mRoot.getPlayer().colIndex].addPosition(0, nudgeAmount);
            mRoot.getPlayer().addPosition(0, nudgeAmount);
			debug("[Controls] Nudged platform " + mRoot.static_objects[mRoot.getPlayer().colIndex].name + " " + nudgeAmount + " units up");
        } else if(dir == "down"){
            mRoot.static_objects[mRoot.getPlayer().colIndex].addPosition(0, -nudgeAmount);
            mRoot.getPlayer().addPosition(0, -nudgeAmount);
			debug("[Controls] Nudged platform " + mRoot.static_objects[mRoot.getPlayer().colIndex].name + " " + nudgeAmount + " units down");
        } else if(dir == "left"){
            mRoot.static_objects[mRoot.getPlayer().colIndex].addPosition(-nudgeAmount, 0);
            mRoot.getPlayer().addPosition(-nudgeAmount, 0);
			debug("[Controls] Nudged platform " + mRoot.static_objects[mRoot.getPlayer().colIndex].name + " " + nudgeAmount + " units left");
        } else if(dir == "right"){
            mRoot.static_objects[mRoot.getPlayer().colIndex].addPosition(nudgeAmount, 0);
            mRoot.getPlayer().addPosition(nudgeAmount, 0);
			debug("[Controls] Nudged platform " + mRoot.static_objects[mRoot.getPlayer().colIndex].name + " " + nudgeAmount + " units right");
        }
    }
}

function swapRendering(val){
    if(mRoot.mRender.animationFrame && val == true){
        renderID = mRoot.mRender.toggleAnimationFrame(renderID, updateRender);
		debug("[Controls] Swapped rendering to setInterval");
    } else if(!mRoot.mRender.animationFrame && val == false){
        renderID = mRoot.mRender.toggleAnimationFrame(renderID, updateRender);
		debug("[Controls] Swapped rendering to requestAnimationFrame");
    }
}

function setCameraFollow(val){
    alignCamToCenter = val;
	if(val) debug("[Controls] Camera set to follow player")
	else debug("[Controls] Camera set not to follow player");
}

var cameraMoveAmount = 100;
function cameraMove(dir){
    if(dir == "up"){
        mRoot.mRender.mCamera.yoff += -cameraMoveAmount;
		debug("[Controls] Camera moved " + cameraMoveAmount + " units up");
    } else if(dir == "down"){
        mRoot.mRender.mCamera.yoff += cameraMoveAmount;
		debug("[Controls] Camera moved " + cameraMoveAmount + " units down");
    } else if(dir == "left"){
        mRoot.mRender.mCamera.xoff += cameraMoveAmount;
		debug("[Controls] Camera moved " + cameraMoveAmount + " units left");
    } else if(dir == "right"){
        mRoot.mRender.mCamera.xoff += -cameraMoveAmount;
		debug("[Controls] Camera moved " + cameraMoveAmount + " units right");
    }
}

var platformMoveAmount = 100;
function platformMoveUpdate(val){
    platformMoveAmount = val;
    document.getElementById("platformLabel").textContent = val;
	debug("[Controls] Platform move amount set to " + platformMoveAmount);
}

function selectLevel(levelName){
    for(var i = 0; i < levels.length; i++){
        if(levels[i].name == levelName){
            mRoot.loadLevel(levels[i]);
			debug("[Controls] Switching to level " + levelName);
        }
    }
}

function exportLevel(){
	debug("[Controls] Level Export");
    var levelString = '';
    levelString += '{\n';
    levelString += '\tname: "' + mRoot.active_level.name + '",\n';
    levelString += '\tdescription: "' + mRoot.active_level.description + '",\n';
    levelString += '\tspawn_point: [100, 100],\n';
    levelString += '\tstatic_objects: [\n';
    for(var i = 0; i < mRoot.static_objects.length; i++){
        var pl = mRoot.static_objects[i];
        if(mRoot.static_objects[i].name != "placeholder"){
            if(i == mRoot.static_objects.length-1){
                levelString += '\t\t{x: ' + pl.position.x + ', y: ' + pl.position.y + ', w: ' + pl.col.w + ', h: ' + pl.col.h + '}\n';
            } else {
                levelString += '\t\t{x: ' + pl.position.x + ', y: ' + pl.position.y + ', w: ' + pl.col.w + ', h: ' + pl.col.h + '},\n';
            }
        }
    }
    levelString += '\t]\n';
    levelString += '};';
    console.log(levelString);
}

function rainbowBackground(val){
	debug("[Controls] Rainbow background set to " + val);
	rainbowBackgroundOn = val;
}