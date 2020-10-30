 //Background - Image
  const img = new Image();
  img.src = './images/background.jpeg';
  //Sun - Image
  const sun = new Image();
  sun.src = './images/pngtree-sun-png-image_5054087_preview_rev_1.png';
  //Dino - Image
  // const dino = new Image();
  // dino.src = './images/Imagen 1_preview_rev_1.png';
  //Cloud - Image
  const cloud = new Image();
  cloud.src = './images/300px-Cloud_flag_preview_rev_1.png';






 const canvas = document.getElementById('lienzo');
 const ctx = canvas.getContext('2d');

 var ballX =75;
  var ballSpeed =5;
 //var ballRadius = 10;
 var x = canvas.width/2;
 var y = canvas.height-30;
 var dx = 2;
 var dy = -2;
 
 var cloudX = 0;   
  var cloudSpeedX = 2;
 var framesPersecond = 22;
 // setInterval(updateCanvas, 1000/framesPersecond);
 
  var sunX = 840;   
  var sunSpeedX = 2;
 var framesPersecond_sun = 5;
 let bullets = [];
 let enemies = [];
 let frames = 0;
 let requestId
 let mouseX = 20;
 let mouseY = 790;
 // setInterval(updateCanvas, 3000/framesPersecond_sun);



 const backgroundImage = {
 
   draw: function() {
   ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
 
  },
  sun: function(){
      ctx.drawImage(sun, sunX, 20);
  },

cloud: function(){
  ctx.drawImage(cloud,cloudX, 100);
},
circle: function(){
 
}
 }


const move = {
  moveCloud: function (){
  
  cloudX += cloudSpeedX;
  //   console.log(ballX); se observa el proceso de variacion de la bola en funcion de la velocidad dada por la variable Speed
 if(cloudX < 0){
     cloudSpeedX *= -1;
 }
 if(cloudX > 1000){
     cloudSpeedX *= -1;
 }
 
},
 
 moveSun: function (){
  sunX += sunSpeedX;
  //   console.log(ballX); se observa el proceso de variacion de la bola en funcion de la velocidad dada por la variable Speed
 if(sunX < 840){
     sunSpeedX *= -1;
 }
 if(sunX == 900){
     sunSpeedX *= -1;
 }
}
}


class bullet {
constructor(x,y){
this.x = x;
this.y = y;

  }
  drawBullet(){
    this.x += 3;
    ctx.beginPath();
    ctx.arc(this.x,this.y,  10, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
  collision(enemy){
    return (this.x < enemy.x + enemy.width && this.x + 10 > enemy.x &&
      this.y < enemy.y + enemy.height && this.y + 2 > enemy.y
      )
  }
}


class enemigo {
  constructor(width,height,y){
    this.x = canvas.width;
    this.y = y;
    this.image = new Image();
    this.image.src = './images/enemigo.png';
    this.width = width;
    this.height = height;
   
  }

  draw(x,y){
    this.x -= 2;
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
      
}
collision(enemy,mouseX,mouseY){
  return (this.x < mouseX + enemy.width && this.x + this.width > mouseX &&
    this.y < mouseY + enemy.height && this.y + this.height > mouseY
    )
}

}

class dinosaurio {
  constructor(width,height){
    this.x = 30;
    this.y = 700;
    this.image = new Image();
    this.image.src = './images/Imagen 1_preview_rev_1.png';
    this.arrows = 7;
    this.width = width;
    this.height = height;
    this.sx = 0;
    this.sy = 0;
    this.sw = 300;
    this.sh = 400;
  }
  

  draw(x,y){
    ctx.drawImage(this.image,this.sx,this.sy,this.sw,this.sh,x,y,120,120);
      
}

shooter(x,y){
  if(bullets.length < this.arrows && this.arrows !=  0){
    console.log("me estoy disparando");
    bullets.push(new bullet(x,y)) 
    this.arrows --;
  }

}

}

const dino = new dinosaurio(100,100);


function drawEnemy(){
enemies.forEach((enemy,index)=> {
if(enemy.x + enemy.width < 0){
enemies.splice(index,1)

}
if(enemy.collision(dino,mouseX,mouseY)){
  requestId = undefined;
  console.log("gameover");
}
enemy.draw()

bullets.forEach((bola,index_bola)=>{
  if(bola.x > canvas.width){
    bullets.splice(index_bola,1)
  }
  if(bola.collision(enemy)){
    bullets.splice(index_bola,1)
    enemies.splice(index,1)
  } 

          bola.drawBullet()
});

})


}


function generateEnemy(){
  const y = Math.floor(Math.random()* 7)
const enemy = new enemigo(90,90,y*100);
if(frames % 100 == 0){
enemies.push(enemy)
}
}

 function updateCanvas() {
   frames ++;
  backgroundImage.draw();
  backgroundImage.sun();
  backgroundImage.cloud();
  backgroundImage.sun();
 movePersonaje();
 //limites();
  move.moveCloud();
  move.moveSun();
 //drawBall();
generateEnemy();
drawEnemy();
 
 //collisionDetection();
if( !requestId){
  console.log("gameover")
}else{
 requestAnimationFrame(updateCanvas);
// canvas.addEventListener('click', updateCanvas);
}
}


function drawBall (){
  
    bullets.forEach((bola,index)=>{
        if(bola.x > canvas.width){
          bullets.splice(index,1)
        }
                bola.drawBullet()
    });
}


// Mouse position

let canvasPos = getPosition(canvas)

function setMousePos (e) {
 mouseX = e.clientX - canvasPos.x;    mouseY = e.clientY - canvasPos.y;
}
// Set mouse coordinates
function getPosition(a) {
let xPosition = 0;    let yPosition = 0;
    while(a) {
      xPosition += (a.offsetLeft - a.scrollLeft + a.clientLeft);        yPosition += (a.offsetTop - a.scrollTop + a.clientTop);        a = a.offsetParent;
 }
    return {        x: xPosition,        y: yPosition    };
}


canvas.addEventListener('mousemove', setMousePos);



function movePersonaje(){
  dino.draw(mouseX,mouseY);
}



addEventListener("keydown",(event)=>{
  

  if(event.keyCode === 32) {
    dino.shooter(mouseX,mouseY)
    console.log("shoot");
  }
  if(event.keyCode === 13){
    inicio();
  }
})
 console.log("shoot22");
 



 function inicio() {
  
  ctx.fillStyle = '#000000';
  ctx.font = '36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Dino // Shoter', canvas.width / 2, canvas.height / 4);
  ctx.font = '24px Arial';
  ctx.fillText('Click to Start', canvas.width / 2, canvas.height / 2);
  ctx.font = '18px Arial';
  ctx.fillText('Up/Down to move with Mouse, Space to shoot.', canvas.width / 2, (canvas.height / 4) * 3);
  // Start the game on a click
  
  requestId = requestAnimationFrame(updateCanvas);
  
}
 


//requestAnimationFrame(updateCanvas);