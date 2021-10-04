//TODO

import { Vec2 } from "../utils/vec2.js";
import { Collider } from "./collider.js";
import { circleDefault , drawVerts } from "../utils/drawingUtils.js";

export class CapsuleCollider extends Collider{
	constructor( p1=new Vec2(0,0) , p2=new Vec2(1,1) , collisionRadius=2){
		super();
		this.collisionRadius = collisionRadius;
		this.colliderType = 2;

		//Start and end vector 2s
		this.setPoints(p1 , p2);
	}

	setPoints( p1 , p2 ){
		this.p1 = p1;
		this.p2 = p2;

		this.originalP1 = p1;
		this.originalP2 = p2;
	}

	rotate(r){
		this.p1 = this.originalP1.newRotated(r);
		this.p2 = this.originalP2.newRotated(r);
	}

	draw(ctx, position){
		let ln =  [this.p1.toArray() , this.p2.toArray()];
		drawVerts( ctx ,ln , 0, position.toArray() , "red" );
		circleDefault( ctx, this.p1.add(position).toArray() , this.collisionRadius , this.color );
		circleDefault( ctx, this.p2.add(position).toArray() , this.collisionRadius , this.color );
	}


}