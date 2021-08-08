import { obj } from "../obj.js";
import { spaceobj } from "../spaceobj.js";
import { nGon, sqr } from "../shapes.js";

import { bullet  } from "../bullet.js";
import { BulletV2 } from "./bulletV2.js";

import * as utils from "../utils/spaceUtils.js";

export class Boss1 extends spaceobj{

	constructor( objects ){
		super( objects , null , "red"  );

		this.colour = "red";

		let radius = 80;
		this.hp = radius;
		this.verts = nGon(5,radius);

		this.collisionRadius = radius;
		this.canCollide = true;

		this.position=[ 350 ,300 ];
		this.angularVelocity = 2.2 ;
		this.velocity=[0,0];

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

	fire( ) {
		if (!this.isReloading) {

			let b = new BulletV2(this.objects , 8);
			let fwd = utils.normalize(this.forward());
			b.velocity = utils.addVec(
				this.velocity,
				utils.mulVec(fwd, -this.fireSpeed)
			);
			
			b.position = [...this.position];
			this.objects.push(b);
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