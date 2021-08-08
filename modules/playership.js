import { spaceobj } from "./spaceobj.js";
import { rot } from "./utils/spaceUtils.js";
import { bullet } from "./bullet.js";
import * as utils from "./utils/spaceUtils.js";
import { tri } from "./shapes.js";

class playership extends spaceobj {
  constructor(objects, myVerts = null, colour = "red") {
    super(objects, tri, colour);
    this.verts = tri;

    this.canCollide = true;
    this.collisionLayer = 6;

    this.colour = colour;
    this.thrustSpd = 0.5;
    this.rotationSpeed = 60;
    this.fireSpeed = 300;

    this.wrap = true;

    this.hpBarPosition = "nw"; //northwest

    this.reloadTime = 0.5;
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

  update(deltaT, input, bullets) {
    if (input.getKey("W")) {
      var thrust = rot([0, -this.thrustSpd * deltaT], this.rotation);
      this.velocity = [
        this.velocity[0] + thrust[0],
        this.velocity[1] + thrust[1],
      ];
    }
    if (input.getKey("a") && !input.getKey("D")) {
      this.rotation -= (deltaT * this.rotationSpeed * 3.14) / 180;
    }
    if (input.getKey("D") && !input.getKey("A")) {
      this.rotation += (deltaT * this.rotationSpeed * 3.14) / 180;
    }

    if (input.getKey(32)) {
      this.fire(bullets);
    }

    super.updatePosition(deltaT);
  }

  checkPlayerCollisions(player = this, others = []) {
    let collision = utils.checkCollisionsOneToMany(player, others);
    if (collision) {
      console.log("Player collision");
      let diff = utils.difference(player.position, collision.position);
      let norm = utils.normalize(diff);
      let mag = utils.mulVec(norm, -2);
      player.doDamage(5);
      player.velocity = mag;
    }
  }

  fire(bullets) {
    if (!this.isReloading) {
      let b = new bullet(3);
      let fwd = utils.normalize(this.forward());
      b.velocity = utils.addVec(
        this.velocity,
        utils.mulVec(fwd, -this.fireSpeed)
      );

      b.position = [...this.position];
      bullets.push(b);
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
