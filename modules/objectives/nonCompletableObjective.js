


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