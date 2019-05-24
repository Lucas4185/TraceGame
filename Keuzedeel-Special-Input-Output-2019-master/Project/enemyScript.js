const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth ;
canvas.height = window.innerHeight;

let enemy = new Image();
enemy.src = "img/enemy2.gif";
enemy.pos = 1500;

let kinOb = {enemy};

let Speed = -10;

animate();
update();
function animate(){
  context.clearRect(0,0,canvas.width,canvas.height);
  requestAnimationFrame(animate);

if(enemy != null){
  context.save();
  context.translate(enemy.pos,100);
  context.drawImage(enemy,-enemy.width/2,-enemy.height/2);
  context.restore();

  enemy.pos += Speed;

  if(enemy.pos < -250){

    enemy = null;

  }
 }
}

function update(){
  requestAnimationFrame(update);
  //spawning
  if(Math.random()<0.1){
    kinOb.pos = new Vector2d(getRandomNumber(0,canvas.width),-50);
    kinOb.vel = new Vector2d(0,2);
    kinObs.push(kinOb);
  }
  //drawing
  for (let i = 0; i < kinObs.length; i++) {
    kinObs[i].pos.add(kinObs[i].vel)
    kinObs[i].point.position(kinObs[i].pos);
    kinObs[i].point.draw(context);
  }
}

function getRandomNumber(min,max){
  return Math.floor(Math.random()*(max-min) + min);
}
