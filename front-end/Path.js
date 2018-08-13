// A Path is an array of particles
function Path(){
	this.particles = [];
	this.hue = random(r, g, b);
	r = random(255);
	g = random(255);
	b = random(255);

}

Path.prototype.add = function(position){
	// Add a new particle with a position and hue

	if(this.particles.length % 3 === 0){
		this.particles.push(new Particle(position, this.hue, true))
	}else{
		this.particles.push(new Particle(position, this.hue, false))
	}

}

Path.prototype.display = function(){
	// Display path

	for (let i = this.particles.length-1; i >= 0; i--){
		if(this.particles[i].isNote){
			this.particles[i].noteDisplay(this.particles[i+1]);

		}else{
			this.particles[i].display(this.particles[i+1]);
		}
	}
}


// Path.prototype.update = function(){
// 	// Update path
// 	// for (let i = 0; i < this.particles.length; i++){
// 	// 	this.particles[i].update();
// 	// }
// }
