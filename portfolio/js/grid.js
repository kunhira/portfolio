var maxWidth;  //水平方向に動ける最大値
var maxHeight; //垂直方向に動ける最大値

const canvas2 = document.getElementById('grid');
const ctx2 = canvas2.getContext('2d');
var num = 1000; //数
var r = 1.8; //円の半径
var speed = 2; //移動距離
var particles = [];

function canvasSize(){
    //キャンバスサイズ決定
    var w = document.getElementById('particleWrap').offsetWidth;
    var h = document.getElementById('particleWrap').offsetHeight;
    maxWidth = w - r;
    maxHeight = h - r;
    canvas2.width = w;
    canvas2.height = h;
}

var Particle = function(x,y,angle,color_r,color_g,color_b){ //バーティクルのコンストラクタ
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.color_r = color_r;
    this.color_g = color_g;
    this.color_b = color_b;
}

Particle.prototype.draw = function(){ //バーティクルの描画
    ctx2.beginPath();
    ctx2.arc(this.x,this.y,r,0,Math.PI*2.0,true);
    ctx2.fillStyle = 'rgb(' + this.color_r + ',' + this.color_g + ',' + this.color_b + ')';
    ctx2.globalCompositeOperation = "lighter";
    ctx2.fill();
}

Particle.prototype.update = function(){ //バーティクルの移動
    var radian = this.angle * Math.PI / 180;
    this.x = this.x + Math.cos(radian)*speed;
    this.y = this.y + Math.sin(radian)*speed;
    if(this.x < r || maxWidth < this.x ){
        this.angle = 180 - this.angle;
        //this.update();
    }
    if(this.y < r || maxHeight < this.y ){
        this.angle = 360 - this.angle;
        //this.update();
    }
}

Particle.prototype.render = function(){ //バーティクルの更新
    this.draw();
    this.update();
}


function randomNum(min,max){ //min～maxまでのランダム整数値を返す
    var ran = Math.floor(Math.random() * (max + 1 -min)) + min;
    return ran;
}
function loop(){
    ctx2.clearRect(0 ,0, canvas2.width, canvas2.height);
    
    for(var i=0; i<num; i++){
        particles[i].render();
    }
    requestAnimationFrame(loop);
}

$(function(){
    canvasSize();//キャンバスサイズを決定する

    for(var i=0; i < num; i++){　//インスタンスの生成
        //x = randomNum(maxWidth,r);
        //y = randomNum(maxHeight,r);
        x = (maxWidth + r) / 2;
        y = (maxHeight + r) / 2;
        angle = randomNum(360,0);
        color_r = Math.floor(Math.random() * 256);
        color_g = Math.floor(Math.random() * 256);
        color_b = Math.floor(Math.random() * 256);
        particle = new Particle(x,y,angle,color_r,color_g,color_b);
        particles.push(particle);
    }
    loop();
})