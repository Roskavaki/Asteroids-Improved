import { ShrinkingText } from "../modules/textObjects/shrinkingText.js";
import { NonCompletable } from "../modules/objectives/nonCompletableObjective.js";
import { CapsuleBarrier } from "../modules/gameObjects/barrier.js";

export function createLevel() {
 	let objs = [];


	const objective = new NonCompletable( objs );
	
	const barrier = new CapsuleBarrier(objs);
	  	
	const txt = new ShrinkingText("Flock!");
	
	let objectives = [ objective ];

	objs.push( barrier , txt );

	console.log( "flockers dddd")
	
	let level = {
		levelname: "Flockers",
		objects: objs,
		objectives: objectives,
	};

  	return level;
}