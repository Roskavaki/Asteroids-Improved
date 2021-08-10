import { Vec2 } from "../utils/vec2";

/* export class Rigidbody {
  constructor(
    mass = 1,
    position = new Vec2(0, 0),
    rotation = 0,
    velocity = new Vec2(0, 0),
    angularVelocity = 0
  ) {
    this.mass = mass;
    this.position = position;
    this.rotation = rotation;
    this.velocity = velocity;
    this.angularV = angularVelocity;
  }

  // while simulating, call this
  static rigidbodyLoop() {}
} */

export class Particle {
  constructor(mass = 1, position = new Vec2(0, 0), velocity = new Vec2(0, 0)) {
    this.mass = mass;
    this.position = position;
    this.velocity = velocity;

    this.previousPos = position;
    this.extForce = new Vec2(0, 0);
  }

  // while simulating, call this
  static particleLoop(particles, deltaT, numSubSteps = 5, numPosIters = 1) {
    CollectCollisionPairs();
    var h = deltaT / numSubSteps;
    for (var i = 0; i < numSubSteps; i++) {
      for (var j = 0; j < particles.length(); j++) {
        let p = particles[j];
        p.previousPos = p.position;
        p.velocity = p.velocity.add(p.extForce.mul(h / p.mass));
        p.position = p.position.add(p.velocity.mul(h));
      }
      for (var j = 0; j < numPosIters; j++) {
        this.SolvePositions();
      }
      for (var j = 0; j < particles.length(); j++) {
        let p = particles[j];
        p.velocity = p.position.sub(p.previousPos).div(h);
      }
    }
  }

  static CollectCollisionPairs() {}

  static SolvePositions() {} //iterate through constraints (inc. collisions), moves particles using constraint projection

  static positionalConstraint(p1, p2) {
    var w1 = 1 / p1.mass;
    var w2 = 1 / p2.mass;
  }
}
