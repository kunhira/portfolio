var canvas = document.getElementById('particleTxt');
var ctx = canvas.getContext('2d');


var name = "Yuki Hirata";
var fontStr = "bold 120pt Helvetica Neue, Helvetica, Arial, sans-serif";
ctx.font = fontStr;
ctx.textAlign = "center";

canvas.width = ctx.measureText(name).width;
canvas.height = 120;

var mask;
var whitePos = [];
var pos = [];
var num = 700;
var r = 1;
var textCol = "white";

var Point = function(x,y){
    this.x = x;
    this.y = y;
    this.vx = 1;
    this.vy = 1;
}
Point.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = textCol;
    ctx.arc(this.x,this.y,r,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();
}
Point.prototype.update = function(){
    
    if(this.x + this.vx < 0 || this.x + this.vx > canvas.width || mask.data[(this.y*mask.width+(this.x+this.vx))*4] !== 255){
        this.vx *= -1;
    }
    if(this.y + this.vy < 0 || this.y + this.vy > canvas.height || mask.data[((this.y+this.vy)*mask.width+this.x)*4] !== 255){
        this.vy *=-1;
    }

    for(var i=0; i<pos.length;i++){
        if(this.x == pos[i].x && this.y == pos[i].y)continue;
        //2点間の距離を求める
        var dst = Math.sqrt(Math.pow(this.x-pos[i].x,2) + Math.pow(this.y-pos[i].y,2));
        //console.log(dst);
        if(dst < 15){
            ctx.beginPath();
            ctx.lineWidth = 0.1;
            ctx.strokeStyle = textCol;
            ctx.moveTo(this.x,this.y);
            ctx.lineTo(pos[i].x,pos[i].y);
            ctx.stroke();
        }
        if(dst < 5){
            ctx.beginPath();
            ctx.lineWidth = 0.2;
            ctx.strokeStyle = textCol;
            ctx.moveTo(this.x,this.y);
            ctx.lineTo(pos[i].x,pos[i].y);
            ctx.stroke();
        }
    }
    this.x += this.vx;
    this.y += this.vy;

}
Point.prototype.render = function(){
    this.draw();
    this.update();
}

function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var i=0 ;i < pos.length; i++){
        pos[i].render();
    }
}

function init(){
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fill();
    ctx.font = fontStr;
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.fillText(name,0,canvas.height);
    ctx.closePath();

    mask = ctx.getImageData(0,0,canvas.width,canvas.height);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    for(var y=0; y<mask.height; y++){
        for(var x=0; x<mask.width; x++){
            if(mask.data[(y*mask.width+x)*4] !== 0){
                x1 = x;
                y1 = y;
                whitepos = new Point(x1,y1);
                whitePos.push(whitepos); 
            }
        }
    }
    for(var i=0; i<num; i++){
        var ranP = whitePos[Math.floor(Math.random()*whitePos.length)];
        point = new Point(ranP.x,ranP.y);
        pos.push(point);
    }

}
var cnt = 0;
init();

var fDraw = setInterval(function fdraw(){
    pos[cnt].draw();
    cnt++;
    if(cnt == pos.length){
        clearInterval(fDraw);
        setInterval(loop,30);
    }
},1);

