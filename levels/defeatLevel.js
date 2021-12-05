import { TimedComplete } from "../modules/objectives/timedCompleteObjective.js";
import { GrowingText } from "../modules/textObjects/growingText.js";


function createLevel(){
	let objs = [];

	const txt = new GrowingText("GAME OVER");
	objs.push( txt );

	const objective = new TimedComplete(objs)
	let objectives = [ objective ];	

	let level = {
		levelname: "Defeat",
		objects: objs,
		objectives: objectives,
	};

	return level;
}


export function getName(){
	return "defeat";
}

export { createLevel };

