// Math Utilities

function hexDigit(num){ // Number from 1-15 to single hex digit
	switch(num){
		case 0:
			var ret = 0;
			break;
		case 1:
			var ret = 1;
			break;
		case 2:
			var ret = 2;
			break;
		case 3:
			var ret = 3;
			break;
		case 4:
			var ret = 4;
			break;
		case 5:
			var ret = 5;
			break;
		case 6:
			var ret = 6;
			break;
		case 7:
			var ret = 7;
			break;
		case 8:
			var ret = 8;
			break;
		case 9:
			var ret = 9;
			break;
		case 10:
			var ret = "a";
			break;
		case 11:
			var ret = "b";
			break;
		case 12:
			var ret = "c";
			break;
		case 13:
			var ret = "d";
			break;
		case 14:
			var ret = "e";
			break;
		case 15:
			var ret = "f";
			break;
		default:
			debug("[Math] Out-of-range number " + num + " passed to hexDigit()");
			break;
	}
	if(typeof ret != "undefined"){
		return ret.toString();
	}
}

function hexNum(num){ // Number from 0-255 to hex character
	if(num%16 == 0){
		return hexDigit(Math.floor(num/16))+hexDigit(Math.floor(num/16));
	} else {
		return hexDigit(Math.floor(num/16))+hexDigit(num-Math.floor(num/16)*16);
	}
}

function toDegrees(angle) {
  return angle * (180 / Math.PI);
}

function roundTo(number, places){
    return Math.round(number*Math.pow(10, places))/Math.pow(10, places);
}

function Vector(inx, iny){
    this.x = inx;
    this.y = iny;
    this.set = function(inx, iny){
        this.x = inx;
        this.y = iny;
    }
    this.getX = function(){
        return this.x;
    }
    this.getY = function(){
        return this.y;
    }
    this.add = function(operand){
        this.x += operand.x;
        this.y += operand.y;
    }
    this.subtract = function(operand){
        this.x -= operand.x;
        this.y -= operand.y;
    }
    this.multiply = function(operand){
        this.x *= operand.x;
        this.y *= operand.y;
    }
    this.getMultiplied = function(operand){
        return new Vector(this.x*operand, this.y*operand);
    }
    this.divide = function(operand){
        this.x /= operand.x;
        this.y /= operand.y;
    }

    this.getNormalized = function(){
        var mag = Math.sqrt(this.x*this.x+this.y*this.y);
        return new Vector(this.x/mag, this.y/mag);
    }

    this.getMagnitude = function(){
        return Math.sqrt(this.x*this.x+this.y*this.y);
    }

    this.rotate = function(degrees){
        var mag = Math.sqrt(Math.pow(this.x, 2)+Math.pow(this.y, 2));
		if(mag > 0){
			var origAng = Math.asin(this.y/mag)*(180/Math.PI);
			this.x = roundTo(Math.cos((origAng+degrees)*(Math.PI/180))*mag, 8);
			this.y = roundTo(Math.sin((origAng+degrees)*(Math.PI/180))*mag, 8);
		}
    }

    this.getRotated = function(degrees){
        var mag = Math.sqrt(Math.pow(this.x, 2)+Math.pow(this.y, 2));
        var origAng = Math.asin(this.y/mag)*(180/Math.PI);
		if(mag > 0){
			return new Vector(roundTo(Math.cos((origAng+degrees)*(Math.PI/180))*mag, 8),
							  roundTo(Math.sin((origAng+degrees)*(Math.PI/180))*mag, 8));
		} else {
			return new Vector(0, 0);
		}
    }

    this.getRotation = function(){ // Function is always positive, negative means that there has been an error
		var mag = Math.sqrt(Math.pow(this.x, 2)+Math.pow(this.y, 2));
		if(mag > 0){
			var angle = Math.asin(this.y/mag)*(180/Math.PI);
			if(angle <= 0){
				angle = 360 + angle;
			}
			return angle;
		} else return -1;
    }

    this.print = function(n){
        return "(" + Number(parseFloat(this.x).toFixed(n)) + ", " + Number(parseFloat(this.y).toFixed(n)) + ")";
    }
}