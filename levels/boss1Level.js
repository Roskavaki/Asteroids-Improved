import { asteroid } from "../modules/asteroid.js";

import { ShrinkingText } from "../modules/textObjects/shrinkingText.js";
import { spaceobj } from "../modules/spaceobj.js";
import { nGon } from "../modules/shapes.js";

import { DestroyParticularObject } from "../modules/objectives/destroyParticularObject.js";
import { NonCompletable } from "../modules/objectives/nonCompletableObjective.js";
import { DestroyAllAsteroids } from "../modules/objectives/destroyAllAsterObjective.js";
import { Boss1 } from "../modules/gameObjects/boss1.js";
import { Vec2 } from "../modules/utils/vec2.js";

function createLevel() {
 	let objs = [];

	const boss = new Boss1(objs);
  	
	const txt = new ShrinkingText("Boss!");

	const objective = new DestroyParticularObject( boss );
	let objectives = [ objective ];	

	objs.push(boss , txt);

	let level = {
		levelname: "Bossfight",
		objects: objs,
		objectives: objectives,
	};

  return level;
}

export { createLevel };