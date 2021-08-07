import { drawText , drawTextCenterScreen , drawTextUpperLeft } from '../utils/textUtils.js';
import { obj } from '../obj.js';


export class ShrinkingText extends obj{

	constructor( myText=""  ){
		super();
		
		this.textSize = 150;

		this.myText=myText;

		const canvas = document.getElementById('canvas');
		let width = canvas.width;
		let height = canvas.height;
		this.screenwidth=width;
		this.screenheight=height;
	}


	update(){}

	draw(ctx){
		this.textSize--;
		if(this.textSize>0 ){
			drawTextCenterScreen( ctx , this.myText , this.screenwidth , this.screenheight , this.textSize );
		}			
		else{
			this.markedForDestroy=true;
		}
	}
}