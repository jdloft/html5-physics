// Math Utilities

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
    this.divide = function(operand){
        this.x /= operand.x;
        this.y /= operand.y;
    }

    this.rotate = function(degrees){
        var mag = Math.sqrt(Math.pow(this.x, 2)+Math.pow(this.y, 2));
        var origAng = Math.asin(this.y/mag)*(180/Math.PI);
        this.x = roundTo(Math.cos((origAng+degrees)*(Math.PI/180))*mag, 8);
        this.y = roundTo(Math.sin((origAng+degrees)*(Math.PI/180))*mag, 8);
    }

    this.getRotated = function(degrees){
        var mag = Math.sqrt(Math.pow(this.x, 2)+Math.pow(this.y, 2));
        var origAng = Math.asin(this.y/mag)*(180/Math.PI);
        return new Vector(roundTo(Math.cos((origAng+degrees)*(Math.PI/180))*mag, 8),
                          roundTo(Math.sin((origAng+degrees)*(Math.PI/180))*mag, 8));
    }

    this.getRotation = function(){
        var angle = Math.asin(this.y/Math.sqrt(Math.pow(this.x, 2)+Math.pow(this.y, 2)))*(180/Math.PI);
        if(angle <= 0){
            angle = 360 + angle;
        }
        return angle;
    }

    this.print = function(n){
        return "(" + Number(parseFloat(this.x).toFixed(n)) + ", " + Number(parseFloat(this.y).toFixed(n)) + ")";
    }
}