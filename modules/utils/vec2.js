export class Vec2 {
  constructor(x = 0, y = 0) {
    // , w = 0) {
    this.x = x;
    this.y = y;
    // this.w = w; //thing so we can have cross product (just in case)
  }

  // math functions
  add(other) {
    return new Vec2(this.x + other.x, this.y + other.y);
  }
  sub(other) {
    return new Vec2(this.x - other.x, this.y - other.y);
  }
  mul(other) {
    return new Vec2(this.x * other, this.y * other);
  }
  div(other) {
    return new Vec2(this.x / other, this.y / other);
  }
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }
  //idk why you would need this though
  /* cross(other) {
	  return new Vec2(this.x*other.w - this.w*other.y, this.w*other.x - this.x*other.z, this.x*other.y - this.y*other.x);
  } */

  // util functions
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  normalized() {
    return new Vec2(this.x / this.length, this.y / this.length);
  }

  // identities
  up() {
    return new Vec2(0, 1);
  }
  down() {
    return new Vec2(0, -1);
  }
  left() {
    return new Vec2(1, 0);
  }
  right() {
    return new Vec2(-1, 0);
  }
}
