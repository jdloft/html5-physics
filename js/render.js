// Render Utilities File

var undefined_color = "#FF4FF9";

function Camera(zm){
    this.w = 0;
    this.h = 0;
    this.zoom = zm;
    this.xoff = 0;
    this.yoff = 0;
}

function Rect(posx, posy, width, height, col){
    this.rect = true;

    if(!col){
        this.color = "ER";
    } else {
        this.color = col;
    }

    this.x = posx;
    this.y = posy;
    this.w = width;
    this.h = height;

    this.setPosition = function(inx, iny){
        this.x = inx;
        this.y = iny;
    }

    this.setScale = function(inw, inh){
        this.w = inw;
        this.h = inh;
    }
}

function Render(can, width, height){
    this.mCamera = new Camera(1);
    this.w = width;
    this.h = height;
    this.canvas = document.getElementById(can);
    this.context = this.canvas.getContext("2d");
    this.animationFrame = true;

    this.toggleAnimationFrame = function(renID, update){
        this.animationFrame = !this.animationFrame;
        if(this.animationFrame){
            clearInterval(renID);
            return requestAnimationFrame(update);
        } else {
            cancelAnimationFrame(renID);
            return setInterval(update, 1);
        }
    }
    this.update = function(){
        this.mCamera.w = this.w;
        this.mCamera.h = this.h;
        this.context.scale(1, -1);
        this.context.translate(0, -this.h);
    }
    this.drawRect = function(rect){
        this.context.fillStyle = rect.color;
        this.context.fillRect(rect.x, rect.y, rect.w, rect.h);
        this.context.fillStyle = undefined_color;
    }
    this.renderList = function(list){
        var d;
        for(var i = 0; i < list.length; i++){
            d = list[i].drawable;
            if(d.rect){
                this.drawRect(d);
            }
        }
    }
    this.clearScreen = function(){
        this.context.clearRect(0, 0, this.w, this.h);
    }
}
