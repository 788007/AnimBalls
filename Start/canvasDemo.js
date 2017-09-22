

window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;
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
  for (var i = 0; i < 15; i++){
    var radius = Math.random()*20 + 10;
    var color = randomColor();
    //set location vector
    var x = Math.random() * (canvas.width-20) + 10;
    var y = Math.random() * (canvas.height-20) + 10;
    var loc = new vector2d(x, y);
    //set velocity vector
    var r = (Math.random()* 5 + 1);
    var theta = Math.random() * 2 * Math.PI;
    var vel = new vector2d(undefined, undefined, r, theta);
    //set acceleration vector
    //var r2 = Math.random() / 2.0;
    //var t = Math.random() * 2 * Math.PI;
    var acc = new vector2d(0, 0);

    balls[i] = new Ball(radius, loc, vel, acc, color);
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
function Ball(radius, loc, vel, acc, color){
  this.radius = radius;
  this.color = color;
  //let volume = area and density = 1, so mass = area
  this.mass = Math.PI * this.radius * this.radius;
  this.loc = loc;
  this.vel = vel;
  this.acc = acc;
  //this.momentum = this.vel.scalarMult(this.mass);
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
function checkBallBounces () {
  for(var i = 0; i < balls.length ; i++){
    balls[i].framesSinceCollision++;
    if(balls[i].framesSinceCollision < 15){continue;}

    for(var j = i + 1; j < balls.length; j++){
      if(balls[j].framesSinceCollision < 15){continue;}
      //check if edges of 2 balls are touching
      var dist = vector2d.distance(balls[i].loc, balls[j].loc);
      if( dist <= balls[i].radius + balls[j].radius){
        var b1 = balls[i];
        var b2 = balls[j];
        //new velocities after collision
        var v1x = b1.vel.x;
        var v1y = b1.vel.y;
        var v2x = b2.vel.x;
        var v2y = b2.vel.y;
        var m1 = b1.mass;
        var m2 = b2.mass;

        var newx1 = (m1 - m2) / (m1 + m2) * v1x + (2 * m2) / (m1 + m2) * v2x;
        var newx2 = (2 * m2) / (m1 + m2) * v1x + (m2 - m1) / (m1 + m2) * v2x;

        var newy1 = (m1 - m2) / (m1 + m2) * v1y + (2 * m2) / (m1 + m2) * v2y;
        var newy2 = (2 * m2) / (m1 + m2) * v1y + (m2 - m1) / (m1 + m2) * v2y;

        //console.log(dx1, dx2, dy1, dy2);

        b1.vel = new vector2d(newx1, newy1);
        b2.vel = new vector2d(newx2, newy2);

        b1.framesSinceCollision = 0;
        b2.framesSinceCollision = 0;
        console.log("collision");
        //console.log(b1.vel.x, b1.vel.y);
        //console.log(b2.vel.x, b2.vel.y);
      }
    }
  }

}

//draws ball
Ball.prototype.draw = function () {
  ball = this;
  ball.update();
  ctx.beginPath();
  ctx.arc(ball.loc.x, ball.loc.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
};

function printMouseLoc(e){
  var mouseX = e.clientX;
  var mouseY = e.clientY;
  console.log("x:", mouseX, "y:", mouseY);
}

function mouseAttract(){
  console.log("clicked!");
}

function animate(){
  requestAnimationFrame(animate);
  checkBallBounces();
  canvas.onclick = mouseAttract;

  // canvas.onmousemove = function(event) {
  //   printMouseLoc(event);
  // }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(var i = 0; i < balls.length; i++){
    balls[i].draw();
  }
}
