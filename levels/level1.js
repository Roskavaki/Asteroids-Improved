import { asteroid } from "../modules/asteroid.js";

import { ShrinkingText } from "../modules/shrinkingText.js";
import { spaceobj } from "../modules/spaceobj.js";

import { nGon } from "../modules/shapes.js";

let objs = [];

const a1 = new asteroid(objs, 32, "red");
a1.position = [100, 100];
a1.velocity = [1, 0.5];

const a2 = new asteroid(objs, 32, "red");
a2.position = [200, 100];
a2.velocity = [0.5, 0.5];

const a3 = new asteroid( objs , 16 , "green" );
a3.position = [300,100] ;
a3.velocity = [0.5 , 0.5];

const test = new spaceobj(objs, nGon(10, 50), "yellow");
test.position = [300, 300];

const txt = new ShrinkingText("Level 1");

objs.push(a1, a2 , a3 , test, txt);
let objectives = [a1];

let level = {
  levelname: "Level 0",
  objects: objs,
  objectives: objectives,
};

export { level };
