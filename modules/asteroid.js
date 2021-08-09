import { spaceobj } from "./spaceobj.js";
import { rot , addVec } from "./utils/spaceUtils.js";
import { scoreboard } from "./scoreboard.js";
import * as utils from "./utils/spaceUtils.js";
import { Vec2 } from "./utils/vec2.js";

class asteroid extends spaceobj{
	constructor( objects , radi = 64 , colour = "yellow" ){

	//	console.log(' asteroid created' );

		super( objects , null ,colour );
		this.radius = radi;
		this.colour = colour;
		this.maxVariance = 14;
		this.verts = this.generateAstroid();

		this.collisionRadius = radi + this.maxVariance/2;
		this.canCollide = true;
		this.collisionLayer = 3;
		
		this.angularVelocity = Math.random()*2;

		this.wrap=true;		
	}

	/* 
		let diff =  utils.difference( player.position , collision.position );
		let norm = utils.normalize( diff );
		let mag  = utils.mulVec( norm , -2 );
		player.doDamage( 2 );
		player.velocity = mag;
		*/

	onCollision( other ){
		// Type of other object
		let ast = other instanceof asteroid;

		if( ast ){
			let diff = this.position.sub( other.position );
			diff.normalize();
			let mag = diff.mul( 1 );

			this.position = this.position.add( mag );
			this.velocity = mag;
		}
	}

	doDamage( x ){

		if( !this.markedForDestroy ){
			this.hp-=x;
			let rad = this.radius;

			if( this.hp<=0){
				
				if( rad > 10){

					let axis = this.velocity.cpy();
					
					let div1 = axis.mul(  rad + 10 );
					let div2 = axis.mul( -rad - 10 );
					
					// A small offset is needed to prevent divide by zero which makes the children dissapear
					//[ rad/2+0.1 , 0]  [-rad/2-0.1 , 0]
					//
					this.createChild( div1 );
					this.createChild( div2 );
				}

				scoreboard.add(1);
				super.destroy();
			}
		}


	}

	createChild( offset ){
		
		let child = new asteroid( this.objects , this.radius/2 , this.colour);

		child.position =  new Vec2 ( this.position.x + offset.x  , this.position.y + offset.y  );
		child.velocity =  this.velocity.cpy();

		let randomMultiplier = 4;

		let randomVelocity = new Vec2 ( 
			-randomMultiplier/2 + Math.random()*randomMultiplier ,
			-randomMultiplier/2 + Math.random()*randomMultiplier );

		child.velocity = child.velocity.add( randomVelocity );
		this.objects.push( child );		
	}

	generateAstroid(){
		let step = 2*Math.PI/20;
		let verts = [];
		let rad = this.radius;
		let variance = this.maxVariance;
		let first;

		for( var i=0; i<=2*Math.PI; i=i+ step){
			let r = rad + Math.random() * variance;
			let p = [ Math.sin(i)*r ,  Math.cos(i)*r ]
			verts.push( p );
			if( i==0)
				first=p;
		}
		verts.push(first);

		return verts;
	}

}

export {asteroid}