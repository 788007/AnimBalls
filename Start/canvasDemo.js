window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;
var balls = [];
var num_balls = 20;

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
  for (var i = 0; i < num_balls; i++){
    var radius = Math.random()*20 + 10;
    var color = randomColor();
    //set location vector
    var x = Math.random() * (canvas.width-20) + 10;
    var y = Math.random() * (canvas.height-20) + 10;
    var loc = new vector2d(x, y);
    //set velocity vector
    var r = (Math.random()* 4 + 0.5);
    var theta = Math.random() * 2 * Math.PI;
    var vel = new vector2d(undefined, undefined, r, theta);

    var acc = new vector2d(0, 0);

    balls[i] = new Mover(radius, loc, vel, acc, color);
  }

  animate(); // Call to your animate function
}

function totalKineticEnergy() {
  var sum = 0;
  for(var i = 0; i < balls.length; i++){
    sum += balls[i].kineticEnergy();
  }
  return sum;
}

//returns a random pastel color
function randomColor(){
  var hue = Math.floor(Math.random() * 360);
  var l = Math.random() * 15 + 70;
  var pastel = 'hsl(' + hue + ', 100%, ' + l + '%)';
  return pastel;
}

//check if balls should bounce off each other
function checkBallBounces () {

  //update collisionTracker
  for(var i = 0; i < balls.length; i++){
    for(var j = 0; j < balls[i].collisionTracker.length; j++){
      balls[i].collisionTracker[j]++;
    }
  }

  for(var i = 0; i < balls.length ; i++){
    for(var j = i + 1; j < balls.length; j++){

      //check if balls collided in last 10 frames
      if(balls[j].collisionTracker[i] < 10){continue;}

      //check if edges of 2 balls are touching
      var dist = vector2d.distance(balls[i].loc, balls[j].loc);
      if( dist <= balls[i].radius + balls[j].radius){
        var b1 = balls[i];
        var b2 = balls[j];
        //momentum & velocity of center of mass
        var p_initial = vector2d.add(b1.momentum(), b2.momentum());
        //console.log(p_initial.x, p_initial.y);
        var total_mass = b1.mass + b2.mass;
        var vel_cm = vector2d.scalarDiv(p_initial, total_mass);
        //calculate velocities after collision using vf = 2*v_cm - vi
        var v1_final = vector2d.scalarMult(vel_cm, 2);
        v1_final.subtract(b1.vel);
        var v2_final = vector2d.scalarMult(vel_cm, 2);
        v2_final.subtract(b2.vel);

        b1.vel = v1_final;
        b2.vel = v2_final;

        var p_final = vector2d.add(b1.momentum(), b2.momentum());
        // console.log(totalKineticEnergy());
        // console.log(p_final.x, p_final.y);

        //reset frames since collision to 0
        b1.collisionTracker[j] = 0;
        b2.collisionTracker[i] = 0;
      }
    }
  }

}

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
