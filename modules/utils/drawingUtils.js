/** 
 * A place mostly for functions for drawing things on the screen
 */

import { rot , tf , wrapCoordinates , lerpXY } from "./spaceUtils.js";


/** Draw a line one pixel at a time, instead of using the default canvas command */
function line(ctx, x1 , y1 , x2 , y2 , color="red" , wrap=false){
	ctx.save();
	for( let aa=0; aa<1; aa+=0.05){
		let p = lerpXY( x1 , y1 , x2 , y2 , aa);

		if( wrap ){
			let xy=wrapCoordinates( p );
			pix( ctx , xy[0] , xy[1] ,  color);			
		}
		else{
			pix( ctx , p[0] ,p[1] ,  color);
		}
	}
	ctx.restore();	
}

export function lineBetweenVector2( ctx , p1 , p2 , color="red" , wrap=false){
	line( ctx, p1.x , p1.y , p2.x , p2.y , color , wrap);
}

/**
 * Draw a line using the ordinary canvas method
 * @param {*} ctx 
 * @param {*} start 
 * @param {*} end 
 * @param {*} colour 
 */
function lineDefault( ctx , start , end , colour){
	ctx.save();

	ctx.strokeStyle = colour;
	ctx.beginPath();
	ctx.moveTo(start[0], start[1]);
	ctx.lineTo(end[0], end[1]);
	ctx.stroke();

	ctx.restore();
}

function circleDefault( ctx , position=[0,0] , radius=5 , colour="red" ){
	ctx.save();

	ctx.strokeStyle = colour;
	ctx.beginPath();
	ctx.arc(position[0], position[1], radius,  0 , 2 * Math.PI );
	ctx.stroke();

	ctx.restore();
}

/** Draw a single dot */
function pix( ctx, x , y , color="black"){

	ctx.fillStyle = color;
	ctx.fillRect( x , y, 1, 1);

}


function drawVerts(ctx , verts=[] , rotation=0 , position=[10,10], color="red" , wrap=false ){
	//var verts = this.verts;
	//var color = this.color;
	if( verts.length>1){
		let prev = verts[0];
		for( let i=1; i<verts.length; i++){
			let curr = verts[i];
			let p1 = prev;
			let p2 = curr;

			p1 = rot( p1 , rotation );
			p2 = rot( p2 , rotation );

			p1 = tf( p1 , position );
			p2 = tf( p2 , position );

			line( ctx , p1[0] , p1[1], p2[0], p2[1] , color , wrap);
			prev = curr;
		}
	}
}

export { line }
export { drawVerts }
export { lineDefault , circleDefault }
export { pix }

