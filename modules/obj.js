import * as utils from "./utils/spaceUtils.js";

class obj {
  constructor(
    objects,
    myVerts,
    colour = "green",
    collisionLayer = 4,
    objectName = "obj"
  ) {
    this.verts = [];

    if (myVerts) {
      this.verts = myVerts;
    }

    this.color = colour;
    this.position = [0, 0];
    this.rotation = 0;

    this.canCollide = false;
    this.collisionRadius = 1;
    this.collisionLayer = collisionLayer;

    this.markedForDestroy = false;

    // Copied by reference so that we can spawn objects
    this.objects = objects;

    this.objectName = objectName;

    this.children = [];
  }

  update(deltaT, input) {}

  onCollision(other) {}

  addPosition(offset, wrap = false) {
    this.position[0] += offset[0];
    this.position[1] += offset[1];

    if (wrap) {
      this.position = utils.wrapCoordinates(this.position);
    }
  }

  addVert(x, y) {
    this.verts.push([x, y]);
  }

  destroy() {
    //	console.log( 'this.destroy' );
    this.markedForDestroy = true;
  }

  draw(ctx, wrap = false) {
    utils.drawVerts(
      ctx,
      this.verts,
      this.rotation,
      this.position,
      this.color,
      wrap
    );
  }
}

export { obj };
