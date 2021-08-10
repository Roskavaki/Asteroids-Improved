import { spaceobj } from "./spaceobj.js";
import { rot } from "./utils/spaceUtils.js";
import { bullet } from "./bullet.js";
import * as utils from "./utils/spaceUtils.js";
import { tri } from "./shapes.js";
import { Vec2 } from "./utils/vec2.js";
import { BulletV2 } from "./gameObjects/bulletV2.js";

class playership extends spaceobj {
	constructor(objects, input, colour = "red") {
		super(objects, tri, colour);
		//this.verts =  myVerts;

		this.input = input;

		this.canCollide = true;
		this.collisionLayer = 1;

		this.colour = colour;
		this.thrustSpd = 1;
		this.rotationSpeed = 90;
		this.fireSpeed = 4;

		this.wrap = true;

		this.hpBarPosition = "nw"; //northwest

		this.reloadTime = 0.25;
		this.isReloading = false;
	}

	draw(ctx) {
		// This object should wrap around when it goes offscreen
		super.draw(ctx, this.wrap);

		this.drawHpBar(ctx, this.hp, this.hpBarPosition);

		//Debug circle
		//utils.circleDefault(ctx , this.position , this.collisionRadius , this.color);
	}

	drawHpBar(ctx, hp, hpBarPosition) {
		let p = 5;
		let q = 30;

		if (hpBarPosition === "nw") {
			ctx.fillStyle = "yellow";
			ctx.fillRect(p, q, hp * 5, 5);
		}
	}

	doDamage(x) {
		this.hp -= x;
		if (this.hp <= 0) {
			this.hp = 0;
			console.log("player dies");
		}
	}

	update( deltaT ) {
		let input = this.input;
		if (input.getKey("W")) {
			var thrust = this.forward().mul(-0.1);

			this.velocity = new Vec2( 
				this.velocity.x + thrust.x,
				this.velocity.y + thrust.y
			);
		}

		if (input.getKey("a") && !input.getKey("D")) {
			this.rotation -= (deltaT * this.rotationSpeed * 3.14) / 180;
		}

		if (input.getKey("D") && !input.getKey("A")) {
			this.rotation += (deltaT * this.rotationSpeed * 3.14) / 180;
		}

		if (input.getKey(32)) {
			this.fire();
		}

		super.updatePosition(deltaT);
	}

	onCollision(other){
		console.log("Player collision");
		let diff = this.position.sub( other.position);
		diff.normalize();
		diff.mul(-1);
		this.doDamage(5);
		this.velocity = diff;
	}

	fire() {
		if (!this.isReloading) {
			let b = new BulletV2(this.objects , 4);
			this.objects.push( b );
			let forwardspeed = this.forward().mul( -this.fireSpeed );
			b.velocity = new Vec2( this.velocity.x , this.velocity.y ).add( forwardspeed );
			b.position = new Vec2( this.position.x , this.position.y );
			b.collisionLayer = 2;
			b.damage = 10;
			this.reload();
		}
	}

	async reload() {
		this.isReloading = true;
		setTimeout(() => {
			this.isReloading = false;
		}, this.reloadTime * 1000);
	}
}

export { playership };
