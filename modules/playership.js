import { spaceobj } from "./spaceobj.js";
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
		this.rotationSpeed = 120;
		this.fireSpeed = 4;

		this.wrap = true;

		this.hpBarPosition = "nw"; //northwest

		this.reloadTime = 0.25;
		this.isReloading = false;

		this.maxHp = this.hp;

		this.mass = 5.0;

		this.playerNo = 1;
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

	onStart(){
		console.log( 'Player start');
		this.hp = this.maxHp;
	}

	update( deltaT ) {
		let input = this.input;

		this.handleControls( this.playerNo , input , deltaT );

		super.updatePosition(deltaT);

		super.updateChildren( deltaT );
	}

	handleControls( playerNo , input , deltaT=0 ){

		let leftkey = "A";
		let rightkey = "D";
		let upkey = "W";
		let firekey = 32;
		
		if( playerNo === 2){
			leftkey = 37;
			rightkey = 39;
			upkey = 38;
			firekey = "m";
		}

		if (input.getKey(upkey)) {
			this.thrust();
		}			
		if (input.getKey(leftkey) && !input.getKey(rightkey)) {
			this.rotate( -1 , deltaT );
		}
		if (input.getKey(rightkey) && !input.getKey(leftkey)) {
			this.rotate(  1 , deltaT );
		}
		if (input.getKey(firekey)) {
			this.fire();
		}
	}

	thrust(){
		var thrust = this.forward().mul(-0.1);
	
		this.velocity = new Vec2( 
			this.velocity.x + thrust.x,
			this.velocity.y + thrust.y
		);
	}

	rotate( mul=1 , deltaT=0 ){
		this.rotation += (deltaT * this.rotationSpeed * 3.14 * mul) / 180;
	}

	onCollision(other){
		console.log("Player collision");
		
		//this.basicCollision( other );

		this.doDamage(2);
	}

	basicCollision( other ){
		let norm = other.position.sub( this.position ).normalized();
		let r =  norm.mul( 2*this.velocity.dot(norm) ).sub( this.velocity ).mul(-0.5);
		let moveApart = other.collisionRadius + this.collisionRadius +1;
		this.position = other.position.add( norm.mul( -moveApart )) ;
		this.velocity = r;
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
