export class Vec2 {
  constructor(x = 0, y = 0) {
    // , w = 0) {
    this.x = x;
    this.y = y;
    // this.w = w; //thing so we can have cross product (just in case)
  }

  /**
   * Copies the properites of v onto current vector
   * @param {*} v 
   */
  set(v){
    this.x = v.x;
    this.y = v.y;
  }

  setFromArray(arr=[0,0]){
    this.x=arr[0];
    this.y=arr[1];
  }

  // math functions
  /**
   * creates the new vector resulting from adding this one to another
   * @param {Vec2} other other vector
   * @param {number} s scaling factor
   * @returns result of this + other
   */
  add(other , s=1) {
    return new Vec2(  (this.x + other.x)*s , (this.y + other.y)*s );
  }

  add2(other ,s=1){
    this.x+=other.x;
    this.y+=other.y;

    this.scale(s);
  }

  /**
   * Creates new vector resulting from subtracting this one from another
   * @param {Vec2} other other vector
   * @returns result of this - other
   */
  sub(other) {
    return new Vec2(this.x - other.x, this.y - other.y);
  }

  /**
   * Scales the current vector by s.  Same as mul but does not return a NEW vector
   * @param {*} s 
   * @returns self
   */
  scale(s=1){
    this.x *=s;
    this.y *=s;
    return this;
  }

  /**
   * creates the new vector resulting from multiplying this vector with the scalar
   * @param {number} scalar the scalar
   * @returns result of this * scalar
   */
  mul(scalar) {
    return new Vec2(this.x * scalar, this.y * scalar);
  }
  /**
   * creates the new vector resulting from dividing this vector with the scalar
   * @param {number}  scalar the scalar
   * @returns result of this / scalar
   */
  div(scalar) {
    return new Vec2(this.x / scalar, this.y / scalar);
  }
  /**
   * creates the new vector resulting from the dot product between the 2 vectors
   * @param {Vec2} other other vector
   * @returns result of this dot other
   */
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }
  //idk why you would need this though
  /* cross(other) {
	  return new Vec2(this.x*other.w - this.w*other.y, this.w*other.x - this.x*other.z, this.x*other.y - this.y*other.x);
  } */


  reflect( normal ){
    return  normal.mul( 2*this.dot(normal) ).sub( this );
  }

  setZero(){
    this.x=0.0;
    this.y=0.0;
  }

  // util functions
  /**
   * length of the vector
   * @returns length of the vector
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  distanceTo( other ){
    let d = new Vec2( other.x-this.x , other.y-this.y );
    return d.length();
  }

  /**
   * returns a new normalized vector
   * @returns normalized version of this vector
   */
  normalized() {
    return new Vec2(this.x / this.length(), this.y / this.length());
  }

  /**
   * normalizes this vector
   */
  normalize() {
    this.x = this.x / this.length();
    this.y = this.y / this.length();
  }

  /**
   * Rotate this vector theta radians
   * @param {*} theta 
   */
  rotate( theta ){
    let cos = Math.cos( theta );
    let sin = Math.sin( theta );
    let x = this.x;
    let y = this.y;
    let xp = x*cos - y*sin;
    let yp = x*sin + y*cos;
    this.x=xp;
    this.y=yp;
    //return  new Vec2( xp, yp );
  }
  
  rotDegrees( degrees ){
    this.rotate( degrees * Math.PI/180 );
  }

  newRotated( theta ){
    let cos = Math.cos( theta );
    let sin = Math.sin( theta );
    let x = this.x;
    let y = this.y;
    let xp = x*cos - y*sin;
    let yp = x*sin + y*cos;
    return new Vec2( xp,yp );
  }

  /**
   * Copy the current vector
   * @returns a new vector with the same x,y
   */
  cpy(){
    return new Vec2( this.x , this.y );
  }

  /**
   * Same as cpy
   * @returns a new vector with the same x,y
   */
  clone(){
    return this.cpy();
  }

  /** Updates the current vector to the x and y of the input arg */
  apply( newPos ){
    this.x=newPos.x;
    this.y=newPos.y;
  }

  /**
   * Get the vector as an array.
   * @returns array [x,y]
   */
  toArray(){
    return [this.x , this.y];
  }

  toString(){
    return "("+this.x + ' ' + this.y+")";
  }

  wrap( width=700 , height=700 ){
    let x = this.x;
    let y = this.y;

    if( x<0 ){
      x = x + width;
    }
    else if( x>= width ){
      x = x - width;
    }
  
    if( y<0 ){
      y = y + height;
    }
    else if( y >= height ){
      y = y - height;
    }
  
    this.x = x;
    this.y = y;
  }

  
  static addVectors(a,b){
    return new Vec2(a.x + b.x , a.y + b.y);
  }

  static subtractVectors(a,b){
    return new Vec2(a.x - b.x , a.y - b.y);
  }

  // identities
  static up() {
    return new Vec2(0, 1);
  }
  static down() {
    return new Vec2(0, -1);
  }
  static left() {
    return new Vec2(1, 0);
  }
  static right() {
    return new Vec2(-1, 0);
  }
  static zero() {
    return new Vec2(0, 0);
  }

}
