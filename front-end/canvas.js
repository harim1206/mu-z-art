// Array of path objects
// Each path object contains an array of particles
var paths = []
// Are we painting?
let painting = false
// How long until next cycle -> next = millis() + random(100) -> random of 100 milli seconds
let next = 0
let counter = 0

// Current and previous mouse positions. They will be vector objects
let current
let previous

// exploding particles array
let explodingParticles = []
var r, g, b;

// hide forms
document.getElementById('save-form').style.display = "none"
document.getElementById('drawing-select-list').style.display = "none"

// setup block runs once, used for initialization
function setup(position) {
	let canvas = createCanvas(window.innerWidth, window.innerHeight)
	canvas.parent('sketch-holder');

	current = createVector(0,0)
	previous = createVector(0,0)

	frameRate(60)

	stroke(r, g, b);
	fill(r, g, b, 127)
	r = random(255)
	g = random(255)
	b = random(255)

	// white background

}

// draw block runs repeatedly, and is used for animation.
// number of execution of the block is controlled by frameRate(x) in setup, by x times per second
function draw() {
	background(300)


	// If it's time for a new point
	if(millis() > next && painting){
		// grab mouse position
		current.x = mouseX
		current.y = mouseY

		// add a particle with current position vector to current path array
		// NOTE: CREATING A NEW PARTICLE
		paths[paths.length-1].add(current)

		// schedule next circle
		next = millis() + 100;
		previous.x = current.x
		previous.y = current.y
	}

	// Draw all paths
	for(let i = 0; i < paths.length; i++){
		// paths[i].update();
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
