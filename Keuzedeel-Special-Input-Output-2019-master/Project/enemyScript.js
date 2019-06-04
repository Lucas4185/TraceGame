const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth ;
canvas.height = window.innerHeight;

let enemy = new Image();
enemy.src = "img/enemy2.gif";
enemy.pos = 1500;

  //newly spawned objects start at Y=25
  var spawnLineY=-5;

  // spawn a new object every 1500ms
  var spawnRate=2000;

  // set how fast the objects will fall
  var spawnRateOfDescent=0.50;

  // when was the last object spawned
  var lastSpawn=-1;

  // this array holds all spawned object
  var objects=[];

  // save the starting time (used to calc elapsed time)
  var startTime=Date.now();

  // start animating
  animate();

  function spawnRandomObject(){

      // select a random type for this new object
      var t;

      // About Math.random()
      // Math.random() generates a semi-random number
      // between 0-1. So to randomly decide if the next object
      // will be A or B, we say if the random# is 0-.49 we
      // create A and if the random# is .50-1.00 we create B

      if(Math.random()<0.50){t="red";}else{t="blue";}

      // create the new object
      var object={
          // set this objects type
          type:t,
          // set x randomly but at least 15px off the canvas edges
          x:Math.random()*canvas.width,
          // set y to start on the line where objects are spawned
          y:spawnLineY,
      }

      // add the new object to the objects[] array
      objects.push(object);
  }

  function animate(){

      // get the elapsed time
      var time=Date.now();

      // see if its time to spawn a new object
      if(time>(lastSpawn+spawnRate)){
          lastSpawn=time;
          spawnRandomObject();
      }

      // request another animation frame
      requestAnimationFrame(animate);

      // clear the canvas so all objects can be
      // redrawn in new positions
      ctx.clearRect(0,0,canvas.width,canvas.height);
      // draw the line where new objects are spawned
      ctx.beginPath();
      ctx.moveTo(0,spawnLineY);
      ctx.lineTo(canvas.width,spawnLineY);
      ctx.stroke();

      // move each object down the canvas
      for(var i=0;i<objects.length;i++){
          var object=objects[i];
          object.y+=spawnRateOfDescent;
          ctx.beginPath();
          ctx.arc(object.x,object.y,8,0,Math.PI*2);
          ctx.closePath();
          ctx.save();
          ctx.translate(enemy.pos,100);
          ctx.drawImage(enemy,-enemy.width/2,-enemy.height/2);
          ctx.restore();
          ctx.fillStyle=object.type;
          ctx.fill();
      }
  }
