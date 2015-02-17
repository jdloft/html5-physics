// input.js

function containedIn(v, array){
	for(var i = 0; i < array.length; i++){
		if(array[i] == v){
			return true;
		}
	}
	return false;
}

function Input(object){
	var self = this;
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

	this.updateRotation = function(){
		this.rotation = this.obj.gravity.getRotation();
	}

	this.keyDown = function(e){
		if(containedIn(e.keyCode, self.upKeys)){
			this.up = true;
			console.log("Up key down");

		} else if(containedIn(e.keyCode, self.downKeys)){
			this.down = true;
			console.log("Down key down");
			
		} else if(containedIn(e.keyCode, self.leftKeys)){
			this.left = true;
			console.log("Left key down");

		} else if(containedIn(e.keyCode, self.rightKeys)){
			this.right = true;
			console.log("Right key down");
		}
	}

	this.keyUp = function(e){
		if(containedIn(e.keyCode, self.upKeys)){
			this.up = false;
			console.log("Up key up");
			
		} else if(containedIn(e.keyCode, self.downKeys)){
			this.down = false;
			console.log("Down key up");
			
		} else if(containedIn(e.keyCode, self.leftKeys)){
			this.left = false;
			console.log("Left key up");

		} else if(containedIn(e.keyCode, self.rightKeys)){
			this.right = false;
			console.log("Right key up");
		}
	}

	this.handleEvent = function(e){

	}

	window.addEventListener("keydown", this.keyDown, false);
	window.addEventListener("keyup", this.keyUp, false);
}