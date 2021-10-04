import { checkCollision , checkCollisions , 
	checkCollisionsOneToMany , checkInsideCircle  } from "../physics/collisionUtils.js";

import { pix , line , drawVerts } from "./drawingUtils.js";
import { circleDefault , lineDefault } from "./drawingUtils.js";

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

function checkOutOfBounds( p=[1,1] , width=700 , height=700 ){
	let x = p[0];
	let y = p[1];

	if( x>width) return true;
	if( x<0 ) return true;
	if( y<0) return true;
	if( y>height) return true;

	return false;
}



/** Lerp in one dimension */
function lerp( a , b , ratio){
	return a * (1 - ratio) + b * ratio;
}

/** Lerp in 2 dimensions */
export function lerpXY(x1 , y1 , x2 , y2 , ratio){
	let x = lerp( x1 , x2 , ratio );
	let y = lerp( y1, y2 , ratio );
	return [x, y ];
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
 * @returns rotated vector
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



export { distance }
export { checkCollisions }

export { rotDegrees }
export { lineDefault  , circleDefault }
export { line , pix , lerp  }
export { difference , rot , tf , normalizedVectorTo  }
export { midpoint , normalize , addVec , mulVec }
export { checkInsideCircle }
export { checkOutOfBounds }
export { checkCollisionsOneToMany , }
export { checkCollision }
export { wrapCoordinates }
export { drawVerts }