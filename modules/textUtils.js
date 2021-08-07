
/** Draw text at some position */
function drawText(ctx , x=100,y=100 , txt='hello' , colour='red' , fontSize=24 , 
	align='center' , baseline='middle' , font='serif'){
	
	ctx.strokeStyle = colour;
	ctx.font = fontSize + 'px ' +  font;
	ctx.textAlign =  align;
	ctx.textBaseline = baseline;
	ctx.strokeText( txt , x, y);
}

function drawTextCenterScreen( ctx ,txt ,  width=100 , height=100 , fontSize=30 , fill=false ){

	//  Make sure font is imported by the webpage first!
	let font = 'biting';//'Comic Sans MS'; //serif
	ctx.font = fontSize + 'px ' +  font;

	ctx.textAlign =  "center";
	ctx.textBaseline = "middle";
	ctx.strokeStyle = "red";

	let x = width/2;
	let y = height/2;

	if( fill )
		ctx.fillText( txt, x,  y );
	else
		ctx.strokeText( txt ,x,  y);
}

function drawTextUpperLeft( ctx ,txt ,  width=0 , height=0 , fontSize=30 , fill=false ){
	ctx.font = fontSize + 'px serif';
	ctx.textAlign =  "left";
	ctx.textBaseline = "top";
	ctx.strokeStyle = "red";

	if( fill )
		ctx.fillText( txt, 0,  0 );
	else
		ctx.strokeText( txt , 0,  0);
}



export {drawText , drawTextCenterScreen , drawTextUpperLeft}