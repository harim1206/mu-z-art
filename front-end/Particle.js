// PARTICLE OBJECT DEFINITION / METHODS
// Particles along the path
function Particle(position, hue, isNote){
	this.position = createVector(position.x, position.y)
	// true if it's a note particle
	this.isNote = isNote
}

// Small particle
Particle.prototype.display = function(other){
	stroke(r, g, b);
	fill(r, g, b, 127);
	ellipse(this.position.x,this.position.y, 2, 2)

	if (other) {
		line(this.position.x, this.position.y, other.position.x, other.position.y);
	}
}

// Colored particles for Notes
Particle.prototype.noteDisplay = function(other){

	stroke(r, g, b);
	fill(r, g, b, 127);
	ellipse(this.position.x,this.position.y, 6, 6)
	if (other) {
		line(this.position.x, this.position.y, other.position.x, other.position.y);
	}

}
