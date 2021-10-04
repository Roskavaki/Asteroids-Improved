export function closestPointOnSegment( p=new Vec2(0,0) , a=new Vec2(0,0) , b=new Vec2(1,1) ){
	
	let ab = b.sub(a);

	let t = ab.dot(ab);

	if( t == 0.0 ){
		return a.cpy();
	}

	t = Math.max( 0.0 , Math.min( 1.0  ,   ( p.dot(ab) - a.dot(ab) )/ t  )  );
	
	let scaled = ab.scale(t);
	let closest = a.add(scaled);
	
	return closest;
}