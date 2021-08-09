import { obj } from "../obj.js";
import { spaceobj } from "../spaceobj.js";
import { nGon, sqr } from "../shapes.js";

import { bullet  } from "../bullet.js";
import { BulletV2 } from "./bulletV2.js";

import * as utils from "../utils/spaceUtils.js";
import { Vec2 } from "../utils/vec2.js";

export class Boss1 extends spaceobj{

	constructor( objects ){
		super( objects , null , "red"  );

		this.colour = "red";

		let radius = 80;
		this.hp = radius;
		this.verts = nGon(5,radius);

		this.collisionRadius = radius;
		this.canCollide = true;

		this.position= new Vec2(350 ,300)  ;
		this.angularVelocity = 2.2 ;
		this.velocity=new Vec2(0 ,0) ;

		console.log('boss');

		this.fireSpeed = 4;
		this.reloadTime = 0.3;
		this.isReloading = false;

		this.wrap=true;
	}

	setRadius( radius  ){
		this.radius = radius;
		this.collisionRadius = radius;
		this.verts = nGon(5,radius);
	}

	update(){
		super.update();
		this.fire();
	}

	fire() {
		if (!this.isReloading) {
			let b = new BulletV2(this.objects , 4);
			this.objects.push( b );
			let forwardspeed = this.forward().mul( -this.fireSpeed );
			b.velocity = this.velocity.cpy().add( forwardspeed );
			b.position = this.position.cpy();
			b.collisionLayer = 2;
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
	}

	onCollision(other) {}
	
	doDamage( x ){
		if( !this.markedForDestroy ){
			this.hp -= x/2;

			this.setRadius( this.hp );

			this.reloadTime -= 0.02;

			if( this.hp<=10 ){
				//scoreboard.add(1);
				super.destroy();
			}
		}
	}


}