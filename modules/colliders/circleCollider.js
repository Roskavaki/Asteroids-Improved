import { Collider } from "./collider.js";

export class CircleCollider extends Collider{
	constructor(){
		super();
		this.collisionRadius = 1;
    	this.collisionLayer = 0;
		this.drawCollider = false;
	}


}