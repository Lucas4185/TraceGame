// Grab elements, create settings, etc.
const video = document.getElementById('video');
var pixel;

const canvas = document.getElementById('canvas');
const backgroundCanvas = document.getElementById('canvasBackground');
const ctx    = canvas.getContext('2d');
const ctxBack = backgroundCanvas.getContext('2d');

let points = [];

let offset = 15;
let xSpace = canvas.width/offset;
let ySpace = canvas.height/offset;

let lijnSpacing = 5;
var gameStarted = false;

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    });
}
else if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia({ video: true }, function(stream) {
        video.src = stream;
        video.play();
    }, errBack);
} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia({ video: true }, function(stream){
        video.src = window.webkitURL.createObjectURL(stream);
        video.play();
    }, errBack);
} else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
    navigator.mozGetUserMedia({ video: true }, function(stream){
        video.srcObject = stream;
        video.play();
    }, errBack);
}

  video.addEventListener('play', function () {
      var $this = this; //cache
      (function loop() {
          if (!$this.paused && !$this.ended) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage($this, 0, 0);
              DrawMotion();
              setTimeout(loop, 1000 / 60); //30
          }
      })();
  }, 0);

  function DrawMotion()
  {
    if(gameStarted)
    {
      for (var i = 0; i < points.length; i++)
      {
        var percentageRGB = [];
        if (points[i].red > ctx.getImageData(points[i].x, points[i].y, 1, 1).data[0]) {
          percentageRGB[0] = ((100 / points[i].red) * ctx.getImageData(points[i].x, points[i].y, 1, 1).data[0]);
        }if (points[i].green > ctx.getImageData(points[i].x, points[i].y, 1, 1).data[1]) {
          percentageRGB[1] = ((100 / points[i].green) * ctx.getImageData(points[i].x, points[i].y, 1, 1).data[1]);
        }if (points[i].blue > ctx.getImageData(points[i].x, points[i].y, 1, 1).data[2]) {
          percentageRGB[2] = ((100 / points[i].blue) * ctx.getImageData(points[i].x, points[i].y, 1, 1).data[2]);
        }if (points[i].red < ctx.getImageData(points[i].x, points[i].y, 1, 1).data[0]) {
          percentageRGB[0] = ((100 / ctx.getImageData(points[i].x, points[i].y, 1, 1).data[0]) * points[i].red);
        }if (points[i].green < ctx.getImageData(points[i].x, points[i].y, 1, 1).data[1]) {
          percentageRGB[1] = ((100 / ctx.getImageData(points[i].x, points[i].y, 1, 1).data[1]) * points[i].green);
        }if (points[i].blue < ctx.getImageData(points[i].x, points[i].y, 1, 1).data[2]) {
          percentageRGB[2] = ((100 / ctx.getImageData(points[i].x, points[i].y, 1, 1).data[2]) * points[i].blue);
        }
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.fillRect((points[i].x - xSpace/2), (points[i].y - ySpace/2), xSpace, ySpace);
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.fillRect(points[i].x, points[i].y, 1, 1);
        if ((percentageRGB[0] + percentageRGB[1] + percentageRGB[2] / 3) < 90)
        {
          ctx.fillStyle = "rgba(50,50,50,1)";
          ctx.fillRect((points[i].x - xSpace/2), (points[i].y - ySpace/2), xSpace, ySpace);
        }
        else
        {
          ctx.fillStyle = "rgba(0,0,0,1)";
          ctx.fillRect((points[i].x - xSpace/2), (points[i].y - ySpace/2), xSpace, ySpace);
        }
      }
    }
  }

function setBackground()
{
  ctxBack.drawImage(video, 0,0, canvas.width, canvas.height);
  canvas.style.display = "inline";
  //dit moet 1x gebeure daarna niet
  MakeTrackingPoints();
  gameStarted = true;
}

function MakeTrackingPoints()
{
  ctxBack.getImageData(1,1,1,1);
  for (var x = xSpace - (xSpace/2); x < canvas.width; x += xSpace) {
    for (var y = ySpace - (ySpace/2); y < canvas.height; y += ySpace) {
      let point = {};
      point.x = x;
      point.y = y;
      point.red = ctxBack.getImageData(x, y, 1, 1).data[0];
      point.green = ctxBack.getImageData(x, y, 1, 1).data[1];
      point.blue = ctxBack.getImageData(x, y, 1, 1).data[2];
      points.push(point);
      //ctx.putImageData(imgData, 10, 70);
    }
  }
}
