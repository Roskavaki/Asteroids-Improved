import { spaceobj } from "./spaceobj.js";
import { rot , addVec } from "./spaceUtils.js";
import { scoreboard } from "./scoreboard.js";

class asteroid extends spaceobj{
	constructor( objects , radi = 64 , colour = "red" ){
		super( objects , null , "yellow" );
		this.radius = radi;
		this.colour = colour;
		this.maxVariance = 14;
		this.verts = this.generateAstroid();
		this.collisionRadius = radi + this.maxVariance/2;
		
		this.angularVelocity = Math.random()*2;

		this.wrap=true;
	}

	doDamage( x ){
		this.hp-=x;
		if( this.hp<=0){
			if( this.radius > 10){
				this.createChild(  );
				this.createChild(  );				
			}

			scoreboard.add(1);

			super.destroy();		
		}
	}

	createChild(  ){
		let child = new asteroid( this.objects , this.radius/2 , this.colour);
		child.position =  [...this.position];
		child.velocity =  [...this.velocity];
		child.velocity = addVec( child.velocity , [ -1 + Math.random()*2 , -1 + Math.random()*2 ]);
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