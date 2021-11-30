import { spaceobj } from "../spaceobj.js";
import { tri } from "../shapes.js";
import { Vec2 } from "../utils/vec2.js";
import { circleDefault, lineDefault,  lineBetweenVector2} from "../utils/drawingUtils.js";

export class Flocker extends spaceobj{
	constructor(objects , flock=[] , name="dd" , colour="white" , pos=new Vec2(0,0) ){
		super(objects , tri , colour );
		this.wrap=true;
		flock.push( this );
		this.flock=flock;
		this.avgp = new Vec2();
		this.objectName = name;
		this.position=pos;

		this.other = new Vec2(0,0);
	}

	update( deltaT ){
		
		let heading = new Vec2(0,0);

		let rule1 = this.ruleScreenEdge( this ,700,700, 150, 0.60);
		let rule2 = this.ruleCohesion( this.flock  , 0.15 );
		let rule3 = this.ruleSeparation( this.flock , 0.25 , this , 100 );
		let rule4 = this.ruleAlignment( this.flock , 0.2 );
		let rule5 = this.ruleTowardsCenter( 0.05 );

		let res = heading.sum( [rule1, rule2 , rule3 , rule4 , rule5] ).normalized();

		//console.log( this.objectName +  " " + res.toString() )
		//let theta = Math.PI/2;

		let vv = this.velocity.clone();

		//vv.lerpTo( res , deltaT);

		this.velocity = vv.lerpTo( res.normalized().mul(2) ,  deltaT );

		let theta = Math.atan2( this.velocity.y , this.velocity.x );
		this.rotation = theta + Math.PI/2;

		super.update(deltaT);		
	}

	draw( ctx ){
		this.ctx=ctx;
		super.draw(ctx);
		circleDefault( ctx, this.avgp.toArray()     , 5   , this.colour);
		circleDefault( ctx, this.position.toArray() , 150 , this.colour);
		//lineBetweenVector2( ctx, this.position, this.position.add( this.other )  , this.colour );

		let dd = new Vec2(200,600)
		let vy = -this.forward().dot(dd);
		let vx = -this.right().dot(dd);
		let ee = new Vec2( vx, vy ).newRotated(this.rotation);
		lineBetweenVector2( ctx, this.position, this.position.add( ee )  , this.colour );
		circleDefault( ctx, dd.toArray() , 4 , this.colour);

	}

	inFov( vec ){
		//let vx = this.right().dot(vec);
		let vy = -this.forward().dot(vec);
		//let vy = -this.forward().dot(vec);
		this.other = new Vec2( 0, vy ).newRotated(this.rotation);

		return (vy > 5);
	}

	ruleTowardsCenter(fac=0.1){
		let center = new Vec2(350,350);
		let diff = this.position.sub(center);
		return diff.normalized().mul(fac);
	}

	ruleScreenEdge( agent, x=700 , y=700 ,margin=50, factor=1){
		let px = agent.position.x;
		let py = agent.position.y;
		
		let result = new Vec2();

		if( px < margin ){
			result.x += factor;
		}			
		else if( px > x-margin ){
			result.x -= factor;
		}
		
		if( py > y - margin ){
			result.y-=factor;
		}			
		else if( py <  margin ){
			result.y+=factor;
		}		
		return result;
	}

	ruleCohesion( flock = [] , factor=1 ){
		let pos = this.averagePosition( flock );

		this.avgp = pos;

		pos = pos.sub( this.position ).mul(factor);
		return pos;
	}

	ruleAlignment( flock = [] , factor=1 ){
		let heading = this.averageVelocity( flock ).mul(factor);
		return heading;
	}

	ruleSeparation( arr = [], factor=1, agent , mindistance=100   ){
		let totalx = 0;
		let totaly = 0;
		let count = 0;

		for( let i =0; i<arr.length; i++){
			let ob = arr[i];
			let dist = ob.position.distanceTo( agent.position );

			if( (dist < mindistance)   && this.inFov( ob.position )  ){
				totalx += ob.position.x;
				totaly += ob.position.y;
				count ++;
			}
			//&& this.inFov( ob.position )
			//console.log( this.inFov( ob.position ))
		}

		if( count > 0 ){
			let avgx = totalx/count;
			let avgy = totaly/count;
			let vec = new Vec2( avgx , avgy );
	
			vec = vec.sub( this.position ).mul( -factor );
			return vec;
		}
		else{
			let vec= new Vec2(0,0);
			return vec;
		}
	}

	averageVelocity( arr = [] ){
		let totalx = 0;
		let totaly = 0;
		let count = 0;

		for( let i =0; i<arr.length; i++){
			let ob = arr[i];

			if( this.inFov( ob.position )  ){
				totalx += ob.velocity.x;
				totaly += ob.velocity.y;
				count ++;
			}
		}

		if( count>0){
			let avgx = totalx/count;
			let avgy = totaly/count;
			let vec = new Vec2( avgx , avgy );
			return vec;
		}
		else{
			let vec = new Vec2( 0 , 0 );
			return vec;
		}
	}

	averagePosition( arr = [] ){
		let totalx = 0.0;
		let totaly = 0.0;
		let count = 0;

		for( let i =0; i<arr.length; i++){
			let ob = arr[i];
			if( this.inFov( ob.position ) ){
				totalx += ob.position.x;
				totaly += ob.position.y;
				count ++;			
			}			
		}

		if( count > 0 ){
			let avgx = totalx / count;
			let avgy = totaly / count;
	
			let vec = new Vec2( avgx , avgy );
			return vec;
		}
		else{
			let vec = new Vec2( 0 , 0 );
			return vec;
		}
	}

}