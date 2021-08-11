/**
 * WIP
 * 
 * Should return complete a certain amount of time after the level is loaded
 */
class TimedComplete{
	constructor( objects ){
		this.objects = objects;

		this.markedForDestroy = false;

		this.isComplete=false;
	}

	checkIfComplete(){
		return this.isComplete;
	}

	onStart(){
		this.isComplete=false;
		setTimeout( ()=>{ 
			console.log( "Timed objective complete ");
			this.isComplete=true; 
		}, 3000);
	}
}

export { TimedComplete }