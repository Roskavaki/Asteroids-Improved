import { spaceobj } from "./spaceobj.js";
import { rot , addVec } from "./spaceUtils.js";
import { scoreboard } from "./scoreboard.js";
import * as utils from "./spaceUtils.js";

class asteroid extends spaceobj{
	constructor( objects , radi = 64 , colour = "red" ){

		console.log(' asteroid created' )
		super( objects , null , "yellow" );
		this.radius = radi;
		this.colour = colour;
		this.maxVariance = 14;
		this.verts = this.generateAstroid();
		this.collisionRadius = radi + this.maxVariance/2;
		
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
		let ast = other instanceof asteroid;

		if( ast ){
			let diff = utils.difference( this.position , other.position);
			let norm = utils.normalize( diff );
			let mag = utils.mulVec(norm ,-1);

			this.position = addVec( this.position , utils.mulVec(norm ,-1 ) );

			this.velocity = mag;
		}
		
		//console.log( type );
	}

	doDamage( x ){
		this.hp-=x;

		if( this.hp<=0){
			console.log( this.radius );
			if( this.radius > 10){
				this.createChild( [0.1 , 0] );
				this.createChild( [-0.1, 0] );
			}

			scoreboard.add(1);
			super.destroy();
		}
	}

	createChild( offset = [0,0] ){
		
		let child = new asteroid( this.objects , this.radius/2 , this.colour);

		child.position =  [ this.position[0] + offset[0]  , this.position[1] + offset[1]  ];
		child.velocity =  [ this.velocity[0]  , this.velocity[1] ];

		let randomVelocity = [ -1 + Math.random()*2 , -1 + Math.random()*2 ];

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