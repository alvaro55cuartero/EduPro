function isPointInsideRect(point, rect){
	if(rect.p1.x < point.x && rect.p2.x > point.x){
		if(rect.p1.y < point.y && rect.p2.y > point.y){
			return true;
		}
	}
}