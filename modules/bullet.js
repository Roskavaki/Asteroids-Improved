import {obj} from "./obj.js";
import {circleDefault } from "./utils/spaceUtils.js";

class bullet extends obj{
	constructor( objects , radius ){
		super(objects , null , "red" , 5);
		this.radius=radius;
		this.velocity = [0,0];
		this.firedby = "player";
	}

	update(){
		this.addPosition(this.velocity);
	}

	onCollision( other ){
		//console.log('collided with' + other);
		other.doDamage( 10 );
	}

	addPosition( offset ){
		this.position[0] += offset[0];
		this.position[1] += offset[1];
	}

	draw(ctx){
		circleDefault(ctx , this.position , this.radius , this.color);
	}
}

export {bullet}