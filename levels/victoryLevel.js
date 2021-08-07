import { ShrinkingText } from "../modules/shrinkingText.js";
import { NonCompletable } from "../modules/objectives/nonCompletableObjective.js";


function createLevel(){
	let objs = [];

	const txt = new ShrinkingText("Victory !");
	objs.push( txt );

	const objective = new NonCompletable( objs );
	let objectives = [ objective ];	

	let level = {
		levelname: "Victory",
		objects: objs,
		objectives: objectives,
	};

	return level;
}

export { createLevel };
