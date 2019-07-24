function Point(x, y) {
	this.x = x;
	this.y = y;
	
	this.divScalar = function(a) {
		this.x /= a;
		this.y /= a;

		return new Point(this.x, this.y);
	}
	
	this.add = function(p) {
		this.x += p.x;
		this.y += p.y;
	}
}



