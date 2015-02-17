// input.js

function Input(object){
	this.obj = object;
	this.rotation = 0;
	this.up = false;
	this.down = false;
	this.left = false;
	this.right = false;

	this.upKeys = ["87", "38"];
	this.downKeys = ["83", "40"];
	this.leftKeys = ["65", "37"];
	this.rightKeys = ["68", "39"];

	this.containedIn = function(v, array){
		for(var i = 0; i < array.length; i++){
			if(array[i] == v){
				return true;
			}
		}
		return false;
	}

	this.updateRotation = function(){
		this.rotation = this.obj.gravity.getRotation();
	}

	this.keyDown = function(e){
		if(this.containedIn(e.keyCode, this.upKeys)){
			this.up = true;

		} else if(this.containedIn(e.keyCode, this.downKeys)){
			this.down = true;
			
		} else if(this.containedIn(e.keyCode, this.leftKeys)){
			this.left = true;

		} else if(this.containedIn(e.keyCode, this.rightKeys)){
			this.right = true;
		}
	}

	this.keyUp = function(e){

	}

	this.handleEvent = function(e){

	}

	window.addEventListener
}