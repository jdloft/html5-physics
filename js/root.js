// World management world.js

function Root(canvas, width, height){
    this.mRender = new Render(canvas, width, height);
    this.mPhysics = new Physics();

	this.static_objects = [];
	this.active_objects = [];
    this.inactive_objects = [];
    this.tempName = "";
    this.active_level = 'null';

	this.active_objects.push(new ActiveObject("player", 0, 0, 20, 20));
    this.static_objects.push(new StaticObject("placeholder", 0, 0, 0, 0));

    this.getPlayer = function(){
        for(var i = 0; i < this.active_objects.length; i++){
            if(this.active_objects[i].name == "player"){
                return this.active_objects[i];
            }
        }
        console.log("Player access attempted before player was created.");
    }

	this.addStaticObject = function(inx, iny, inw, inh, inname){
        tempName = "";
        tempName = "static_" + this.static_objects.length;
		this.static_objects.push(new StaticObject(inname || tempName, inx, iny, inw, inh));
	}

    this.addStaticObject(0, 0, 0, 0, "placeholder");

    this.getStaticObjectByName = function(nm){
        for(var i = 0; i < this.static_objects.length; i++){
            if(this.static_objects[i].name == nm){
                return this.static_objects[i];
                break;
            }
        }
    }

	this.addActiveObject = function(inx, iny, inw, inh, inname, color){
        tempName = "active_" + this.active_objects.length+1;
		if(name != "player"){
			this.active_objects.push(new ActiveObject(inname || tempName, inx, iny, inw, inh));
		}
	}

    this.getActiveObjectByName = function(nm){
        for(var i = 0; i < this.active_objects.length; i++){
            if(this.active_objects[i].name == nm){
                return this.active_objects[i];
                break;
            }
        }
    }

    this.addInactiveObject = function(inx, iny, inw, inh, inname){
        tempName = "";
        tempName = "inactive_" + this.inactive_objects.length;
        this.inactive_objects.push(new InactiveObject(inname || tempName, inx, iny, inw, inh));
    }

    this.getInactiveObjectByName = function(nm){
        for(var i = 0; i < this.inactive_objects.length; i++){
            if(this.inactive_objects[i].name == nm){
                return this.inactive_objects[i];
                break;
            }
        }
    }

    this.updatePhysics = function(deltaTime){
        this.mPhysics.updateList(this.active_objects, deltaTime, this.mRender.mCamera);
        this.mPhysics.updateList(this.static_objects, deltaTime, this.mRender.mCamera);
        this.mPhysics.updateList(this.inactive_objects, deltaTime, this.mRender.mCamera);
        this.mPhysics.updateActiveStatic(this.active_objects, this.static_objects);
    }

    this.updateRender = function(){
        this.mRender.clearScreen();
        this.mRender.renderList(this.static_objects);
        this.mRender.renderList(this.active_objects);
        this.mRender.renderList(this.inactive_objects);
    }

    this.loadLevel = function(l){
        this.active_level = l;
        this.getPlayer().setPosition(l.spawn_point[0], l.spawn_point[1]);
        this.static_objects = [];
        this.addStaticObject(0, 0, 0, 0, "placeholder");
        for(var i = 0; i < l.static_objects.length; i++){
            var obj = l.static_objects[i];
            this.addStaticObject(obj.x, obj.y, obj.w, obj.h);
        }
    }

    this.loadLevel(defaultLevel);
}
