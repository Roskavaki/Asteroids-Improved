import { ShrinkingText } from "../modules/textObjects/shrinkingText.js";
import { DestroyParticularObject } from "../modules/objectives/destroyParticularObject.js";
import { Boss1 } from "../modules/gameObjects/boss1.js";

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