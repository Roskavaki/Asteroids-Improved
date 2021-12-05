import { obj } from "../obj.js";
import { circleDefault } from "../utils/spaceUtils.js";
import { Vec2 } from "../utils/vec2.js";
import { rectangle } from "../shapes.js";
import { CapsuleCollider } from "../colliders/capsuleCollider.js";

export class box1 extends obj {
	constructor(objects, radius,  target, orbitRadius=40 , orient="vertical", width = 10, height=60) {
		super(objects, null, "cyan", 5);
	
		this.radius = radius;
		this.position = new Vec2(100,100);
		this.velocity = new Vec2(0,0);

		

		this.orbitRadius = orbitRadius;
		this.orbitSpeed = -50;

		
		this.colliderType = 2;
		
		this.canCollide = true;
		this.collisionLayer = 3;
		//this.drawCollider = true;

		this.hp=50;

		this.target=target;

		this.wrap = true;

		if( orient == "vertical"){
			console.log( "vertical box");
			this.collisionRadius = width/2;
			this.verts = rectangle(width,height);
			let p1 = new Vec2( 0 , -height/2 + width/2);
			let p2 = new Vec2( 0 ,  height/2 - width/2);
			this.collider = new CapsuleCollider(p1, p2, width/2);
		}
		else{
			console.log( "horizontal box")
			this.collisionRadius = width/2;
			this.verts = rectangle(height,width);
			let p1 = new Vec2(  - height/2 , 0 );
			let p2 = new Vec2(  + height/2 , 0 );
			this.collider = new CapsuleCollider(p1, p2, width/2);
		}

	}

	update(deltaT) {
		this.localrotation += this.orbitSpeed * deltaT * 3.14/180;
		super.update(deltaT);
		this.orbitAround( this.target.position ,  this.localrotation , new Vec2(this.orbitRadius, 0 ));
	}

	/**
	 * Positions this object around another (does not change the angle, only position)
	 * @param {*} position position to orbit
	 * @param {*} theta rotation around orbit
	 */
	orbitAround( position , theta , startingPoint ){
		//let aa = startingPoint.rotate(theta)
		this.position = position.add( startingPoint.newRotated(theta) ) ;
		this.rotation = this.localrotation;

		this.collider.rotate(theta);
	}


	onCollision(other) {}

	draw(ctx){
		super.draw(ctx);

		if( this.drawCollider )
			this.collider.draw(ctx , this.position);
		
	}

	doDamage( x ){
		if( !this.markedForDestroy ){
			this.hp -= x;
			if( this.hp<=10 ){
				//scoreboard.add(1);
				console.log('destroyed orbiting box');

				if( this.parent !== null ){
					this.parent.removeChild();
					this.removeParent();        
				}

				super.destroy();
			}
		}
	}

}
