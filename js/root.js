// World management world.js

function Root(canvas, width, height){
    this.mRender = new Render(canvas, width, height);
    this.mPhysics = new Physics();

	this.static_objects = [];
	this.active_objects = [];
    this.tempName = "";
    this.activeLevel = new Level("empty.json");

	this.active_objects.push(new ActiveObject("player", 0, 0, 20, 20));

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

    this.getStaticObjectByName = function(nm){
        for(var i = 0; i < this.static_objects.length; i++){
            if(this.static_objects[i].name == nm){
                return this.static_objects[i];
                break;
            }
        }
    }

	this.addActiveObject = function(inname, inx, iny, inw, inh){
        tempName = "active_" + this.active_objects.length+1;
		if(name != "player"){
			this.active_objects.push(new ActiveObject(inname || tempName, inx, iny, inw, inh));
		}
	}

    this.updatePhysics = function(deltaTime){
        this.mPhysics.updateList(this.active_objects, deltaTime, this.mRender);
        this.mPhysics.updateList(this.static_objects, deltaTime, this.mRender);
        this.mPhysics.updateActiveStatic(this.active_objects, this.static_objects);
    }

    this.updateRender = function(){
        this.mRender.clearScreen();
        this.mRender.renderList(this.static_objects);
        this.mRender.renderList(this.active_objects);
    }
}
