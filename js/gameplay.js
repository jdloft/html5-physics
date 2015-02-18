// Gameplay-based Utility Functions gameplay.js

function fiftyFifty(num1, num2){
	if(Math.random() > 0.5){
		return num1;
	} else {
		return num2;
	}
}

function randomizePlatforms(list){
    for(var i = 0; i < list.length; i++){
    	var randomx = Math.random()*platformMoveAmount;
    	var randomy = Math.random()*platformMoveAmount;
        list[i].addPosition(fiftyFifty(randomx, -randomx), fiftyFifty(randomy, -randomy));
    }
	debug("[Gameplay] Randomized platforms");
}

function respawn(inplayer){
    inplayer.setPosition(300, 300);
    inplayer.reset();
	debug("[Gameplay] Respawned player");
}

function supportPlayer(){ // This function appears vestigial?
	if(mRoot.getPlayer().gravity.getY() > 0){
		console.log("The player needs support from above!");
	} else if(mRoot.getPlayer().gravity.getY() < 0){
		console.log("The player needs support from below!");
	}
}
