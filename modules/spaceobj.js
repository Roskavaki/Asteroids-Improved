import { obj } from "./obj.js";
import {rot , circleDefault} from "./utils/spaceUtils.js";

class spaceobj extends obj {
	constructor(objects, myVerts , colour = "red" , wrap = false ){
		super(objects , myVerts , colour);
		this.velocity = [0,0];
		this.angularVelocity = 0;
		this.collisionRadius = 10;
		this.colour = colour;
		this.markedForDestroy = false;
		this.hp = 20;
		
		this.wrap = wrap;
		
	}

	forward(){
		var ret = rot( [0,1] , this.rotation);
		return ret;
	}

	update(){
		super.update();
		this.updateRotation();
		this.updatePosition();
	}

	doDamage( x ){
		this.hp-=x;
		if( this.hp<=0){
			console.log('hp gone')
			super.destroy();			
		}
	}

	draw( ctx ){
		// This object should wrap around when it goes offscreen
		super.draw(ctx , this.wrap );

		//Debug circle
		//circleDefault(ctx , this.position , this.collisionRadius , this.color);
	}

	updateRotation(){
		this.rotation += this.angularVelocity* 3.14/180;
	}

	updatePosition(){
		super.addPosition( this.velocity , this.wrap );
	}
}

export {spaceobj}