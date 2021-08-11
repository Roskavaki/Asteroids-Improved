/**
 * Objective which is complete if a target object is null or marked for cleanup
 */

export class DestroyParticularObject{
	constructor( target ){
		this.target = target;

		this.markedForDestroy = false;
	}

	checkIfComplete(){
		if( this.target.markedForDestroy ){
			this.markedForDestroy = true;
			return true;
		} 

		if( this.target === null || this.target === undefined ){
			this.markedForDestroy = true;
			return true;
		} 

		return false;
	}

	onStart(){}
}
