import { ShrinkingText } from "../modules/textObjects/shrinkingText.js";
import { DestroyParticularObject } from "../modules/objectives/destroyParticularObject.js";
import { Boss1 } from "../modules/gameObjects/boss1.js";
import { box1 } from "../modules/gameObjects/box1.js";

export function createLevel() {
 	let objs = [];

	const boss = new Boss1(objs);
	  	
	const txt = new ShrinkingText("Flock!");
	const objective = new DestroyParticularObject( boss );
	let objectives = [ objective ];

	objs.push(boss , txt );

	console.log( "flockers")
	
	let level = {
		levelname: "Flockers",
		objects: objs,
		objectives: objectives,
	};

  	return level;
}