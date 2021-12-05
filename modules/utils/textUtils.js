
/** Draw text at some position */
export function drawText(ctx , x=100, y=100 , txt='hello' , colour='red' , fontSize=24 , 
	align='center' , baseline='middle' , font='serif' , fill=false ){
	
	ctx.save();

	ctx.font = fontSize + 'px ' +  font;
	ctx.textAlign =  align;
	ctx.textBaseline = baseline;

	if( fill ){
		ctx.fillStyle = colour;
		ctx.fillText( txt , x, y);
	}
	else{
		ctx.strokeStyle = colour;
		ctx.strokeText( txt , x, y);
	}

	ctx.restore();
}

export function drawTextCenterScreen( ctx ,txt ,  width=100 , height=100 , fontSize=30 , fill=false, 
	colour='red' , fontName='biting' , offsetX=0, offsetY=0 ){

	ctx.save();

	//  Make sure font is imported by the webpage first!
	//let font = 'biting';//'Comic Sans MS'; //serif
	ctx.font = fontSize + 'px ' +  fontName;

	ctx.textAlign =  "center";
	ctx.textBaseline = "middle";
	ctx.strokeStyle = "red";

	let x = width/2 + offsetX;
	let y = height/2 + offsetY;

	if( fill ){
		ctx.fillStyle = colour;
		ctx.fillText( txt, x,  y );
	}		
	else{
		ctx.strokeStyle = colour;
		ctx.strokeText( txt ,x,  y);
	}

	ctx.restore();
}

/**
 * Draw text in the upper left corner of the screen
 * @param {*} ctx 
 * @param {*} txt 
 * @param {*} colour 
 * @param {*} width 
 * @param {*} height 
 * @param {*} fontSize 
 * @param {*} fill 
 */
export function drawTextUpperLeft( ctx ,txt , colour="red" ,  width=0 , height=0 , fontSize=30 , fill=false , font='serif'){
	drawText(ctx , 0 , 0 , txt, colour , fontSize , 'left' , 'top' , font , fill );
}



//export {drawText , drawTextCenterScreen }