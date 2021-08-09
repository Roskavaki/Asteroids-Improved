import { obj } from "./obj.js";
import { rot, circleDefault } from "./utils/spaceUtils.js";
import { Vec2 } from "./utils/vec2.js";

class spaceobj extends obj {
  constructor(objects, myVerts, colour = "red", wrap = false) {
    super(objects, myVerts, colour);
    this.velocity = new Vec2(0,0);
    this.angularVelocity = 0;
    this.collisionRadius = 10;
    this.colour = colour;
    this.markedForDestroy = false;
    this.hp = 20;

    this.wrap = wrap;
  }

  forward() {
    let ret = new Vec2(0,1);
	ret.rotate( this.rotation );
    return ret;
  }

  update(deltaT, input) {
    super.update(deltaT);
    this.updateRotation(deltaT);
    this.updatePosition(deltaT);
  }

  doDamage(x) {
    this.hp -= x;
    if (this.hp <= 0) {
      console.log("hp gone");
      super.destroy();
    }
  }

  draw(ctx) {
    // This object should wrap around when it goes offscreen
    super.draw(ctx, this.wrap);

    //Debug circle
    //circleDefault(ctx , this.position , this.collisionRadius , this.color);
  }

  updateRotation(deltaT) {
    this.rotation += deltaT * (this.angularVelocity * 3.14) / 180;
  }

  updatePosition(deltaT) {
    super.addPosition( this.velocity , this.wrap);
  }
}

export { spaceobj };
