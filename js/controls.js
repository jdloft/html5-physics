function timeAcceleration(val){
  timeAcc = val/100;
    document.getElementById("timeAccLabel").innerHTML = (val/100).toFixed(2);
}

function frameRate(val){
    timeBend = val;
    document.getElementById("frameRateLabel").innerHTML = val;
}

function physicsUpdates(val){
    physicsUpd = val;
    document.getElementById("physicsUpdatesLabel").innerHTML = val;
}

function zoom(val){
    mRoot.mRender.mCamera.zoom = (1/(val/100));
    document.getElementById("zoomLabel").innerHTML = "1:"+(1/(val/100)).toFixed(2);
}

function zoomReset(){
    zoom(100);
    document.getElementById("zoomRange").value = 100;
}

function gravity(inx, iny){
	mRoot.getPlayer().gravity.x = inx/100;
	mRoot.getPlayer().gravity.y = iny/100;
	document.getElementById("gravityLabel").innerHTML = mRoot.getPlayer().gravity.print(2);
}

function gravSliders(){
	document.getElementById("gravityxRange").value = mRoot.getPlayer().gravity.x*100;
	document.getElementById("gravityyRange").value = mRoot.getPlayer().gravity.y*100;
}

function timeAccReset(){
    timeAcceleration(100);
    document.getElementById("timeAccRange").value = 100;
}

function frameRateReset(){
    frameRate(0);
    document.getElementById("frameRateRange").value = 0;
}

function physicsUpdatesReset(){
    physicsUpdates(1);
    document.getElementById("physicsUpdatesRange").value = 1;
}

function updateWidth(val){
    if(playerColliding){
        mRoot.static_objects[mRoot.getPlayer().colIndex].setScale(Number(val), mRoot.static_objects[mRoot.getPlayer().colIndex].col.h);
    }
}

function updateHeight(val){
    if(playerColliding){
        mRoot.static_objects[mRoot.getPlayer().colIndex].setScale(mRoot.static_objects[mRoot.getPlayer().colIndex].col.w, Number(val));
    }
}

var nudgeAmount = 10;
function nudge(dir){
    if(playerColliding){
        if(dir == "up"){
            mRoot.static_objects[mRoot.getPlayer().colIndex].addPosition(0, nudgeAmount);
            mRoot.getPlayer().addPosition(0, nudgeAmount);
        } else if(dir == "down"){
            mRoot.static_objects[mRoot.getPlayer().colIndex].addPosition(0, -nudgeAmount);
            mRoot.getPlayer().addPosition(0, -nudgeAmount);
        } else if(dir == "left"){
            mRoot.static_objects[mRoot.getPlayer().colIndex].addPosition(-nudgeAmount, 0);
            mRoot.getPlayer().addPosition(-nudgeAmount, 0);
        } else if(dir == "right"){
            mRoot.static_objects[mRoot.getPlayer().colIndex].addPosition(nudgeAmount, 0);
            mRoot.getPlayer().addPosition(nudgeAmount, 0);
        }
    }
}

function swapRendering(val){
    if(mRoot.mRender.animationFrame && val == true){
        renderID = mRoot.mRender.toggleAnimationFrame(renderID, updateRender);
    } else if(!mRoot.mRender.animationFrame && val == false){
        renderID = mRoot.mRender.toggleAnimationFrame(renderID, updateRender);
    }
}

function setCameraFollow(val){
    alignCamToCenter = val;
}

var cameraMoveAmount = 100;
function cameraMove(dir){
    if(dir == "up"){
        mRoot.mRender.mCamera.yoff += -cameraMoveAmount;
    } else if(dir == "down"){
        mRoot.mRender.mCamera.yoff += cameraMoveAmount;
    } else if(dir == "left"){
        mRoot.mRender.mCamera.xoff += cameraMoveAmount;
    } else if(dir == "right"){
        mRoot.mRender.mCamera.xoff += -cameraMoveAmount;
    }
}

var platformMoveAmount = 100;
function platformMoveUpdate(val){
    platformMoveAmount = val;
    document.getElementById("platformLabel").textContent = val;
}