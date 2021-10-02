import { Collider } from "./collider.js";

export class CircleCollider extends Collider{
	constructor(radius){
		super();
		this.collisionRadius = radius;
    	this.collisionLayer = 0;
		this.drawCollider = false;
	}


}