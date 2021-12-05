import { asteroid } from "../modules/gameObjects/asteroid.js";

import { ShrinkingText } from "../modules/textObjects/shrinkingText.js";
import { Vec2 } from "../modules/utils/vec2.js";

import { DestroyAllAsteroids } from "../modules/objectives/destroyAllAsterObjective.js";

import { DestroyParticularObject } from "../modules/objectives/destroyParticularObject.js";
import { Boss1 } from "../modules/gameObjects/boss1.js";
import { box1 } from "../modules/gameObjects/box1.js";

const levelname = "Spinners";
export function createLevel() {
 	let objs = [];

	const a1 = new asteroid(objs, 32, "yellow");
	a1.position = new Vec2( 100, 100);
	a1.velocity = new Vec2( 0, 1.5 );
	a1.objectName = "a1";
	a1.mass = 20
	a1.angularVelocity = -15

	const a2 = new asteroid(objs, 16, "yellow");
	a2.position = new Vec2( 350 , 600 );
	a2.velocity = new Vec2( 0 , -1.1 );
	a2.objectName = "a2";
	a2.mass=40;
	a2.angularVelocity = 10;
  	
	const txt = new ShrinkingText( levelname );

	const objective = new DestroyAllAsteroids(objs);
	let objectives = [objective];

	const boss = new Boss1(objs);
	boxRing( objs , 6  , 65 , boss , -190);

	//boss,
	objs.push(  a2, txt);

	let level = {
		levelname: levelname,
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

		let box = new box1( objects , 1 , orbitObj, 1, "horizontal" , 15 , 90 );
		box.localrotation = angle;
		box.orbitSpeed  = orbitSpeed;
		box.orbitRadius = orbitRadius;
		
		//box.drawCollider=true;

		objects.push(box);
	}
	//return arr;
}

export function getName(){
	return levelname;
}
