
var paths = []
// Are we painting?
let painting = false
// How long until next cycle -> next = millis() + random(100) -> random of 100 milli seconds
let next = 0
let counter = 0

// Current and previous mouse positions
let current
let previous

// exploding particles array
let explodingParticles = []
var r, g, b;

// hide forms
document.getElementById('save-form').style.display = "none"
document.getElementById('drawing-select-list').style.display = "none"

// setup block runs once, and is typically used for initialization, or for creating a program that does not need a loop running code repeatedly
function setup(position) {
	let canvas = createCanvas(1000, 450)
	canvas.parent('sketch-holder');

	current = createVector(0,0)
	previous = createVector(0,0)
	frameRate(60)

	stroke(r, g, b);
	fill(r, g, b, 127);
	r = random(255);
	g = random(255);
	b = random(255);

}

// draw block runs repeatedly, and is used for animation.
// number of execution of the block is controlled by frameRate(x) in setup, by x times per second
function draw() {
	background(250)

	// If it's time for a new point
	if(millis() > next && painting){
		// grab mouse position
		current.x = mouseX
		current.y = mouseY

		// add a particle with current position to current path
		// NOTE: CREATING A NEW PARTICLE
		paths[paths.length-1].add(current)

		// schedule next circle
		next = millis() + 100;
		previous.x = current.x
		previous.y = current.y
	}

	// Draw all paths
	for(let i = 0; i < paths.length; i++){
		paths[i].update();
		paths[i].display();
	}

	explodingParticles.forEach(particle => {
		particle.show()
		particle.update()
		if(particle.a < 0){
			explodingParticles.splice(explodingParticles.indexOf(particle), 1)
		}
	})

}

//
//
// MOUSE EVENTS
//
//
// start when mouse is pressed
function mousePressed(){
	next = 0
	painting = true
	previous.x = mouseX
	previous.y = mouseY
	// create a new Path object and add to array
	paths.push(new Path());

}

// stop when mouse is mouseReleased
function mouseReleased(){
	painting = false;
}


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

Path.prototype.update = function(){
// 	// Update path
// 	for (let i = 0; i < this.particles.length; i++){
// 		this.particles[i].update();
// 	}
}

Path.prototype.display = function(extra1){
	// Display path

	for (let i = this.particles.length-1; i >= 0; i--){
		if(this.particles[i].isNote){
			this.particles[i].noteDisplay(this.particles[i+1]);

		}else{
			this.particles[i].display(this.particles[i+1]);
		}
	}
}



// PARTICLE OBJECT DEFINITION / METHODS
// Particles along the path
function Particle(position, hue, isNote){
	this.position = createVector(position.x, position.y)
	// true if it's a note particle
	this.isNote = isNote
}

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



//
// EVENT LISTENERS
//
//
//
//
let playButton = document.getElementById('play-button')
playButton.addEventListener('click', execute)


let newButton = document.getElementById('new-button')
newButton.addEventListener('click',function(){
	window.location.reload();
})

let saveButton = document.getElementById('save-button')
saveButton.addEventListener('click',toggleSaveForm)

let showButton = document.getElementById('show-list-button')
showButton.addEventListener('click',populateDrawingsList)
