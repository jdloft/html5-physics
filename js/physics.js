// Physics Utilities/Engine File

function AABB(inx, iny, width, height){
    this.collision = true;
    this.x = inx;
    this.y = iny;
    this.w = width;
    this.h = height;
    this.min = new Vector(inx, iny);
    this.max = new Vector(inx+width, iny+height);

    this.setPosition = function(inx, iny){
        this.x = inx;
        this.y = iny;
        this.min.x = inx;
        this.min.y = iny;
        this.max.x = inx+this.w;
        this.max.y = iny+this.h;
    }
    this.setMin = function(inx, iny){
        this.min.x = inx;
        this.min.y = iny;
        this.max.x = inx + this.w;
        this.max.y = iny + this.h;
    }
    this.setMax = function(inx, iny){
        this.max.x = inx;
        this.max.y = iny;
        this.min.x = inx - this.w;
        this.min.y = iny - this.h;
    }
    this.getMin = function(){
        this.min.set(this.x, this.y);
        return this.min;
    }
    this.getMax = function(){
        this.max.set(this.x+this.w, this.y+this.h);
        return this.max;
    }
    this.isColliding = function(other){
        if( this.getMax().getX() < other.getMin().getX() ||
            this.getMax().getY() < other.getMin().getY() ||
            this.getMin().getX() > other.getMax().getX() ||
            this.getMin().getY() > other.getMax().getY()){
            return false;
        }
        return true;
    }
    this.minimumTranslate = function(other){
        var amin = this.getMin();
        var amax = this.getMax();
        var bmin = other.getMin();
        var bmax = other.getMax();
        
        var mtd = new Vector(0.0, 0.0);
        
        if (left > 0 || right < 0){
            return mtd;
        }
        if (top > 0 || bottom < 0){
            return mtd;
        }

        var left = (bmin.getX() - amax.getX());
        var right = (bmax.getX() - amin.getX());
        var top = (bmin.getY() - amax.getY());
        var bottom = (bmax.getY() - amin.getY());
        
        if(Math.abs(left) < right){
            mtd.x = left;
        } else {
            mtd.x = right;
        }

        if(Math.abs(top) < bottom){
            mtd.y = top;
        } else {
            mtd.y = bottom;
        }

        if(Math.abs(mtd.x) < Math.abs(mtd.y)){
            mtd.y = 0;
        } else {
            mtd.x = 0;
        }
        return mtd;
    }
}

function NoClip(inx, iny, inw, inh){
    this.x = inx;
    this.y = iny;
    this.w = inw;
    this.h = inh;
    this.collision = false;

    this.setPosition = function(inx, iny){
        this.x = inx;
        this.y = iny;
    }
}

function Physics(){
    this.minTranslation = new Vector(0.0, 0.0);
    this.prevMinTranslation = new Vector(0.0, 0.0);
    this.updateList = function(list, deltaTime, scl){
        for(var i = 0; i < list.length; i++){
            list[i].update(deltaTime/1000, scl);
        }
    }
    this.updateActiveStatic = function(active_objects, static_objects){
        var minTranslationAngle;
        
        var activeGravityAngle;
        
        // TODO Update this for all surfaces, not just axis-aligned ones
        for(var i = 0; i < active_objects.length; i++){
            for(var j = 0; j < static_objects.length; j++){
                if(!static_objects[j].col.isColliding(active_objects[i].col)){
                    this.minTranslation.set(0.0, 0.0);
                } else {
                    if(active_objects[i].name == "player"){
                        active_objects[i].colIndex = j;
                    }
                    this.minTranslation = active_objects[i].col.minimumTranslate(static_objects[j].col);
                    active_objects[i].position.x += this.minTranslation.x;
                    active_objects[i].position.y += this.minTranslation.y;
                    // active_objects[i].poosition.add(this.minTranslation);
                    
                    if(this.minTranslation.getX() > 0){
                        if(active_objects[i].velocity.x < 0){
                             active_objects[i].velocity.x = 0;
                             if(active_objects[i].acceleration.getX() == 0){
                                 active_objects[i].velocity.y *= active_objects[i].friction;
                             }
                        }
                    } else if(this.minTranslation.getX() < 0){
                        if(active_objects[i].velocity.x > 0){
                             active_objects[i].velocity.x = 0;
                             if(active_objects[i].acceleration.getX() == 0){
                                 active_objects[i].velocity.y *= active_objects[i].friction;
                             }
                        }
                    }
                    
                    // If the minTranslation vector is opposite the object's gravity vector
                    minTranslationAngle = toDegrees(Math.atan2(this.minTranslation.getX(), this.minTranslation.getY()));
                    activeGravityAngle = toDegrees(Math.atan2(active_objects[i].gravity.getX(), active_objects[i].gravity.getY()));
                    
                    if(minTranslationAngle != 0 && minTranslationAngle < 105 && minTranslationAngle > 75){
                        active_objects[i].setWalled(1);
                    } else if(minTranslationAngle > -105 && minTranslationAngle < -75){
                        active_objects[i].setWalled(2);
                    } else {
                        active_objects[i].setWalled(0);
                    }
                    
                    if(active_objects[i].walled == 0){
                        if(minTranslationAngle < 15 && minTranslationAngle >= 0){
                            active_objects[i].setGrounded(1);
                        } else {
                            active_objects[i].setGrounded(0);
                        }
                    } else {
                        if(minTranslationAngle > -15 && minTranslationAngle <= 0){
                            active_objects[i].setGrounded(1);
                        } else {
                            active_objects[i].setGrounded(0);
                        }
                    }
                    if(this.minTranslation.getY() > 0){
                         if(active_objects[i].velocity.y < 0){
                             active_objects[i].velocity.y = 0;
                             if(active_objects[i].acceleration.getX() == 0){
                                 active_objects[i].velocity.x *= active_objects[i].friction;
                             }
                         }
                    } else if(this.minTranslation.getY() < 0){
                        if(active_objects[i].velocity.y > 0){
                            active_objects[i].velocity.y = 0;
                            if(active_objects[i].acceleration.getX() == 0){
                                active_objects[i].velocity.x *= active_objects[i].friction;
                            }
                        }
                    }
                }
            }
        }
        prevMinTranslation = new Vector(this.minTranslation.getX(), this.minTranslation.getY());
    }
}
