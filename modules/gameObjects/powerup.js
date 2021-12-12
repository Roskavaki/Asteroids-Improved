import { CircleCollider } from "../colliders/circleCollider.js";
import { Rigidbody } from "../physics/rigidbody.js";
import { Transform } from "../physics/transform.js";
import { spaceobj } from "../spaceobj.js";
import { sqr } from "../shapes.js";
import { Vec2 } from "../utils/vec2.js";

export class Powerup extends spaceobj{
	constructor( objects , colour = "yellow" , mass=10 , name="asteroid", 
	position=new Vec2(0,0) ,velocity=new Vec2(0,0) ){

		super( objects , null ,colour  );

		this.verts = sqr;
		this.collisionRadius = 12;
		this.angularVelocity = Math.random()*2;
		this.position = position;
		this.velocity = velocity;
		this.canCollide = true;
		this.name=name;

		this.wrap=true;


		this.rigidbody = new Rigidbody( velocity , this.angularVelocity );
		this.transform = new Transform(position);
		this.collider = new CircleCollider( this.collisionRadius );

		this.collider.trigger=true;
		this.upgrade = "multishot";
	}

	
}