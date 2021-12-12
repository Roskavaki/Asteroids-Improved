import { Vec2 } from "../utils/vec2.js";
export class Rigidbody{
	constructor(velocity = new Vec2(0,0) , angularVelocity=0, mass=10, isKinematic=false){
		
		this.velocity = velocity;
		this.angularVelocity = angularVelocity;
		this.mass=mass;

		// Set true if it should only affect other rigidbodies
		// But not be affected itself
		this.isKinematic = isKinematic;
	}
}