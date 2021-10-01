import { obj } from "../obj.js";
import { circleDefault } from "../utils/spaceUtils.js";
import { Vec2 } from "../utils/vec2.js";
import { rectangle } from "../shapes.js";
import { CapsuleCollider } from "../colliders/capsuleCollider.js";

export class box1 extends obj {
	constructor(objects, radius,  target, orbitRadius=40 ) {
		super(objects, null, "cyan", 5);
		this.radius = radius;
		this.position = new Vec2(100,100);
		this.velocity = new Vec2(0,0);

		this.verts = rectangle(10,50);

		this.orbitRadius = orbitRadius;
		this.orbitSpeed = -50;

		this.hp=50;

		this.collisionRadius = radius;
		this.canCollide = true;
		this.collisionLayer = 3;

		this.drawCollider = true;

		this.target=target;

		this.wrap = true;

		let p1 = new Vec2( 0 ,-25);
		let p2 = new Vec2( 0 ,25);
		this.collider = new CapsuleCollider();

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
	}


	onCollision(other) {}

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
