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
        list[i].addPosition(fiftyFifty(Math.round(Math.random()*100+(Math.random()*10)),
        -Math.round(Math.random()*100+(Math.random()*10))));
    }
}

function respawn(inplayer){
    inplayer.setPosition(300, 300);
    inplayer.reset();
}

function supportPlayer(){
	if(mRoot.getPlayer().gravity.getY() > 0){
		console.log("The player needs support from above!");
	} else if(mRoot.getPlayer().gravity.getY() < 0){
		console.log("The player needs support from below!");
	}
}
