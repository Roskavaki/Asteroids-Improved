import { CapsuleCollider } from "../colliders/capsuleCollider.js";
import { obj } from "../obj.js";
import { rectangle } from "../shapes.js";
import { circleDefault, drawVerts } from "../utils/drawingUtils.js";
import { Vec2 } from "../utils/vec2.js";

//WIP
export class CapsuleBarrier extends obj{

	constructor( objects ){
		super(objects, null, "cyan", 5);


		this.position = new Vec2(200, 350);
		this.velocity = new Vec2(0,0);

		console.log( "capsule barrier")

		this.drawCollider=true;

		let wid = 200;
		let height = 20;

		this.collisionLayer=0;
		this.canCollide = true;
		this.radius = height/2;
		this.collisionRadius = this.radius;
		this.colliderType = 2;


		this.verts = rectangle(wid , height);

		this.p1 = new Vec2( -wid/2 ,0);
		this.p2 = new Vec2(  wid/2 ,0);
		this.collider = new CapsuleCollider( this.p1 , this.p2 , 1  );

		this.objectName = "barrier";
	}

	doDamage(x){}
	
	draw(ctx,wrap=false){
		super.draw(ctx,false);	

		let ln =  [this.p1.toArray() , this.p2.toArray()];
		drawVerts( ctx ,ln , 0, this.position.toArray() ,this.color );
		circleDefault( ctx, this.p1.add(this.position).toArray() , this.collisionRadius , this.color );
		circleDefault( ctx, this.p2.add(this.position).toArray() , this.collisionRadius , this.color );
	}

}