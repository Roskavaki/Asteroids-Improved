import { obj  } from "../obj.js";
import { circleDefault } from "../utils/spaceUtils.js";

export class BulletV2 extends obj{
	constructor( objects , radius=4 ){
		super(objects , null , "orange" , 5);
		this.radius=radius;
		
		this.velocity = [0,0];
		this.firedby = "player";

		this.collisionRadius = radius;
	}

	update(){
		this.addPosition(this.velocity);
	}

	onCollision( other ){
		//console.log('collided with' + other);
		other.doDamage( 5 );

		this.markedForDestroy=true;
	}

	doDamage(x){
		this.markedForDestroy=true;
	}

	addPosition( offset ){
		this.position[0] += offset[0];
		this.position[1] += offset[1];
	}

	draw(ctx){
		circleDefault(ctx , this.position , this.radius , this.color);
	}
}