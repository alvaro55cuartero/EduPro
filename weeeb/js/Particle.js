function Particle(pos, m) {
	this.pos = pos;
	this.m = m; 
	this.vel = new Point(0,0);
	this.f = new Point(0,0);

	this.tick = function() {
		a = this.f.divScalar(this.m);
		this.vel.add(a);
		this.pos.add(this.vel);
	}
}