const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let startTime,currentTime,dt,frameRate;
let sx,sy,sw,sh,counter,x,y,w,h;
let numCells,numRows;

let sprite = new Image(1,1);
sprite.src = "img/enemy.png";
sprite.pos = 150;

function setUp(){
  startTime = new Date();
  frameRate = 10;
  sw = 180;
  sh = 120;

  counter = 0;
  numCells = 4;
  numRows = 4;
  update();
}


function update(){
  requestAnimationFrame(update);
  currentTime = new Date();
  dt = currentTime - startTime;
  if(dt > 1000/frameRate){
    context.clearRect(0,0,canvas.width,canvas.height);
    sx = counter % numCells * sw;
    sy = Math.floor(counter / numRows) * sh;
    context.drawImage(sprite,sx,sy,sw,sh,10,100,250,250);

    startTime = new Date();
    counter++;
    if(counter > numCells){
      counter = 0;
    }
  }

}

setUp();
