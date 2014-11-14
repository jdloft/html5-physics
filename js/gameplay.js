// Gameplay-based Utility Functions gameplay.js

function randomizePlatforms(list){
    for(var i = 0; i < list.length; i++){
        list[i].setPosition(Math.round(Math.random()*1000, 0), Math.round(Math.random()*500, 0));
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
