/**
 * File to generally put collision helper functions
 */
import { distance } from "../utils/spaceUtils.js";
import { Vec2 } from "../utils/vec2.js";
import { closestPointOnSegment } from "./closestPointOnSegment.js";

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
 * Check if collision is enabled on each object, and their layers permit collision
 * @param {*} objectA 
 * @param {*} objectB 
 * @returns true if they are allowed to collide
 */
export function checkCanCollide( objectA , objectB ){

	if( objectA == null || objectB == null ){
		console.error( "A collision object is null" );
		return false;
	}

	if( !objectA.canCollide || !objectB.canCollide ) 
		return false;

	if(  objectA === objectB ){
		console.error( "object is colliding with itself" );
		return false;
	}

	let layerA = objectA.collisionLayer;
	let layerB = objectB.collisionLayer;

	// Check that the collision layers of the objects allow them to collide
	let canCollide = checkCollisionLayers( layerA , layerB );
	return canCollide;
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
					let collision = handleCollision( objectA , objectB );

					if( collision ){
						objectA.onCollision( objectB );
						objectB.onCollision( objectA );
					}
				}
			}			
		}
	}
}



function handleCollision( objectA , objectB , restitution=1 ){
	let colliderA = objectA.colliderType;
	let colliderB = objectB.colliderType;

	if( objectA == null || objectB == null ){
		console.log( 'null collision object');
		return false;
	}

	const circle = 1;
	const capsule =2;
	

	if( colliderA == circle ){
		if( colliderB == circle ){
			return handleCollisionCircleCircle( objectA , objectB , restitution );
		}
		else if( colliderB == capsule ){
			return handleCollisionCircleCapsule( objectA , objectB  , restitution );
		}
	}
	else if ( colliderA == capsule ){
		if( colliderB == circle ){
			return handleCollisionCircleCapsule( objectB , objectA ,  restitution );
		}
		else if( colliderB == capsule ){
			return handleCollisionCapsuleCapsule( objectA , objectB , restitution );
		}
	}
}

function handleCollisionCapsuleCapsule( objectA , objectB , restitution=1 ){
	//TODO
}

function handleCollisionCircleCapsule( circle , capsule , restitution=1 ){
		
	let canCollide = checkCanCollide( circle , capsule );
	if( !canCollide ){
		return false;
	}
	let objectA = circle;
	let objectB = capsule;
	
	let p1 = capsule.position.add( capsule.collider.p1 );
	let p2 = capsule.position.add( capsule.collider.p2 );

	let closest = closestPointOnSegment( circle.position , p1 , p2 );
	
	let dir = circle.position.sub( closest );

	let d = dir.length();

	let totalRadius = circle.collisionRadius + capsule.collider.collisionRadius;
	if( d==0.0 || d > totalRadius ){
		return false;
	}

	dir.scale( 1.0/d );

	// amount to correct positions by
	let corr = (totalRadius-d) / 1.0;
	objectA.position.add2( dir.mul( corr )  );

	//if( objectB.rigidboy.isKinematic )
	//objectB.position.add2( dir.mul(  corr )  );
	
	let v1 = objectA.velocity.dot(dir);
	let v2 = objectB.rigidbody.velocity.dot(dir);

	let m1 = objectA.mass;
	let m2 = objectB.mass;
	
	let newV1 = ( m1*v1 + m2*v2 - m2*(v1-v2)*restitution) / (m1+m2);
	let newV2 = ( m1*v1 + m2*v2 - m1*(v2-v1)*restitution) / (m1+m2);

	//circle
	objectA.velocity.add2( dir.mul(newV1 - v1) );

	//objectA.velocity.setZero();
	//objectB.velocity.add2( dir.mul(newV2 - v2) );

	return true;
}


function handleCollisionCircleCircle( objectA , objectB , restitution=1 ){

	let canCollide = checkCanCollide( objectA , objectB );
	if( !canCollide )
		return false;

	let dir = objectB.position.sub( objectA.position );
	let d = dir.length();
	let totalRadius = objectA.collisionRadius + objectB.collisionRadius;

	if( d == 0.0 || d > totalRadius)
		return false;

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

	return true;
}

function checkCollision( objectA , objectB ){
	let c1 = objectA.colliderType;
	let c2 = objectB.colliderType;

	if( c1 == 1 ){
		if( c2 == 1 ){
			handleCollisionCircleCircle( objectA , objectB , restitution );
		}

		if( c2 == 2 ){
			handleCollisionCircleCapsule( objectA , objectB , restitution );
		}
	}
	else if ( c1 == 2 ){
		if( c2 == 1 ){
			handleCollisionCircleCapsule( objectB , objectA , restitution );
		}

		if( c2 == 2 ){
			handleCollisionCapsuleCapsule( objectA , objectB , restitution );
		}
	}
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
