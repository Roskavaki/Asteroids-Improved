
import { asteroid } from "../asteroid.js";

class DestroyAllAsteroids{
	constructor( objects ){
		this.objects = objects;

		this.markedForDestroy = false;
	}

	checkIfComplete(){
		let objectives = this.objects.filter( (ob) => (ob instanceof asteroid)  );

		if ( objectives.length < 1){
			console.log( ' all astroids cleared ');

			this.markedForDestroy = true;
			return true;
		}

		return false;
	}
}

export { DestroyAllAsteroids }