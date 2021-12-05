import { ShrinkingText } from "../modules/textObjects/shrinkingText.js";
import { DestroyParticularObject } from "../modules/objectives/destroyParticularObject.js";
import { Boss1 } from "../modules/gameObjects/boss1.js";
import { box1 } from "../modules/gameObjects/box1.js";

function createLevel() {
 	let objs = [];

	const boss = new Boss1(objs);
	  	
	const txt = new ShrinkingText("Boss!");
	const objective = new DestroyParticularObject( boss );
	let objectives = [ objective ];

	objs.push(boss , txt );
	boxRing( objs , 6  , 90 , boss , -30);
	boxRing( objs , 9 , 120 , boss ,  30);
	
	let level = {
		levelname: "Bossfight",
		objects: objs,
		objectives: objectives,
	};

  	return level;
}

function boxRing( objects, n , orbitRadius , orbitObj , orbitSpeed ){
	let arr = [];
	var angleIncrement = (2 * Math.PI) / n;

	for (var i = 0; i < n; i++) {
		var angle = angleIncrement * i;

		let box = new box1( objects , 20 , orbitObj );
		box.localrotation = angle;
		box.orbitSpeed  = orbitSpeed;
		box.orbitRadius = orbitRadius;

		objects.push(box);
	}
	//return arr;
}


export function getName(){
	return "Boss";
}

export { createLevel };