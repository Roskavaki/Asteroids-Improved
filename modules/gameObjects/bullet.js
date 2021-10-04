import { obj } from "../obj.js";
import { circleDefault } from "../utils/spaceUtils.js";
import { Vec2 } from "../utils/vec2.js";

class bullet extends obj {
  constructor(objects, radius) {
    super(objects, null, "red", 5);
    this.radius = radius;
    this.position = new Vec2(500,500);
    this.velocity = new Vec2(0,0);
    this.firedby = "player";

    console.log('bullet')
  }

  update(deltaT) {
    this.position = this.position.add( this.velocity );
    //this.updatePosition( deltaT );
    //this.addPosition([this.velocity[0] * deltaT, this.velocity[1] * deltaT]);
  }

  updatePosition(deltaT) {
    //super.addPosition( this.velocity , false);
  }

  onCollision(other) {
    //console.log('collided with' + other);
    other.doDamage(10);
  }

  draw(ctx) {
    circleDefault(ctx, [this.position.x , this.position.y] , this.radius, this.color);
  }
}

export { bullet };
