

import { NonCompletable } from "../modules/objectives/nonCompletableObjective.js";
import { GrowingText } from "../modules/textObjects/growingText.js";


function createLevel(){
	let objs = [];

	const txt = new GrowingText("Victory !");
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
