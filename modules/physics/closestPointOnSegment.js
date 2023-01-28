export function closestPointOnSegment( point=new Vec2(0,0) , segmentStart=new Vec2(0,0) , segmentEnd=new Vec2(1,1) ){
	
	let ab = segmentEnd.sub(segmentStart);

	let t = ab.dot(ab);

	if( t == 0.0 ){
		return segmentStart.cpy();
	}

	t = Math.max( 0.0 , Math.min( 1.0  ,   ( point.dot(ab) - segmentStart.dot(ab) )/ t  )  );
	
	let scaled = ab.scale(t);
	let closest = segmentStart.add(scaled);
	
	return closest;
}