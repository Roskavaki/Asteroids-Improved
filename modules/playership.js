import { spaceobj } from "./spaceobj.js";
import { rot } from "./spaceUtils.js";
import {bullet} from "./bullet.js";
import * as utils from "./spaceUtils.js";
import { tri } from "./shapes.js";

class playership extends spaceobj{

	constructor(objects , myVerts = null, colour = "red" ){
		super(objects , tri , colour);
		this.verts = tri;
		this.collisionLayer = 6;
		this.colour = colour;
		this.rotationSpeed = 15;
		this.fireSpeed = 3;

		this.wrap=true;
	}

	
	doDamage( x ){
		this.hp-=x;
		if( this.hp<=0){
			console.log('player dies')	
		}
	}

	thrust( inp ){
		var thrust = rot( inp , this.rotation );
		this.velocity = [  
			this.velocity[0] + thrust[0] ,
			this.velocity[1] + thrust[1] ];
	}

	rotateLeft(){
		this.rotation += -this.rotationSpeed * 3.14/180;
	}

	rotateRight(){
		this.rotation += this.rotationSpeed * 3.14/180;
	}

	fire( bullets ){
		let b = new bullet( 3 );
		let fwd = utils.normalize( this.forward() );
		b.velocity =  utils.addVec( this.velocity , utils.mulVec(fwd , -this.fireSpeed)   );
		b.position = [...this.position];
		bullets.push( b );
	}
	
}

export {playership}