import { playership } from "./modules/playership.js";
import * as utils from "./modules/utils/spaceUtils.js";
import { scoreboard } from "./modules/scoreboard.js";
import { Vec2 } from "./modules/utils/vec2.js";

import {
	drawTextUpperLeft,
} from "./modules/utils/textUtils.js";
import { Input } from "./modules/input.js";

import * as level1 from "./levels/level1.js";
import * as level2 from "./levels/level2.js";
import * as bosslevel from "./levels/boss1Level.js";
import * as victoryLevel from "./levels/victoryLevel.js";
import * as defeatLevel from "./levels/defeatLevel.js";

const canvas = document.getElementById("canvas");

// Disable canvas alpha, for optimization
const ctx = canvas.getContext("2d", { alpha: false });

let gameInput = new Input(window);

ctx.fillStyle = "green";
let width = canvas.width;
let height = canvas.height;

let collisionObjs = [];
let objs = [];
let objectives = [];

let player = new playership(objs, gameInput, "yellow");
player.position = new Vec2( width / 2, height / 2 + 60);

let player2 = new playership(objs, gameInput, "red");
player2.position = new Vec2( width / 2, height / 2 + 60);
player2.playerNo = 2;

// Pause rendering and game logic
let pause = false;

let currentLevel = 0;
//
let levels = [ level1 , level2, bosslevel, victoryLevel ];
let date = new Date();
let currentTime = date.getTime();
let lastTime = currentTime;


let coopMode = false;

function addObject( obj ){
	objs.push( obj );

	if( obj.canCollide ){
		collisionObjs.push( obj );
	}
}

function loadDefeatLevel(coopMode=false){	
	loadLevel( defeatLevel , coopMode);
	currentLevel = -1;  // -1 Because the defeat level is not actually in the array
}

function loadLevelIndex(ind , coopMode=false) {
	console.log( 'loading level: '+ind);
	loadLevel( levels[ind] , coopMode);
}

function resetPlayer( player ){
	player.position = new Vec2( width / 2, height / 2 + 120);
	player.velocity = Vec2.zero();
}

function resetPlayer2( player ){
	player.position = new Vec2( width / 2, height / 2 + 170);
	player.velocity = Vec2.zero();
}

function loadLevel( level , coopMode=false ){
	let lvl = level.createLevel();
	objs       = lvl.objects;
	objectives = lvl.objectives;

	player.objects = objs;
	resetPlayer( player );
	objs.push( player );

	if( coopMode ){
		player2.objects = objs;
		resetPlayer2( player2 );
		objs.push( player2 );
	}

	// Run the start function on each gameobject as soon as the level starts.
	// Note: not the same as the constructor because levels are created long before they
	// Are loaded into the game world.
	objs.forEach(ob => {
		ob.onStart();
	});

	// Start all objectives
	objectives.forEach(ob => {
		ob.onStart();
	});
}

function hotJoinPlayer2(){
	console.log( "p2 join" );

	if( coopMode == false){
		coopMode = true;
		player2.objects = objs;
		resetPlayer2( player2 );
		objs.push( player2 );		
	}
}

function dropOutPlayer2(){
	console.log( "p2 leave" );
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

function showScoreboard(){
	const fill = false;
	drawTextUpperLeft( ctx, scoreboard.toString(), "yellow", width, height, 30, fill , "biting" );
}

let frame = 0;

// Main game loop to draw each frame
function mainloop() {
	date = new Date();
	lastTime = currentTime;
	currentTime = date.getTime();
	let deltaT = (currentTime - lastTime) / 1000;

	if( gameInput.getKeyDown("p")){
		hotJoinPlayer2();
	}

	if( gameInput.getKeyDown("o")){
		dropOutPlayer2();
	}
	
	if (!pause) {		
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, width, height);

		utils.checkCollisions(objs);

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

		// Load next level if objectives complete
		if (objectives.length < 1) {
			console.log( 'level add');

			currentLevel++;
			if (currentLevel > levels.length - 1) {
				currentLevel = 0;
				console.log("All levels complete");
			}
			loadLevelIndex(currentLevel , coopMode);
		}

		// Score
		showScoreboard();

		// Defeat if player died
		if( player.hp <=0 ){
			loadDefeatLevel( coopMode );
		}		
	}

	gameInput.clearkeydowns();
}

// Load first level
loadLevelIndex(currentLevel,coopMode);

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
