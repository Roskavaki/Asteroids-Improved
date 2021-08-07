import { checkCollision , checkCollisions , checkCollisionsOneToMany , checkInsideCircle } from "./collisionUtils.js";

/** Wrap a coordinate around to the opposite side of the screen to create 
 * a toroidal coordinate system
 */
function wrapCoordinates( p , width=700, height=700){
	let x = p[0];
	let y = p[1];

	if( x<0){
		x=x+width;
	}
	else if(x>= width){
		x = x-width;
	}

	if( y<0 ){
		y=y+height;
	}
	else if( y>=height){
		y=y-height;
	}

	return [x,y];
}

function difference( p1=[1,1] , p2=[2,2]){
	return [ p2[0]-p1[0] , p2[1]-p1[1] ];
}

function length( v=[1,1] ){
	return Math.sqrt( v[0]*v[0] + v[1]*v[1] );
}

function distance( p1 , p2 ){
	let x = p2[0]-p1[0];
	let y = p2[1]-p1[1];
	return Math.sqrt( x*x + y*y );
}

function midpoint(p1=[1,1],p2=[1,1]){
	return [ (p2[0]+p1[0])/2 , (p2[1]+p1[1])/2 ];
}

function normalize( v=[1,1] ){
	let len = length(v);
	return [ v[0]/len , v[1]/len ];
}

function normalizedVectorTo( start , end ){
	return( normalize(difference(start , end )));
}

function addVec( a=[0,0] , b=[0,0] ){
	let x = a[0]+b[0];
	let y = a[1]+b[1];
	return [ x , y ];
}

/**  Multiply a vector by a constant */
function mulVec( vec=[0,0] , num=1 ){
	return [vec[0]*num , vec[1]*num];
}

function checkOutOfBounds( p=[1,1] , width=100 , height=100 ){
	let x = p[0];
	let y = p[1];

	if( x>width) return true;
	if( x<0 ) return true;
	if( y<0) return true;
	if( y>height) return true;

	return false;
}


function lineDefault( ctx , start , end , colour){
	ctx.strokeStyle = colour;
	ctx.beginPath();
	ctx.moveTo(start[0], start[1]);
	ctx.lineTo(end[0], end[1]);
	ctx.stroke();
}

function circleDefault( ctx , position=[0,0] , radius=5 , colour="red" ){
	ctx.strokeStyle = colour;
	ctx.beginPath();
	ctx.arc(position[0], position[1], radius,  0 , 2 * Math.PI );
	ctx.stroke();
}

/** Lerp in one dimension */
function lerp( a , b , ratio){
	return a * (1 - ratio) + b * ratio;
}

/** Lerp in 2 dimensions */
function lerpXY(x1 , y1 , x2 , y2 , ratio){
	let x = lerp( x1 , x2 , ratio );
	let y = lerp( y1, y2 , ratio );
	return [x, y ];
}

/** Draw a single dot */
function pix( ctx, x , y , color="black"){
	ctx.fillStyle = color;
	ctx.fillRect( x , y, 1, 1);
}

/** Draw a line one pixel at a time, instead of using the default canvas command */
function line(ctx, x1 , y1 , x2 , y2 , color="black" , wrap=false){
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
}

/**
 * Adds two vector twos together
 * @param {*} point 
 * @param {*} offset 
 * @returns 
 */
function tf( point , offset ){
	return [ point[0] + offset[0] , point[1] + offset[1] ];
}

/**
 * Rotate a vector by theta (radians)
 * @param {*} point 
 * @param {*} theta 
 * @returns 
 */
function rot( point,  theta ){
	let cos = Math.cos( theta );
	let sin = Math.sin( theta );
	let x = point[0];
	let y = point[1];
	let xp = x*cos - y*sin;
	let yp = x*sin + y*cos;
	return  [ xp, yp ] ;
}

function rotDegrees( point , theta ){
	return rot( point , theta * Math.PI/180 );
}

function drawVerts(ctx , verts , rotation=0 , position=[0,0], color="red" , wrap=false ){
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


export { distance }
export { checkCollisions }
export { rotDegrees }
export { lineDefault  , circleDefault }
export {  line , pix , lerp  }
export { difference , rot , tf , normalizedVectorTo  }
export { midpoint , normalize , addVec , mulVec }
export { checkInsideCircle }
export { checkOutOfBounds }
export { checkCollisionsOneToMany , }
export { checkCollision }
export { wrapCoordinates }
export { drawVerts }