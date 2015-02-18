// input.js

function containedIn(v, array){
	for(var i = 0; i < array.length; i++){
		if(array[i] == v){
			return true;
		}
	}
	return false;
}

var direction = Object.freeze({up: 0, down: 1, left: 2, right: 3});

function Input(object){
	debug("[General] Input class created");
	var self = this;
	this.obj = object;
	this.jump = 5
	this.speed = 1100;
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
		if(containedIn(e.keyCode, self.upKeys) && !self.up){
			self.up = true;
			debug("[Input] Up key down");
			/* if(self.obj.grounded == 1){
				self.obj.setGrounded(2);
				self.obj.addVelocityV2(self.obj.gravity.getNormalized().getRotated(180).getMultiplied(self.jump));
				console.log(self.obj.gravity.getNormalized().getRotated9)
			} else if(self.obj.grounded == 2){
				self.obj.setGrounded(0);
				self.obj.addVelocityV2(self.obj.gravity.getNormalized().getRotated(180).getMultiplied(self.jump));
			}
			if(self.obj.walled != 0){
				self.obj.setGrounded();
			} */
			if(self.obj.gravity.getMagnitude() != 0){ // If gravity is not zero-g, jump
				self.obj.addVelocityV2(self.obj.gravity.getNormalized().getRotated(180).getMultiplied(self.jump));
			} else { // If it is, jetpack time
				self.obj.addForce(0, self.speed);
			}
		} else if(containedIn(e.keyCode, self.downKeys) && !self.down){
			self.down = true;
			debug("[Input] Down key down");
			self.obj.addForce(0, -self.speed);
			
		} else if(containedIn(e.keyCode, self.leftKeys) && !self.left){
			self.left = true;
			debug("[Input] Left key down");
			self.obj.addForce(-self.speed, 0);

		} else if(containedIn(e.keyCode, self.rightKeys) && !self.right){
			self.right = true;
			debug("[Input] Right key down");
			self.obj.addForce(self.speed, 0);
		}
	}

	this.keyUp = function(e){
		if(containedIn(e.keyCode, self.upKeys) && self.up){
			self.up = false;
			debug("[Input] Up key up");
			if(self.obj.gravity.getMagnitude() == 0){
				self.obj.addForce(0, -self.speed);
			}
			
		} else if(containedIn(e.keyCode, self.downKeys) && self.down){
			self.down = false;
			debug("[Input] Down key up");
			self.obj.addForce(0, speed);
			
		} else if(containedIn(e.keyCode, self.leftKeys) && self.left){
			self.left = false;
			debug("[Input] Left key up");
			self.obj.addForce(speed, 0);

		} else if(containedIn(e.keyCode, self.rightKeys) && self.right){
			self.right = false;
			debug("[Input] Right key up");
			self.obj.addForce(-speed, 0);
		}
	}

	this.addKey = function(dir, key){
		switch(dir){
			case direction.up:
				if(!containedIn(key, this.upKeys)){
					this.upKeys.push(key);
					debug("[Input] " + key + " key added to upKeys");
					break;
				}
				break;
			case direction.down:
				if(!containedIn(key, this.downKeys)){
					this.downKeys.push(key);
					debug("[Input] " + key + " key added to downKeys");
					break;
				}
				break;
			case direction.left:
				if(!containedIn(key, this.leftKeys)){
					this.leftKeys.push(key);
					debug("[Input] " + key + " key added to leftKeys");
					break;
				}
				break;
			case direction.right:
				if(!containedIn(key, this.rightKeys)){
					this.rightKeys.push(key);
					debug("[Input] " + key + " key added to rightKeys");
					break;
				}
				break;
		}
	}
	
	this.removeKey = function(dir, key){
		switch(dir){
			case direction.up:
				for(var i = 0; i < this.upKeys.length; i++){
					if(this.upKeys[i] == key){
						this.upKeys.splice(i, 1);
						debug("[Input] " + key + " key removed from upKeys");
					}
				}
				break;
			case direction.down:
				for(var i = 0; i < this.downKeys.length; i++){
					if(this.downKeys[i] == key){
						this.downKeys.splice(i, 1);
						debug("[Input] " + key + " key removed from downKeys");
					}
				}
				break;
			case direction.left:
				for(var i = 0; i < this.leftKeys.length; i++){
					if(this.leftKeys[i] == key){
						this.leftKeys.splice(i, 1);
						debug("[Input] " + key + " key removed from leftKeys");
					}
				}
				break;
			case direction.right:
				for(var i = 0; i < this.rightKeys.length; i++){
					if(this.rightKeys[i] == key){
						this.rightKeys.splice(i, 1);
						debug("[Input] " + key + " key removed from rightKeys");
					}
				}
				break;
		}
	}

	window.addEventListener("keydown", this.keyDown, false);
	window.addEventListener("keyup", this.keyUp, false);
}