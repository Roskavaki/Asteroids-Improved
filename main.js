import { spaceobj } from "./modules/spaceobj.js";
import { playership } from "./modules/playership.js";
import { bullet } from "./modules/bullet.js";
import { sqr, tri } from "./modules/shapes.js";
import * as utils from "./modules/utils/spaceUtils.js";

import { Vec2 } from "./modules/utils/vec2.js";

import {
  drawText,
  drawTextCenterScreen,
  drawTextUpperLeft,
} from "./modules/utils/textUtils.js";
import { Input } from "./modules/input.js";

import { asteroid } from "./modules/asteroid.js";

import * as level1 from "./levels/level1.js";
import { level2 } from "./levels/level2.js";

import * as lastlevel from "./levels/victoryLevel.js";

import { scoreboard } from "./modules/scoreboard.js";

import * as bosslevel from "./levels/boss1Level.js";

import { Particle } from "./modules/physics/xpbd.js";

const canvas = document.getElementById("canvas");

// Disable canvas alpha, for optimization
const ctx = canvas.getContext("2d", { alpha: false });

let gameInput = new Input(window);

ctx.fillStyle = "green";
let width = canvas.width;
let height = canvas.height;

let objs = [];
let bullets = [];
let objectives = [];

let player = new playership(objs, gameInput, "yellow");
player.position = new Vec2(width / 2, height / 2 + 60);

// Pause rendering and game logic
let pause = false;

let currentLevel = 0;
//
let levels = [
  bosslevel.createLevel(),
  level1.createLevel(),
  level2,
  lastlevel.createLevel(),
];

let date = new Date();
let currentTime = date.getTime();
let lastTime = currentTime;

let particles = [
  new Particle(0, 1, new Vec2(150, 100), new Vec2(0, 0)),
  new Particle(1, 1, new Vec2(150, 200), new Vec2(0, 0)),
];

let gravity = new Vec2(0, 3);

particles[0].addForce(gravity);

particles[1].addForce(new Vec2(0, -3));
// particles[1].addForce(gravity);

//let levels =  [  lastlevel.createLevel() ];

function loadLevel(ind) {
  let lvl = levels[ind];
  objs = lvl.objects;
  objectives = lvl.objectives;

  player.objects = objs;

  objs.push(player);
}

function removeDestroyedObjects(objs) {
  // Object removal,  do not use filter
  for (var i = objs.length - 1; i >= 0; i--) {
    var obj = objs[i];
    if (obj.markedForDestroy) {
      objs.splice(i, 1);
    }
  }
}

function showScoreboard() {
  drawTextUpperLeft(
    ctx,
    scoreboard.toString(),
    "yellow",
    width,
    height,
    30,
    true
  );
}

// Main game loop to draw each frame
function mainloop() {
  //ctx.clearRect(0, 0, width, height);

  date = new Date();
  lastTime = currentTime;
  currentTime = date.getTime();
  let deltaT = (currentTime - lastTime) / 1000;
  // console.log(currentTime);

  if (!pause) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    utils.checkCollisions(objs);

    Particle.particleLoop(particles, deltaT);
    particles.forEach((element) => {
      // let air_resis = new Vec2(0, -0.2 * element.velocity.y);
      // element.addForce(air_resis);
      // element.update(deltaT);
      element.draw(ctx);
    });

    objs.forEach((element) => {
      element.update(deltaT);
      element.draw(ctx);
    });

    removeDestroyedObjects(objs);

    //Objectives need work, only 1 per level atm
    objectives = objectives.filter((ob) => !ob.markedForDestroy);
    objectives.forEach((element) => {
      let complete = element.checkIfComplete();
      if (complete) {
        objectives.pop();
      }
    });

    if (objectives.length < 1) {
      //	console.log( 'level complete');
      currentLevel++;
      if (currentLevel > levels.length - 1) {
        currentLevel = 0;
        console.log("All levels complete");
      }
      loadLevel(currentLevel);
    }

    // Score
    showScoreboard();
  }
}

// Load first level
loadLevel(currentLevel);

// Start the main loop
setInterval(mainloop, 30);

// make a json object containing key state, pass it into update functions along with the deltaT

/* window.addEventListener(
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

			case "Q":
				console.log("q");
				break;

			default:
				return; // Quit when this doesn't handle the key event.
		}

		// Cancel the default action to avoid it being handled twice
		event.preventDefault();
	},
	true
); */
