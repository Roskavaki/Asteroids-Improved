//TODO

import { Collider } from "./collider.js";

export class CapsuleCollider extends Collider{
	constructor( p1 , p2 , collisionRadius=1){
		super();
		this.collisionRadius = collisionRadius;

		//Start and end vector 2s
		this.p1 = p1;
		this.p2 = p2;
	}
}