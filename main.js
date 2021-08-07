import { spaceobj } from "./modules/spaceobj.js";
import { playership } from "./modules/playership.js";
import { bullet } from "./modules/bullet.js";
import { sqr, tri } from "./modules/shapes.js";
import * as utils from "./modules/spaceUtils.js";

import {
  drawText,
  drawTextCenterScreen,
  drawTextUpperLeft,
} from "./modules/textUtils.js";
import { asteroid } from "./modules/asteroid.js";

import { level } from "./levels/level1.js";
import { level2 } from "./levels/level2.js";

import { scoreboard } from "./modules/scoreboard.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
let width = canvas.width;
let height = canvas.height;

let objs = [];
let bullets = [];
let objectives = [];

let player = new playership(objs, tri, "yellow");
let ast = new asteroid(objs, 50, "yellow");
objs.push(ast);

player.position = [width / 2, height / 2 + 60];

let pwr = 0.1;

// Pause rendering and game logic
let pause = false;

let currentLevel = 0;
let levels = [level, level2];

function loadLevel(ind) {
  let lvl = levels[ind];
  objs = lvl.objects;
  objectives = lvl.objectives;
}

function checkPlayerCollisions(player, others = []) {
  let collision = utils.checkCollisionsOneToMany(player, others);
  if (collision) {
    console.log("Player collision");
    let diff = utils.difference(player.position, collision.position);
    let norm = utils.normalize(diff);
    let mag = utils.mulVec(norm, -2);
    player.doDamage(2);
    player.velocity = mag;
  }
}

/** Checks every object against every other object
 * Objects that cannot collide are skipped
 */
function checkCollisions( objects){
	for( let i=0; i< objects.length; i++ ){
		let objectA = objects[i];

		if( objectA.canCollide ){
			for( let j=i+1; j<objects.length; j++ ){			
				let objectB = objects[j];

				if( objectB.canCollide ){
					let collision = utils.checkCollision( objectA , objectB );

					if( collision ){
						objectA.onCollision( objectB );
						objectB.onCollision( objectA );
					}
				}

			}			
		}

	}
}

// Main game loop to draw each frame
function mainloop() {
  //ctx.clearRect(0, 0, width, height);

  if (!pause) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    player.update();
    player.draw(ctx);

    checkPlayerCollisions(player, objs);

    checkCollisions(objs);

    objs.forEach((element) => {
      element.update();
      element.draw(ctx);
    });

    bullets.forEach((element) => {
      element.update();
      element.draw(ctx);
    });

    // Bullet collisions and removal if offscreen
    for (var i = bullets.length - 1; i > -1; i--) {
      let bullet = bullets[i];
      let collision = utils.checkCollisionsOneToMany(bullet, objs);

      if (utils.checkOutOfBounds(bullet.position, width, height)) {
        bullets.splice(i, 1);
      } else if (collision) {
        bullets.splice(i, 1);
        bullet.onCollision(collision);

        console.log(objs);
      }
    }

    // Object removal,  do not use filter
    for (var i = objs.length - 1; i >= 0; i--) {
      var obj = objs[i];
      if (obj.markedForDestroy) {
        objs.splice(i, 1);
      }
    }

    objectives = objectives.filter((ob) => !ob.markedForDestroy);
    if (objectives.length < 1) {
      //	console.log( 'level complete');
      currentLevel++;
      if (currentLevel > levels.length - 1) {
        currentLevel = 0;
      }
      loadLevel(currentLevel);
    }

    // Score
    drawTextUpperLeft(ctx, scoreboard.toString(), width, height, 30, true);
  }
}

// Load first level
loadLevel(currentLevel);

// Start the main loop
setInterval(mainloop, 30);

window.addEventListener(
  "keydown",
  function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    switch (event.key) {
      case "ArrowDown":
        // code for "down arrow" key press.
        //fire( player.position , player.forward() , 2 , player.velocity );
        player.fire(bullets);

        break;
      case "ArrowUp":
        // code for "up arrow" key press.
        player.thrust([0, -pwr]);
        //ddd2.velocity = [ ddd2.velocity[0] + thrust[0] , ddd2.velocity[1] + thrust[1] ];
        break;
      case "ArrowLeft":
        // code for "left arrow" key press.
        player.rotateLeft();

        break;
      case "ArrowRight":
        // code for "right arrow" key press.
        player.rotateRight();
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  },
  true
);
