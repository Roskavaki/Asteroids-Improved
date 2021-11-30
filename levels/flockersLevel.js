import { ShrinkingText } from "../modules/textObjects/shrinkingText.js";
import { NonCompletable } from "../modules/objectives/nonCompletableObjective.js";
import { CapsuleBarrier } from "../modules/gameObjects/barrier.js";
import { Flocker } from "../modules/gameObjects/allGameObjects.js";
import { Vec2 } from "../modules/utils/vec2.js";

export function createLevel() {
 	let objs = [];


	const objective = new NonCompletable( objs );
	
	const barrier = new CapsuleBarrier(objs);
	  	
	const txt = new ShrinkingText("Flock!");

	const flock = [];
	const f1 = new Flocker( objs , flock , "f1" , "yellow" , new Vec2(300,300) );
	const f2 = new Flocker( objs , flock , "f2" , "magenta", new Vec2(350,300) );
	//const f3 = new Flocker( objs , flock , "f3" , "white"  , new Vec2(300,200) );
	//const f4 = new Flocker( objs , flock , "f4" , "orange" , new Vec2(400,400) );
	//const f5 = new Flocker( objs , flock , "f4" , "red"    , new Vec2(400,500) );

	//flock.push();
	// f1,f2,f3 f4,
	objs.push( f1,f2 ,  barrier , txt );

	console.log( "flockers dddd")
	let objectives = [ objective ];
	let level = {
		levelname: "Flockers",
		objects: objs,
		objectives: objectives,
	};

  	return level;
}