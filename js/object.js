// Object Utilities object.js

function StaticObject(inname, inx, iny, inw, inh){
	this.name = inname;
    this.col = new AABB(inx, iny, inw, inh);
    this.drawable = new Rect(inx, iny, inw, inh, "#000");
    this.position = new Vector(inx, iny);
    this.setPosition = function(inx, iny){
        this.position.x = inx;
        this.position.y = iny;
        this.col.setPosition(inx, iny);
        this.drawable.setPosition(inx, iny);
    }
    this.addPosition = function(inx, iny){
        this.position.x += inx;
        this.position.y += iny;
        this.col.x += inx;
        this.col.y += iny;
        this.drawable.x += inx;
        this.drawable.y += iny;
    }
    this.update = function(delta, scl){
        this.drawable.setPosition(this.position.getX()*scl, this.position.getY()*scl);
        this.drawable.setScale(this.col.w*scl, this.col.h*scl);
    }
    this.destroy = function(){
        
    }
}

function ActiveObject(inname, inx, iny, inw, inh){
	this.name = inname;
    this.col = new AABB(inx, iny, inw, inh);
    this.colIndex = 0;
    this.drawable = new Rect(inx, iny, inw, inh, "#000");

    this.friction = .96;
    this.bounciness = 0.3;
    this.mass = 1;
    this.maxSpeed = new Vector(4, 10);
    this.grounded = 0;
    this.walled = 0;
    this.position = new Vector(inx, iny);
    this.velocity = new Vector(0.0, 0.0);
    this.gravity = new Vector(0.0, 0.0);
    this.acceleration = new Vector(0.0, 0.0);

    this.setGravity = function(gx, gy){
        this.gravity.x = gx;
        this.gravity.y = gy;
        this.acceleration = this.gravity;
    }

    this.getVelocity = function(){
        return this.velocity;
    }
    this.setVelocity = function(inx, iny){
        this.velocity.x = inx;
        this.velocity.y = iny;
    }
    this.addVelocity = function(inx, iny){
        this.velocity.x += inx;
        this.velocity.y += iny;
    }

    this.getAcceleration = function(){
        return this.acceleration;
    }
    this.setAcceleration = function(inx, iny){
        this.acceleration.x = inx;
        this.acceleration.y = iny;
    }
    this.addAcceleration = function(inx, iny){
        this.acceleration.x += inx;
        this.acceleration.y += iny;
    }

    this.addForce = function(inx, iny){
        // F = ma | a = F/m
        this.acceleration.x += inx / this.mass;
        this.acceleration.y += iny / this.mass;
    }
    
    this.setGrounded = function(gr){
        this.grounded = gr;
    }
    this.setWalled = function(wd){
        this.walled = wd;
    }
    this.getPosition = function(){
        return this.position;
    }
    this.setPosition = function(inx, iny){
        this.position.set(inx, iny);
    }
    this.addPosition = function(inx, iny){
        this.position.add(inx, iny);
        this.col.position.add(inx, iny);
        this.drawable.position.add(inx, iny);
    }
    this.getX = function(){
        return this.x;
    }
    this.getY = function(){
        return this.y;
    }
    
    this.update = function(delta, scl){        
        delAcc = new Vector((this.acceleration.getX()+this.gravity.getX())*delta,
                            (this.acceleration.getY()+this.gravity.getY())*delta);
        this.velocity.add(delAcc);
        this.position.add(this.velocity);

        if(this.velocity.getX() > this.maxSpeed.getX()){
            this.velocity.x = ((this.velocity.getX() - this.maxSpeed.getX()) * 0.2) + this.maxSpeed.getX();
        } else if(this.velocity.x < -this.maxSpeed.getX()){
            this.velocity.x = -((this.velocity.getX() + this.maxSpeed.getX()) * 0.2) - this.maxSpeed.getX();
        }
        if(this.velocity.y > this.maxSpeed.getY()){
            this.velocity.y = ((this.velocity.getY() - this.maxSpeed.getY()) * 0.2) + this.maxSpeed.getY();
        } else if(this.velocity.y < -this.maxSpeed.getY()){
            this.velocity.y = -((this.velocity.getY() + this.maxSpeed.getY()) * 0.2) - this.maxSpeed.getY();
        }
        this.col.setPosition(this.position.getX(), this.position.getY());
        this.drawable.setPosition(this.position.getX()*scl, this.position.getY()*scl);
        this.drawable.setScale(this.col.w*scl, this.col.h*scl);
    }
    this.reset = function(){
        this.velocity.set(0, 0);
    }
}
