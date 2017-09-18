

window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
var balls = [];

function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = window.innerWidth * 0.85;
  canvas.height = window.innerHeight * 0.85 ;
  canvas.style.marginTop = canvas.height * 0.08 + 'px';
  canvas.style.marginBottom = canvas.height * 0.08 + 'px';
  canvas.style.marginRight = canvas.width * 0.08 + 'px';
  canvas.style.marginLeft = canvas.width * 0.08 + 'px';
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,44,55, .5)';
  // get the context
  ctx = canvas.getContext('2d'); // This is the context
  //create array of balls
  for (var i = 0; i < 30; i++){
    balls[i] = new Ball();
  }

  animate(); // Call to your animate function
}

//returns a random pastel color
function randomColor(){
  var hue = Math.floor(Math.random() * 360);
  var l = Math.random() * 15 + 70;
  var pastel = 'hsl(' + hue + ', 100%, ' + l + '%)';
  return pastel;
}


//creates ball objects when called w/ new
function Ball(){
  this.radius = Math.random()*20 + 10;
  this.color = randomColor();

  //let volume = area and density = 1, so mass = area
  this.mass = Math.PI * this.radius * this.radius;

  //set location vector
  var x = Math.random() * (canvas.width-20) + 10;
  var y = Math.random() * (canvas.height-20) + 10;
  this.loc = new vector2d(x, y);

  //set velocity vector
  var r = (Math.random()* 5 + 1);
  var theta = Math.random() * 2 * Math.PI;
  this.vel = new vector2d(undefined, undefined, r, theta);

  //set acceleration vector
  this.acc = new vector2d(0, 0);

  this.momentum = this.vel.scalarMult(this.mass);
}



//updates ball position
Ball.prototype.update = function () {
  ball = this;
  ball.checkEdges();
  ball.loc.add(ball.vel);

  //ball.vel.add(ball.acc);
}

//reverses direction when ball hits edge
Ball.prototype.checkEdges = function () {

  ball = this;
  if(ball.loc.x + ball.radius >= canvas.width){
    ball.loc.x = canvas.width - ball.radius;
    ball.vel.x *= -1;
  }
  if(ball.loc.x - ball.radius < 0){
    ball.loc.x = ball.radius;
    ball.vel.x *= -1;
  }
  if(ball.loc.y + ball.radius >= canvas.height){
    ball.loc.y = canvas.height - ball.radius;
    ball.vel.y *= -1;
  }
  if(ball.loc.y - ball.radius < 0){
    ball.loc.y = ball.radius;
    ball.vel.y *= -1;
  }
}

//check if balls should bounce off each other
// function checkBallBounces () {
//   for(var i = 0; i < balls.length -1; i++){
//     for(var j = i + 1; j < balls.length; j++){
//       //check if edges of 2 balls are touching
//       var dist = balls[i].loc.distance(balls[j].loc);
//       if( dist <= balls[i].radius + balls[j].radius){
//
//
//       }
//     }
//   }
//
// }

//draws ball
Ball.prototype.draw = function () {
  ball = this;
  ctx.beginPath();
  ctx.arc(ball.loc.x, ball.loc.y, ball.radius, 0, Math.PI * 2);
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
