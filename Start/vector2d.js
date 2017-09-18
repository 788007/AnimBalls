function vector2d (x, y, r, theta){
  this.x = (x !== undefined) ? x : r * Math.cos(theta);
  this.y = (y !== undefined) ? y : r * Math.sin(theta);
}

vector2d.prototype.add = function(vec2) {
  this.x += vec2.x;
  this.y += vec2.y;
}

vector2d.prototype.subtract = function(vec2) {
  this.x -= vec2.x;
  this.y -= vec2.y;
}

vector2d.prototype.scalarMult = function (k) {
  return new vector2d(this.x * k, this.y * k);
}

vector2d.prototype.magnitude = function(){
  return Math.sqrt(this.x * this.x + this.y * this.y);
}

vector2d.prototype.distance = function(vec2) {
  return Math.sqrt( (vec2.x-this.x)*(vec2.x-this.x) + (vec2.y-this.y)*(vec2.y-this.y) );
}

var a = new vector2d(3, 4);
var b = new vector2d(-1, 1);
//console.log(a.distance(b));

var c = a.scalarMult(5);
console.log(c.x, c.y);
