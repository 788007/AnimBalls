

window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
var balls = [];

function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,44,55, .5)';
  // get the context
  ctx = canvas.getContext('2d'); // This is the context
  //create array of balls
  for (var i = 0; i < 20; i++){
    balls[i] = new Ball();
  }
  animate(); // Call to your animate function
}

//returns a random pastel color
function randomColor(){
  var hue = Math.floor(Math.random() * 360);
  var pastel = 'hsl(' + hue + ', 100%, 80%)';
  return pastel;
}

//returns either -1 or 1
function randomDirection(){
  var dir = [-1, 1]
  var rand = Math.floor(Math.random()*2);
  return dir[rand];
}

//creates ball objects when called w/ new
function Ball(){
  this.radius = Math.random()*20 + 10;
  this.x = Math.random() * (canvas.width-20) + 10;
  this.y = Math.random() * (canvas.height-20) + 10;
  this.dx = (Math.random()* 4 + 1) * randomDirection();
  this.dy = (Math.random()* 4 + 1) * randomDirection();
  console.log(this.dx, this.dy);
  this.color = randomColor();
}

//updates ball position
Ball.prototype.update = function () {
  ball = this;
  ball.checkEdges();
  ball.x += ball.dx;
  ball.y += ball.dy;
}

//reverses direction when ball hits edge
Ball.prototype.checkEdges = function () {

  ball = this;
  if(ball.x + ball.radius >= canvas.width){
    ball.x = canvas.width - ball.radius;
    ball.dx *= -1;
  }
  if(ball.x - ball.radius < 0){
    ball.x = ball.radius;
    ball.dx *= -1;
  }
  if(ball.y + ball.radius >= canvas.height){
    ball.y = canvas.height - ball.radius;
    ball.dy *= -1;
  }
  if( ball.y - ball.radius < 0){
    ball.y = ball.radius;
    ball.dy *= -1;
  }
}

//draws ball
Ball.prototype.draw = function () {
  ball = this;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
};

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(var i = 0; i < balls.length; i++){
    var ball = balls[i];
    ball.update();
    ball.draw();
  }
}
