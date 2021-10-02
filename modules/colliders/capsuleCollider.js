//TODO

import { Vec2 } from "../utils/vec2.js";
import { Collider } from "./collider.js";

export class CapsuleCollider extends Collider{
	constructor( p1=new Vec2(0,0) , p2=new Vec2(1,1) , collisionRadius=1){
		super();
		this.collisionRadius = collisionRadius;

		//Start and end vector 2s
		this.p1 = p1;
		this.p2 = p2;

	}
}