/**
 * File to generally put collision helper functions
 */
import { distance } from "./spaceUtils.js";

/**
 * Keep it square.
 * Keep it symetrical on the Upper-left to bottom-right diagonal 
 * because you don't know the order the objects may be checked in and we don't check duplicates ex: A-B and B-A.
 *
 */
export const collisionLayers = [
	[1, 1, 0, 0, 1], //other, general case
	[1, 1, 0, 1, 1], //player
	[0, 0, 0, 1, 1], //playerbullet
	[0, 1, 1, 1, 0], //asteroid
	[1, 1, 1, 0, 0] //enemybullet
];

export const collisionLayerNames = {
	"other":0,
	"player":1,
	"playerbullet":2,
	"asteroid":3,
	"enemybullet":4
}

export function checkCollisionLayers( layerA=0 , layerB=0 ){
	return ( collisionLayers[layerA][layerB] > 0);
}

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
 function checkCollisions( objects , restitution = 1 ){
	for( let i=0; i< objects.length; i++ ){
		let objectA = objects[i];

		if( objectA.canCollide ){
			for( let j=i+1; j<objects.length; j++ ){			
				let objectB = objects[j];

				if( objectB.canCollide ){
					let collision = checkCollisionCircleCircle( objectA , objectB );

					if( collision ){
						handleCollision( objectA , objectB , restitution );

						objectA.onCollision( objectB );
						objectB.onCollision( objectA );
					}
				}

			}			
		}
	}
}

function handleCollision( objectA , objectB , restitution ){
	handleCollisionCircleCircle( objectA , objectB , restitution );
}

function handleCollisionCircleCircle( objectA , objectB , restitution=1 ){

	let dir = objectB.position.sub( objectA.position );
	let d = dir.length();
	let totalRadius = objectA.collisionRadius + objectB.collisionRadius;

	if( d == 0.0 || d > totalRadius)
		return;

	dir.scale( 1.0/d );

	// amount to correct positions by
	let corr = (totalRadius-d) / 2.0;
	objectA.position.add2( dir.mul( -corr )  );
	objectB.position.add2( dir.mul(  corr )  );
	
	let v1 = objectA.velocity.dot(dir);
	let v2 = objectB.velocity.dot(dir);

	let m1 = objectA.mass;
	let m2 = objectB.mass;
	
	let newV1 = ( m1*v1 + m2*v2 - m2*(v1-v2)*restitution) / (m1+m2);
	let newV2 = ( m1*v1 + m2*v2 - m1*(v2-v1)*restitution) / (m1+m2);

	objectA.velocity.add2( dir.mul(newV1 - v1) );
	objectB.velocity.add2( dir.mul(newV2 - v2) );
}

/**
 * Check for collision between A and B
 * @param {*} objectA 
 * @param {*} objectB 
 * @returns true if A and B have collided
 */
function checkCollisionCircleCircle( objectA , objectB ){

	if(  objectA === objectB ){
		console.error( "object is colliding with itself" );
		return false;
	}

	let layerA = objectA.collisionLayer;
	let layerB = objectB.collisionLayer;

	// Check that the collision layers of the objects allow them to collide
	let canCollide = checkCollisionLayers( layerA , layerB );
	
	if( canCollide ){
		let totalRadius = objectA.collisionRadius + objectB.collisionRadius;

		let p1 = [objectA.position.x , objectA.position.y];
		let p2 = [objectB.position.x , objectB.position.y];
		if( checkInsideCircle( p1  , p2 , totalRadius )){
			//console.log( 'collision' );
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

		let layerA = curr.collisionLayer;
		let layerB = x.collisionLayer;

		let collide = (layerA  <=  layerB);

		if( curr !==  x ){
			let didhit = checkCollisionCircleCircle( x , curr );
			if( didhit ){
				return curr;
			}
		}
	}
	return false;
}



export { checkInsideCircle }
export { checkCollisionCircleCircle as checkCollision }
export { checkCollisions }
export { checkCollisionsOneToMany }
