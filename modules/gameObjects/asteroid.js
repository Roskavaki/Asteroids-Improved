import { spaceobj } from "../spaceobj.js";
import { rot , addVec } from "../utils/spaceUtils.js";
import { scoreboard } from "../scoreboard.js";
import * as utils from "../utils/spaceUtils.js";
import { Vec2 } from "../utils/vec2.js";
import { CircleCollider } from "../colliders/circleCollider.js";

class asteroid extends spaceobj{
	constructor( objects , radi = 64 , colour = "yellow" , mass=10 ){
		super( objects , null ,colour );
		this.radius = radi;

		this.colour = colour;
		this.maxVariance = 14;
		this.mass = mass;
		this.verts = this.generateAstroid();

		let rad = radi + this.maxVariance/2;
		this.collisionRadius = rad;
		this.canCollide = true;
		this.collisionLayer = 3;
		this.drawCollider = false;
		
		this.angularVelocity = Math.random()*2;

		this.wrap=true;

		this.collisionDisabledWith = null;

		this.collider = new CircleCollider( rad );
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

		if( other!== null ){
			//this.basicCollision(other);
		}
	}

	//Original, unrealistic collision code
	basicCollision(other){
		let ast = other instanceof asteroid;
		if( ast  ){
			let diff = this.position.sub( other.position );
			diff.normalize();
			let mag = diff.mul( 1 );

			this.position = this.position.add( mag.mul(2) );
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
					axis.rotDegrees( 90 );
					let r = this.collisionRadius/2 + 1;
					let div1 = axis.mul( -r );
					let div2 = axis.mul(  r );
					
					// A small offset is needed to prevent divide by zero which makes the children dissapear
					//[ rad/2+0.1 , 0]  [-rad/2-0.1 , 0]
					//
					let c1 = this.createChild( div1 );
					let c2 = this.createChild( div2 , c1 );
					c1.collisionDisabledWith = c2;
				}

				scoreboard.add(1);
				super.destroy();
			}
		}
	}

	delayedEnableBrotherCollision(){
		this.canCollide=false;
		setTimeout(()=>{
			this.canCollide=true;
			this.collisionDisabledWith = null;
		}, 1500);
	}

	createChild( offset , collisionDisabledWith=null ){		
		let child = new asteroid( this.objects , 
			this.radius/2 , this.colour , this.mass/2);

		child.position =  new Vec2 ( this.position.x + offset.x , this.position.y + offset.y  );
		child.velocity =  this.velocity.cpy();


		let randomMultiplier = 1;

		let randomVelocity = new Vec2 ( 
			-randomMultiplier/2 + Math.random()*randomMultiplier ,
			-randomMultiplier/2 + Math.random()*randomMultiplier );

		//let axis = this.velocity.normalized().mul( Math.random() * randomMultiplier );
		//axis.rotDegrees( 90 );

		//child.velocity = child.velocity.add( randomVelocity );

		child.delayedEnableBrotherCollision();

		child.collisionDisabledWith = collisionDisabledWith;

		this.objects.push( child );

		return child;
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