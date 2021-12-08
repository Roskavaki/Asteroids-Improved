import * as utils from "./utils/spaceUtils.js";
import { Vec2 } from "./utils/vec2.js";
import { Transform } from "./physics/transform.js";
import { Rigidbody } from "./physics/rigidbody.js";

class obj {
  constructor(
    objects,
    myVerts,
    colour = "green",
    collisionLayer = 0,
    objectName = "obj"
  ) {
    this.verts = [];

    if (myVerts) {
      this.verts = myVerts;
    }

    this.colour = colour;
    this.position = new Vec2(0,0);
    this.localposition = new Vec2(0,0);
    this.rotation = 0;
    this.localrotation = 0;

    this.transform=null;
    this.rigidbody=null;
    this.collider=null;
    this.canCollide = false;
    this.collisionRadius = 10;
    this.collisionLayer = collisionLayer;
    this.drawCollider = false;
    this.mass = 10;
    this.colliderType = 1;// 1 circle

    this.markedForDestroy = false;

    // Copied by reference so that we can spawn objects
    this.objects = objects;

    this.objectName = objectName;

    this.children = [];
    this.parent = null;
  }

  update(deltaT, input) {
    this.updateRelativePosition();
  }

  updateRelativePosition(){
    if( this.parent !== null && this.parent!==undefined){      
      this.rotation = this.parent.rotation + this.localrotation;
      this.position = this.parent.position.add( this.localposition.newRotated( this.parent.rotation  ) ) ;
    }
  }

  updateChildren(deltaT){
    this.children.forEach((child)=>{
      child.update(deltaT);
    });  
  }

  onCollision(other) {}

  onStart(inp){}



  getCollider(){
    return this.collider;
  }

  getCollisionRadius(){
    return this.collisionRadius;
  }

  getCollisionLayer(){
    return this.collisionLayer;
  }

  getCanCollide(){
    return this.canCollide;
  }

  getColliderType(){
    return this.colliderType;
  }



  globalToLocalCoordinate(x,y,r){
    return new Vec2( x*Math.cos(r) + y*Math.sin(r) , -x*Math.sin(r) + y*Math.cos(r) );
  }

  addPosition(offset, wrap = false) {
    //this.position[0] += offset[0];
    //this.position[1] += offset[1];
	  this.position = this.position.add( offset );

    if (wrap) {
		  this.position.wrap();
    }
  }

  addRotation( offset ){
    this.rotation += offset;
  }

  addVert(x, y) {
    this.verts.push([x, y]);
  }

  addChild( child ){
    child.addParent(this);
    this.children.push( child );
  }

  addParent( parent ){
    this.parent = parent;
  }

  removeChild( child ){
    this.children = this.children.filter(item => item !== child);
  }

  removeParent(){
    this.parent=null;
  }

  /** Call this to destroy the object */
  destroy() {
    this.markedForDestroy = true;
  }

  draw(ctx, wrap = false) {

    //Debug circle
    if( this.drawCollider ){
      utils.circleDefault(ctx , this.position.toArray() , this.collisionRadius , this.colour);
    }

    this.children.forEach((child)=>{
      child.draw(ctx, wrap);
    });

    if( this.verts ){
      let pos = this.position.toArray();
      utils.drawVerts(
        ctx,
        this.verts,
        this.rotation,
        pos,
        this.colour,
        wrap
      );      
    }

  }
}

export { obj };
