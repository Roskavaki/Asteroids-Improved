import { spaceobj } from "./spaceobj.js";
import { rot } from "./utils/spaceUtils.js";
import {bullet} from "./bullet.js";
import * as utils from "./utils/spaceUtils.js";
import { tri } from "./shapes.js";

class playership extends spaceobj{

	constructor(objects , myVerts = null, colour = "red" ){
		super(objects , tri , colour);
		this.verts = tri;

		this.canCollide = true;
		this.collisionLayer = 6;

		this.colour = colour;
		this.rotationSpeed = 15;
		this.fireSpeed = 3;

		this.wrap=true;

		this.hpBarPosition = "nw";//northwest
	}

	draw( ctx ){
		// This object should wrap around when it goes offscreen
		super.draw(ctx , this.wrap );

		this.drawHpBar(ctx , this.hp , this.hpBarPosition);

		//Debug circle
		//utils.circleDefault(ctx , this.position , this.collisionRadius , this.color);
	}

	drawHpBar(ctx , hp , hpBarPosition){
		let p = 5 ;
		let q = 30;

		if( hpBarPosition === "nw" ){
			ctx.fillStyle = "yellow";
			ctx.fillRect( p , q , hp*5 , 5 );
		}
	}
	
	doDamage( x ){
		this.hp-=x;
		if( this.hp<=0){
			this.hp=0;
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

	checkPlayerCollisions(player=this, others = []) {
		let collision = utils.checkCollisionsOneToMany(player, others);
		if (collision) {
			console.log("Player collision");
			let diff = utils.difference(player.position, collision.position);
			let norm = utils.normalize(diff);
			let mag = utils.mulVec(norm, -2);
			player.doDamage( 5 );
			player.velocity = mag;
		}
	}
	
}

export {playership}