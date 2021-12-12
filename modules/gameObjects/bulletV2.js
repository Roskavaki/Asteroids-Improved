import { CircleCollider } from "../colliders/circleCollider.js";
import { obj  } from "../obj.js";
import { checkOutOfBounds, circleDefault } from "../utils/spaceUtils.js";
import { Vec2 } from "../utils/vec2.js";

export class BulletV2 extends obj{
	constructor( objects , radius=4 ){
		super(objects , null , "orange" , 5);
		this.radius=radius;
		
		this.velocity = new Vec2(0,0);
		this.firedby = "player";

		this.collisionRadius = radius;

		this.collisionLayer = 0;
		this.canCollide=true;

		this.damage = 5;

		this.mass = 1;

		this.collider = new CircleCollider(radius);

		//console.log( 'BulletV2' );
	}

	update(){
		let oob = checkOutOfBounds( [this.position.x , this.position.y ] )

		if( oob ){
			this.markedForDestroy=true;
		}
		else{
			this.addPosition(this.velocity);
		}
	}

	onCollision( other ){
		//console.log('collided with' + other);
		other.doDamage( this.damage );

		this.markedForDestroy=true;
	}

	doDamage(x){
		this.markedForDestroy=true;
	}

	addPosition( offset ){
		this.position =  this.position.add( offset );
	//	this.position[0] += offset[0];
	//	this.position[1] += offset[1];
	}

	draw(ctx){
		circleDefault(ctx , [this.position.x , this.position.y] , this.radius , this.color);
	}
}