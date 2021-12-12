import { asteroid } from "../modules/gameObjects/asteroid.js";

import { ShrinkingText } from "../modules/textObjects/shrinkingText.js";
import { Vec2 } from "../modules/utils/vec2.js";

import { DestroyAllAsteroids } from "../modules/objectives/destroyAllAsterObjective.js";

import { DestroyParticularObject } from "../modules/objectives/destroyParticularObject.js";
import { Boss1 } from "../modules/gameObjects/boss1.js";
import { box1 } from "../modules/gameObjects/box1.js";

import { Powerup } from "../modules/gameObjects/powerup.js";

const levelname = "Spinners";
export function createLevel() {
 	let objs = [];

	const a1 = new asteroid(objs, 32, "yellow", 20 , "a1", new Vec2(   1,  1.5 ), new Vec2( 100, 100) );
	const a2 = new asteroid(objs, 16, "yellow", 40 , "a2", new Vec2(   0, -1.1 ), new Vec2( 350, 600) );
	const a3 = new asteroid(objs, 32, "yellow", 30 , "a3" ,new Vec2(  -1,  1.3 ), new Vec2( 500, 100) );
	const a4 = new asteroid(objs,  8, "yellow", 16 , "a3" ,new Vec2(-1.8, -1.8 ), new Vec2( 600, 700) );
  	
	const txt = new ShrinkingText( levelname );

	const objective = new DestroyAllAsteroids(objs);
	let objectives = [objective];

	const boss = new Boss1(objs);
	boxRing( objs , 3  , 65 , boss , -190);

//, 8, "yellow",10,"powerup", new Vec2(0,0) , new Vec2(0,0)  
	const pwr = new Powerup(objs ,"yellow",15,"powerup", new Vec2(359,600) , new Vec2(0,-2)  );

	objs.push( a1, a2, a3, a4, txt , pwr);

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
		objects.push(box);
	}
}

export function getName(){
	return levelname;
}
