function Rectangle(p1, p2) {
	this.p1 = p1;
	this.p2 = p2;

	this.center = function() {
		return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
	}
}