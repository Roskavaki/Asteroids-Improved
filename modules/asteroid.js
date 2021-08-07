import { spaceobj } from "./spaceobj.js";
import { rot , addVec } from "./utils/spaceUtils.js";
import { scoreboard } from "./scoreboard.js";
import * as utils from "./utils/spaceUtils.js";

class asteroid extends spaceobj{
	constructor( objects , radi = 64 , colour = "red" ){

		console.log(' asteroid created' )
		super( objects , null , "yellow" );
		this.radius = radi;
		this.colour = colour;
		this.maxVariance = 14;
		this.verts = this.generateAstroid();

		this.collisionRadius = radi + this.maxVariance/2;
		this.canCollide = true;
		
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
			let diff = utils.difference( this.position , other.position);
			let norm = utils.normalize( diff );
			let mag = utils.mulVec(norm ,-1);
			this.position = addVec( this.position , utils.mulVec( norm ,-1 ) );
			this.velocity = mag;
		}
	}

	doDamage( x ){

		if( !this.markedForDestroy ){
			this.hp-=x;
			let rad = this.radius;

			if( this.hp<=0){
				
				if( rad > 10){

					let divideAxis = utils.rot( utils.normalize(this.velocity) , 90* 3.14/180) ;
					
					// A small offset is needed to prevent divide by zero which makes the children dissapear
					//[ rad/2+0.1 , 0]  [-rad/2-0.1 , 0]
					//
					this.createChild( utils.mulVec( divideAxis , rad/2 +1 ) );
					this.createChild( utils.mulVec( divideAxis , -rad/2-1 )  );
				}

				scoreboard.add(1);
				super.destroy();
			}
		}


	}

	createChild( offset = [0,0] ){
		
		let child = new asteroid( this.objects , this.radius/2 , this.colour);

		child.position =  [ this.position[0] + offset[0]  , this.position[1] + offset[1]  ];
		child.velocity =  [ this.velocity[0]  , this.velocity[1] ];

		let randomMultiplier = 4;

		let randomVelocity = [ -randomMultiplier/2 + Math.random()*randomMultiplier ,
			 -randomMultiplier/2 + Math.random()*randomMultiplier ];

		child.velocity = addVec( child.velocity , randomVelocity );

		console.log( child.position )

		this.objects.push( child );
		
		//console.log( this.objects );
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