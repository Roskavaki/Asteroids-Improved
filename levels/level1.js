import { asteroid } from "../modules/asteroid.js";

import { ShrinkingText } from "../modules/textObjects/shrinkingText.js";
import { Vec2 } from "../modules/utils/vec2.js";

import { DestroyAllAsteroids } from "../modules/objectives/destroyAllAsterObjective.js";

function createLevel() {
 	let objs = [];

	const a1 = new asteroid(objs, 32, "yellow");
	a1.position = new Vec2( 100, 100);
	a1.velocity = new Vec2( 0, 1.5 );
	a1.objectName = "a1";
	a1.drawCollider=true;
	a1.mass = 20
	a1.angularVelocity = -15

	const a2 = new asteroid(objs, 16, "yellow");
	a2.position = new Vec2( 110 , 500 );
	a2.velocity = new Vec2( 0 , -1.1 );
	a2.objectName = "a2";
	a2.drawCollider=true;
	a2.mass=40;
	a2.angularVelocity = 10;
  	
	const txt = new ShrinkingText("Level 1");

	const objective = new DestroyAllAsteroids(objs);
	let objectives = [objective];

	objs.push(  a2, txt);

	let level = {
		levelname: "Level 1",
		objects: objs,
		objectives: objectives,
	};

  return level;
}

export { createLevel };
