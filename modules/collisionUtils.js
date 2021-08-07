/**
 * File to generally put collision helper functions
 */
import { distance } from "./spaceUtils.js";

/**
 * Check if two coordinates are
 * within a certain range of each other
 * @param {*} p1 a point
 * @param {*} p2 a point
 * @param {*} radius a distance between
 * @returns true or false
 */
function checkInsideCircle( p1=[0,0] , p2=[1,1] , radius=1 ){
	let d = distance(p1,p2);
	//console.log( d )
	return ( d < radius);
}

/** Checks every object against every other object
 * Objects that cannot collide are skipped
 */
 function checkCollisions( objects){
	for( let i=0; i< objects.length; i++ ){
		let objectA = objects[i];

		if( objectA.canCollide ){
			for( let j=i+1; j<objects.length; j++ ){			
				let objectB = objects[j];

				if( objectB.canCollide ){
					let collision = checkCollision( objectA , objectB );

					if( collision ){
						objectA.onCollision( objectB );
						objectB.onCollision( objectA );
					}
				}

			}			
		}
	}
}

/**
 * Check for collision between A and B
 * @param {*} objectA 
 * @param {*} objectB 
 * @returns true if A and B have collided
 */
 function checkCollision( objectA , objectB ){
	let layerA = objectA.collisionLayer;
	let layerB = objectB.collisionLayer;

	let canCollide = (layerA  <=  layerB);

	if( canCollide ){
		let totalRadius = objectA.collisionRadius + objectB.collisionRadius;
		if( checkInsideCircle( objectA.position , objectB.position , totalRadius )){
			return true;
		}
	}
	return false;
}

/**
 * Check for collisions between a single object 
 * and a list of other objects
 * @param {*} x A single object
 * @param {*} objects an array of objects
 * @returns the first object which collided with x
 */
 function checkCollisionsOneToMany( x , objects=[] ){
	for ( let ob in objects ){
		//console.log( ob )
		let curr = objects[ob];

		let layerA =  curr.collisionLayer;
		let layerB = x.collisionLayer;

		let collide = (layerA  <=  layerB);

		if( collide ){
			if( checkInsideCircle(x.position , curr.position , curr.collisionRadius )){
				return curr;
			}			
		}
	}
	return false;
}

export { checkInsideCircle }
export { checkCollision }
export { checkCollisions }
export { checkCollisionsOneToMany }