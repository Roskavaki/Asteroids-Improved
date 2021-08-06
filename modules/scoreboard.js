
class Scoreboard{
	constructor(){
		this.score=0;
		console.log('new scoreboard')
	}

	add( x ){
		this.score+=x;
		console.log("Score "+ this.score);
	}

	toString( ){
		return "Score: " +  this.score;
	}
}

let scoreboard = new Scoreboard();

export {scoreboard};