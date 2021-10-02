export class Rigidbody{
	constructor(){
		this.velocity = new Vec2(0,0);
		this.angularVelocity = 0;

		// Set true if it should only affect other rigidbodies
		// But not be affected itself
		this.isKinematic = false;
	}
}