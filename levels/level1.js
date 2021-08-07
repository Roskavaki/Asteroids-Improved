import { asteroid } from "../modules/asteroid.js";

import { ShrinkingText } from "../modules/shrinkingText.js";
import { spaceobj } from "../modules/spaceobj.js";
import { nGon } from "../modules/shapes.js";

import { DestroyAllAsteroids } from "../modules/destroyAllAsterObjective.js";

let objs = [];

const a1 = new asteroid(objs, 32, "red");
a1.position = [100, 100];
a1.velocity = [1, 0.5];
a1.objectName = "a1";

const a2 = new asteroid(objs, 32, "red");
a2.position = [200, 100];
a2.velocity = [0.5, -0.7];
a2.objectName = "a2";


const test = new spaceobj(objs, nGon(10, 50), "yellow");
test.position = [300, 300];

const txt = new ShrinkingText("Level 1");

const objective = new DestroyAllAsteroids( objs );
let objectives = [ objective ];

objs.push(a1, a2, txt);


let level = {
  levelname: "Level 0",
  objects: objs,
  objectives: objectives,
};

export { level };
