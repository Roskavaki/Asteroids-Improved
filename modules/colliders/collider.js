// TODO

// Define interface for colliders

export class Collider{
	constructor(){
		this.canCollide = true;
		this.collisionLayer = 0;

		// 1 circle , 2 capsule
		this.colliderType = 1;

		// Set true if not allowed to be moved by collisions with other bodies
		this.static = false; 
	}

	// For debug
	drawCollider(ctx){}

}