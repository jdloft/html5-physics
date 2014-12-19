// Math Utilities

function toDegrees (angle) {
  return angle * (180 / Math.PI);
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
    this.normal = function(){
        
    }
    this.print = function(n){
        return "(" + Number(parseFloat(this.x).toFixed(n)) + ", " + Number(parseFloat(this.y).toFixed(n)) + ")";
    }
}