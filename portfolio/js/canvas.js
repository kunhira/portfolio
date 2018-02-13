var maxWidth;  //水平方向に動ける最大値
var maxHeight; //垂直方向に動ける最大値

var device = "pc";
var linewidth = '0.1';
var num = 9; //数

//ユーザーエージェント判定
var ua = navigator.userAgent;
if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
    linewidth = '0.006';
    device = "sp";
    num = 4;
} else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
    linewidth = '0.05';
}

const canvas = document.getElementById('fullscreen__canvas');
const ctx = canvas.getContext('2d');
var particles = [];
var linecol = 'black';
var resize = false;

//リサイズイベント
var timer = 0;
window.onresize = function () {
    if (timer > 0) {
        clearTimeout(timer);
    }
    timer = setTimeout(function () {
        canvasSize();
        if(device === "pc" ){
            for(var i=0; i<num; i++){
                particles[i].x = canvas.width/2;
                particles[i].y = canvas.height/2;
            }
        }
    }, 200);
  };

function canvasSize(){
    //キャンバスサイズ決定
    var w = document.getElementById('fullscreen').offsetWidth;
    var h = document.getElementById('fullscreen').offsetHeight;
    maxWidth = w;
    maxHeight = h;
    $( '#fullscreen__canvas' ).attr('width',w);
    $( '#fullscreen__canvas' ).attr('height',h);
}

$('.aboutWrap').on('inview',function(event, isInView){
    if(isInView){
        linecol = 'blue';
    }
    else{
        linecol = 'black';
    }
})

var Particle = function(x,y,r,speed,angle){ //バーティクルのコンストラクタ
    this.x = x;
    this.y = y;
    this.r = r;
    this.speed = speed;
    this.angle = angle;
    //this.color_r = color_r;
    //this.color_g = color_g;
    //this.color_b = color_b;
}

Particle.prototype.draw = function(){ //バーティクルの描画
    ctx.beginPath();
    ctx.globalAlpha = 0.8;
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2.0,true);
    //ctx.fillStyle = 'rgb(' + this.color_r + ',' + this.color_g + ',' + this.color_b + ')';
    ctx.fillStyle = 'rgba(0,0,255,0)';
    //ctx.globalCompositeOperation = "lighter";
    ctx.fill();
}

Particle.prototype.update = function(){ //バーティクルの移動
    var radian = this.angle * Math.PI / 180;
    this.x = this.x + Math.cos(radian)*this.speed;
    this.y = this.y + Math.sin(radian)*this.speed;
    if(this.x < 0 || maxWidth < this.x ){
        this.angle = 180 - this.angle;
    }
    if(this.y < 0 || maxHeight < this.y ){
        this.angle = 360 - this.angle;
    }
    for(var i=0; i<particles.length;i++){
        ctx.beginPath();
        ctx.lineWidth = linewidth;
        ctx.strokeStyle = linecol;
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(particles[i].x,particles[i].y);
        ctx.stroke();
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
    ctx.clearRect(0 ,0, canvas.width, canvas.height);
    
    for(var i=0; i<num; i++){
        particles[i].render();
    }
    requestAnimationFrame(loop);
}

$(function(){
    canvasSize();//キャンバスサイズを決定する

    for(var i=0; i < num; i++){　//インスタンスの生成
        angle = randomNum(360,0);
        r = randomNum(20,10);
        //x = randomNum(maxWidth,r);
        //y = randomNum(maxHeight,r);
        x = canvas.width/2;
        y = canvas.height/2;
        speed = randomNum(8,1);
        //color_r = Math.floor(Math.random()*256);
        //color_g = Math.floor(Math.random()*256);
        //color_b = Math.floor(Math.random()*256);
        particle = new Particle(x,y,r,speed,angle);
        particles.push(particle);
    }
    setTimeout('loop()',1100);
    //loop();
})