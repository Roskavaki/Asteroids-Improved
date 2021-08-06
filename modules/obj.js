import * as utils from "./spaceUtils.js";

class obj{
	constructor( objects , myVerts ,  colour = "green" , collisionLayer=4 ){
		this.verts = [];

		if( myVerts ){
			this.verts = myVerts;
		}
			
		this.color = colour;
		this.position = [0,0];
		this.rotation = 0;

		this.collisionRadius = 1;
		this.collisionLayer = collisionLayer;

		this.markedForDestroy = false;

		// Copied by reference so that we can spawn objects
		this.objects = objects;
	}

	update(){}

	onCollision( other ){}

	addPosition( offset , wrap=false ){
		this.position[0] += offset[0];
		this.position[1] += offset[1];

		if( wrap ){
			this.position = utils.wrapCoordinates( this.position );
		}

	}

	addVert (x,y){
		this.verts.push( [x , y] );
	}

	destroy(){
		this.markedForDestroy = true;
	}	

	draw( ctx , wrap=false ){
		utils.drawVerts( ctx , this.verts , this.rotation , this.position , this.color , wrap);
		/*
		var verts = this.verts;
		var color = this.color;
		if( verts.length>1){
			var prev = verts[0];
			for( var i=1; i<verts.length; i++){
				var curr = verts[i];
				var p1 = prev;
				var p2 = curr;
				p1 = utils.rot( p1 , this.rotation );
				p2 = utils.rot( p2 , this.rotation );

				p1 = utils.tf( p1 , this.position );
				p2 = utils.tf( p2 , this.position );

				utils.line( ctx , p1[0] , p1[1], p2[0], p2[1] , color);
				prev = curr;
			}
		}
		*/
	}
}

export {obj}