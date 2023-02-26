var ctx, inter;

const W = window.innerWidth,
      H = window.innerHeight;
      
var cf = {
    x: W/2, lx: W/2,
    y: H/2, ly: H/2,
    ang: 0,
    dis: 0,
    gros: 40,
    r: 255, g: 3, b: 3
}

function main(){
    let anim = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    
    window.requestAnimationFrame = anim;

    let C=document.querySelector("#c");
    C.width = W; C.height = H;
    ctx = C.getContext("2d");
    ctx.fillStyle = "pink";
    ctx.fillRect(0,0,W,H);
    
    window.requestAnimationFrame(update);
}

function update(i){
    let cont = true;

    cf.gros-=0.04;
    cf.ang+=4;
    cf.dis+=0.2;
    
    rgb_r();
    rgb_g();
    rgb_b();
    
    cf.lx = cf.x;
    cf.ly = cf.y;
    cf.x = Math.cos(cf.ang)*cf.dis+W/2;
    cf.y = Math.sin(cf.ang)*cf.dis+H/2;
    
    draw();
    
    if((cf.dis>(H-W)*4&&cf.dis>(W-H)*2)||cf.gros<=-50){
        cont = false;
    }
    
    if(cont) window.requestAnimationFrame(update);
}

function draw(){
    ctx.beginPath();
    ctx.lineWidth = cf.gros;
    ctx.strokeStyle=rgb(cf.r,cf.g,cf.b);
    ctx.moveTo(cf.lx, cf.ly);
    ctx.lineTo(cf.x, cf.y);
    ctx.stroke();
}

function rgb(r, g, b){
    let rh = Number(r).toString(16);
    if(rh.length<2) rh = "0" + rh;
    let gh = Number(g).toString(16);
    if(gh.length<2) gh = "0" + gh;
    let bh = Number(b).toString(16);
    if(bh.length<2) bh = "0" + bh;
    return '#'+rh+gh+bh;
}

function rgb_r(){
    if(cf.r>=10&&cf.r<=245) cf.r+=rr(-10,10);
    else if(cf.r<10) cf.r+=rr(0,10);
    else cf.r+=rr(-10,0);
}

function rgb_g(){
    if(cf.g>=10&&cf.g<=245) cf.g+=rr(-10,10);
    else if(cf.g<10) cf.g+=rr(0,10);
    else cf.g+=rr(-10,0);
}

function rgb_b(){
    if(cf.b>=10&&cf.b<=245) cf.b+=rr(-10,10);
    else if(cf.b<10) cf.b+=rr(0,10);
    else cf.b+=rr(-10,0);
}

function rr(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function rrf() {
    return Math.random();
};

window.onload = () => main();