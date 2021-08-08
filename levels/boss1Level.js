import { asteroid } from "../modules/asteroid.js";

import { ShrinkingText } from "../modules/textObjects/shrinkingText.js";
import { spaceobj } from "../modules/spaceobj.js";
import { nGon } from "../modules/shapes.js";


import { NonCompletable } from "../modules/objectives/nonCompletableObjective.js";
import { DestroyAllAsteroids } from "../modules/objectives/destroyAllAsterObjective.js";
import { Boss1 } from "../modules/gameObjects/boss1.js";

function createLevel() {
 	let objs = [];

	const boss = new Boss1(objs);
  	
	const txt = new ShrinkingText("Boss!");


	const a1 = new asteroid(objs, 32, "yellow");
	a1.position = [100, 100];
	a1.velocity = [1, 0.5];
	a1.objectName = "a1";



	const objective = new NonCompletable( objs );
	let objectives = [ objective ];	

	objs.push(boss , a1, txt);

	let level = {
		levelname: "Bossfight",
		objects: objs,
		objectives: objectives,
	};

  return level;
}

export { createLevel };