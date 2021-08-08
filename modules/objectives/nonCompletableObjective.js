/**
 * An objective which cannot be completed.
 * 
 * Used as a placeholder when creating levels, or for menu levels.
 */


class NonCompletable{
	constructor( objects ){
		this.objects = objects;

		this.markedForDestroy = false;
	}

	checkIfComplete(){
		
		return false;
	}
}

export { NonCompletable }