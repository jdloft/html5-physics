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
			console.log("Up key down");
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
			console.log("Gravity Magnitude: " + self.obj.gravity.getMagnitude());
			if(self.obj.gravity.getMagnitude() != 0){ // If gravity is not zero-g, jump
				self.obj.addVelocityV2(self.obj.gravity.getNormalized().getRotated(180).getMultiplied(self.jump));
			} else { // If it is, jetpack time
				self.obj.addForce(0, self.speed);
			}
		} else if(containedIn(e.keyCode, self.downKeys) && !self.down){
			self.down = true;
			console.log("Down key down");
			self.obj.addForce(0, -self.speed);
			
		} else if(containedIn(e.keyCode, self.leftKeys) && !self.left){
			self.left = true;
			console.log("Left key down");
			self.obj.addForce(-self.speed, 0);

		} else if(containedIn(e.keyCode, self.rightKeys) && !self.right){
			self.right = true;
			console.log("Right key down");
			self.obj.addForce(self.speed, 0);
		}
	}

	this.keyUp = function(e){
		if(containedIn(e.keyCode, self.upKeys) && self.up){
			self.up = false;
			console.log("Up	key up");
			if(self.obj.gravity.getMagnitude() == 0){
				self.obj.addForce(0, -self.speed);
			}
			
		} else if(containedIn(e.keyCode, self.downKeys) && self.down){
			self.down = false;
			console.log("Down key up");
			self.obj.addForce(0, speed);
			
		} else if(containedIn(e.keyCode, self.leftKeys) && self.left){
			self.left = false;
			console.log("Left key up");
			self.obj.addForce(speed, 0);

		} else if(containedIn(e.keyCode, self.rightKeys) && self.right){
			self.right = false;
			console.log("Right key up");
			self.obj.addForce(-speed, 0);
		}
	}

	this.handleEvent = function(e){

	}

	window.addEventListener("keydown", this.keyDown, false);
	window.addEventListener("keyup", this.keyUp, false);
}