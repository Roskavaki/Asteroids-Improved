import { asteroid } from "../modules/asteroid.js";

import { ShrinkingText } from "../modules/textObjects/shrinkingText.js";
import { spaceobj } from "../modules/spaceobj.js";
import { nGon } from "../modules/shapes.js";

import { DestroyAllAsteroids } from "../modules/objectives/destroyAllAsterObjective.js";
import { Vec2 } from "../modules/utils/vec2.js";




export function createLevel() {
  let objs = [];

  const a1 = new asteroid(objs, 32, "red");
  a1.position = new Vec2(100, 100);
  a1.velocity = new Vec2(1, 0.5);
  a1.objectName = "a1";

  const a2 = new asteroid(objs, 32, "red");
  a2.position = new Vec2( 200, 100 );
  a2.velocity =  new Vec2( 0.5, 0.5);
  a2.objectName = "a2";

  const a3 = new asteroid(objs, 64, "green");
  a3.position = new Vec2(300, 100);
  a3.velocity = new Vec2(-0.5, 0.5);
  a3.objectName = "a3";

  const test = new spaceobj(objs, nGon(10, 50), "yellow");
  test.position = [300, 300];

  const txt = new ShrinkingText("Level 2");

  objs.push(a1, a2, a3, txt);

  const objective = new DestroyAllAsteroids( objs );
  let objectives = [ objective ];

  let level2 = {
    levelname: "Level 1",
    objects: objs,
    objectives: objectives,
  };

  return level2
}

