import { Vec2 } from "../utils/vec2.js";
import * as utils from "../utils/spaceUtils.js";
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
  constructor(
    id,
    mass = 1,
    position = new Vec2(0, 0),
    velocity = new Vec2(0, 0),
    radius = 50,
    colour = "yellow"
  ) {
    this.id = id;
    this.mass = mass;
    this.position = position;
    this.velocity = velocity;

    this.previousPos = position;
    this.extForce = new Vec2(0, 0);
    this.colour = colour;
    this.radius = radius;
  }

  draw(ctx, wrap = false) {
    utils.circleDefault(ctx, this.position.toArray(), this.radius, this.colour);

    /*utils.drawVerts(
      ctx,
      this.verts,
      this.rotation,
      this.position.toArray(),
      this.color,
      wrap
    );*/
  }

  addForce(force) {
    this.extForce = this.extForce.add(force);
  }

  // while simulating, call this
  static particleLoop(particles, deltaT, numSubSteps = 5, numPosIters = 1) {
    var colPairs = this.CollectCollisionPairs(particles, deltaT);
    // console.log(colPairs);
    var h = deltaT / numSubSteps;
    for (var i = 0; i < numSubSteps; i++) {
      for (var j = 0; j < particles.length; j++) {
        let p = particles[j];
        // console.log(p.id);
        p.previousPos = p.position;
        p.velocity = p.velocity.add(p.extForce.mul(h / p.mass));
        // console.log(p.extForce);
        p.position = p.position.add(p.velocity.mul(h));

      }
      for (var j = 0; j < numPosIters; j++) {
        // this.SolvePositions();
        this.handlePotentialCollisions(particles, colPairs, h);
      }
      for (var j = 0; j < particles.length; j++) {
        let p = particles[j];
        p.velocity = p.position.sub(p.previousPos).div(h); // make sure to wrap after this
        p.position = utils.wrapCoordinates2(p.position.toArray(), 700, 700);
      }
    }
  }

  // collect potential collision pairs
  static CollectCollisionPairs(particles, deltaT, safety = 2) {
    // use a "tree of axis aligned axis aligned bounding boxes"
    // expand the boxes by safety*deltaT*p.velocity.length, min safety is 1
    var pairs = {};
    for (var i = 0; i < particles.length; i++) {
      let p1 = particles[i];
      var boundBox = safety * p1.radius + safety * deltaT * p1.velocity.length(); // might want to add particle.radius to this at some point

      for (var j = 0; j < particles.length; j++) {
        let p2 = particles[j];

        if (p1.id == p2.id) continue; //dont pairs with self
        // console.log("p1=" + p1.id + " p2=" + p2.id + " box =" + boundBox);
        // guess its more of a circle for now
        //is in distance and not a duplicate

        // console.log(p1.position.distanceTo(p2.position));
        if (
          p1.position.distanceTo(p2.position) <= boundBox &&
          (pairs[p2.id] != p1.id ||
            pairs[p2.id] == null ||
            pairs[p2.id] == null)
        ) {
          // console.log("here");
          pairs[p1.id] = p2.id; //perhaps there's a more efficient format?
        }
      }
    }
    // return [potential collision pair 1, 2, 3, ...]
    return pairs;
  }

  // TODO: replace particle positions with contact positions as per paper
  static handlePotentialCollisions(particles, colPairs, h) {
    for (const [key, value] of Object.entries(colPairs)) {
      let p1 = this.getParticleById(key, particles);
      let p2 = this.getParticleById(value, particles);

      // console.log(p1.id + " " + p2.id);

      var contactNormal = p2.position.sub(p1.position).normalized(); //n in the paper, how do we get this?
      // for now, since its just circles:
      //var penetration = p1.position.sub(p2.position).dot(contactNormal);
      var penetration =
        p1.radius + p2.radius - p2.position.sub(p1.position).dot(contactNormal);//.length();//

      // console.log(penetration);

      //if we dont actually contact, go to the next pair
      if (penetration <= 0) continue;
      // handle the contact
      this.handlePosConstraint(p1, p2, h, contactNormal.mul(penetration), 0);
      //apply static friction
      /* var dp = p1.position
        .sub(p1.previousPos)
        .sub(p2.position.sub(p2.previousPos)); */
    }
  }

  static getParticleById(id, particles) {
    for (var i = 0; i < particles.length; i++) {
      if (particles[i].id == id) return particles[i];
    }
    return null;
  }

  /* static SolvePositions(particles, deltaT) {
    for (var i = 0; i < particles.length(); i++) {
      let p = particles[i];
      // r1 and r2 are the local contact positions wrt p1 and p2
      // ln, lt are multipliers for normal and tangential forces initialized w/ 0
      // for rigidbodies, calc pos1,pos2,pos1Bar,pos2Bar instead of using x1,x2,x1prev,x2prev
    }
  } //iterate through constraints (inc. collisions), moves particles using constraint projection
   */

  static handlePosConstraint(p1, p2, h, dx, compliance = 0) {
    //set compliance to 0 for infinitely stiff constraints
    var w1 = 1 / p1.mass;
    var w2 = 1 / p2.mass;

    // var dx = p2.position - p1.position; // aka "grad" in his

    var n = dx.normalized(); // d in his
    var c = dx.length();

    var l = 0; // he doesnt seem to use lambda in his, just dLambda
    var aBar = compliance / (h * h); // w=aBar+w1+w2 in his js thing

    var deltaL = (-c - aBar * l) / (w1 + w2 + aBar); // -c/(w1+w2+abar) on first iteration
    l = l + deltaL; //l is not used for now, so the above simplifies to -c?, he only has c

    var posImp = n.mul(deltaL); //he just does

    p1.position = p1.position.add(posImp.div(p1.mass));
    p2.position = p2.position.sub(posImp.div(p2.mass));

    // return the forces acting along the constraint
    return n.mul(l / (h * h)); // h ~= dt in his, this seems to be the use of lambda, so it can be skipped for now
  }
}

/*


	// d0 is set to p.radius in his
	function solveDistPos(p0, p1, d0, compliance, unilateral, dt)
	{
		var w = p0.invMass + p1.invMass;
		if (w == 0)
			return;
		var grad = p1.pos.minus(p0.pos);
		var d = grad.normalize(); //this is .length in mine
		w += compliance / dt / dt;
		// abar goes to 0 in mine
		var lambda = (d - d0) / w; // distance-radius / abar+w1+w2

		if (lambda < 0 && unilateral)
			return;
		p1.force = lambda / dt / dt;
		p1.elongation = d - d0; //only used for a display in his
		p0.pos.add(grad, p0.invMass * lambda); // his add function adds (param1.x*param2, param1.y*param2)
		p1.pos.add(grad, -p1.invMass * lambda);

		// p0 = p0+dx*lambda/w1 <<< what hes doing here
	}





 */
