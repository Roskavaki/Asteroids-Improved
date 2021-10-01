
import { spaceobj } from "../spaceobj.js";
import { nGon, sqr } from "../shapes.js";

import { BulletV2 } from "./bulletV2.js";

import { Vec2 } from "../utils/vec2.js";

export class Boss1 extends spaceobj{

	constructor( objects ){
		super( objects , null , "red"  );

		this.colour = "green";

		this.sides = 9;

		
		this.hp = 120;
		let radius = this.hp/2;

		this.verts = nGon( this.sides , radius);

		this.collisionRadius = radius;
		this.canCollide = true;

		this.angularVelocity = 90.0 ;
		this.position = new Vec2(350 ,200)  ;		
		this.velocity = new Vec2(0 ,0) ;

		console.log('boss');

		this.fireSpeed = 3;
		this.reloadTime = 0.3;
		this.isReloading = false;

		this.wrap=true;

		this.collisionLayer = 3;

		this.totalTime = 0;

	}

	sizeHpRelation( hp ){
		//TODO
	}

	setRadius( radius  ){
		this.radius = radius;
		this.collisionRadius = radius;
		this.verts = nGon(this.sides,radius);
	}

	update( deltaT ){
		super.update( deltaT );
		super.updateChildren( deltaT );

		this.totalTime += deltaT;
		
		// Math.sin( this.totalTime * 6 )* 1.5
		let b = new Vec2( 350 +   Math.sin(this.totalTime/2)*150 ,  150  );
		this.position = b;

		this.fire();
	}

	fire() {
		if (!this.isReloading) {
			let b = new BulletV2(this.objects , 10);
			this.objects.push( b );
			let forwardspeed = this.forward().mul( -this.fireSpeed );
			b.velocity = this.velocity.cpy().add( forwardspeed );
			b.position = this.position.cpy();
			b.collisionLayer = 4;
			this.reload();
		}
	}

	async reload() {
		this.isReloading = true;
		setTimeout(() => {
			this.isReloading = false;
		}, this.reloadTime * 1000);
	}

	draw(ctx){
		super.draw( ctx, this.wrap);
		//utils.circleDefault(ctx , this.position.toArray() , this.collisionRadius , this.color);
	}

	onCollision(other) {}
	
	doDamage( x ){
		if( !this.markedForDestroy ){

			this.hp -= x/2;
			this.setRadius( this.hp/2 );
			this.reloadTime -= 0.01;
			
			if( this.hp<=20 ){
				//scoreboard.add(1);
				console.log('destroyed boss');
				super.destroy();
			}
		}
	}


}