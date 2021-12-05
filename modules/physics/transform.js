import { Vec2 } from "../utils/vec2.js";
export class Transform{
	constructor( position=new Vec2(0,0)  , rotation=0 , scale=1 ){
		this.position = position;
		this.rotation = rotation;
		this.scale = scale;
	}
}