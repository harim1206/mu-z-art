// First Play Button helper function
// Particle explosion function
function execute(){
	for(let i = 0; i < paths.length; i++){

		let removeInterval = setInterval(()=>{
				if(paths[i].particles.length > 0){
					// NOTE: Create a new sound object with the current particle's location as the frequency.
					if(paths[i].particles[0].isNote){
						// thisNote is the frequency number on the major scale
						let thisNote = yPositionToNote(paths[i].particles[0].position.y)
						console.log(`thisNote`, thisNote)
						let thisParticleSound = createSound(thisNote, 'sine')
						thisParticleSound.env.play()
					}

					// create explodingParticles array at this position
					explode(paths[i].particles[0].position.x, paths[i].particles[0].position.y)
					paths[i].particles.splice(0,1)

				}else{
					window.clearInterval(removeInterval)
				}
		// NOTE: Particle Trigger Speed in milliseconds
  	}, 200)

	}
}

// HELPER FUNCTION: CONVERT Y POSITION TO NOTE SCALE
function yPositionToNote(yPosition){
	return findClosestNote(majorScaleC3, 900 - (yPosition * 2))
}

// HELPER FUNCTION: FIND CLOSEST NOTE
function findClosestNote(notesArray, input){
	let closest = notesArray.reduce(function(prev, curr) {
	  return (Math.abs(curr - input) < Math.abs(prev - input) ? curr : prev);
	})
	return closest
}

// HELPER FUNCTION - create explodingParticles array which contains explodingParticle objects
function explode(x, y) {
	let numParticles = random(2, 10)
	for(let i = 0; i <= numParticles; i++){
		let explodingParticle = new ExplodingParticle(x, y)
		explodingParticles.push(explodingParticle)
	}
}



function toggleSaveForm(){
  let form = document.getElementById('save-form')
  let submitButton = document.getElementById('submit-button')

  if(form.style.display === "" || form.style.display === "inline-block"){
    form.style.display = "none"
  }else{
    form.style.display = "inline-block"
  }

  submitButton.addEventListener('click',saveDrawing)

}

function saveDrawing(e){
  e.preventDefault()
  let drawingTitle = document.getElementById('drawing-title')
  let drawingPersonName = document.getElementById('drawing-person-name')
  let pathsJSON = pathsToJSON(paths)


  let postData = {
    name: drawingPersonName.value,
    title: drawingTitle.value,
    data: pathsJSON[1]
  }


	console.log(`pathsJSON: ${pathsJSON}`)
  fetch('http://localhost:3000/api/v1/drawings', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function populateDrawingsList(){

  let showWrapper = document.getElementById('saved-drawings-list-wrapper')

  // debugger
  let select = document.getElementById('drawing-select-list')
  if(select.style.display === "" || select.style.display === "block"){
    select.style.display = "none"
  }else{
    select.style.display = "block"
  }

  fetch('http://localhost:3000/api/v1/drawings')
    .then((res) => res.json())
    .then((json) => {
      // debugger
      json.forEach(function(drawingObj){
        let option = document.createElement('option')
        option.innerHTML = drawingObj.id + "-" + drawingObj.title + "-" + drawingObj.name
        option.setAttribute('value', drawingObj.id)
        select.appendChild(option)
      })
    })

  showWrapper.addEventListener('change',function(e){
    // console.log("HELLO")
    let drawingId = e.target.options[e.target.selectedIndex].value

    let fetchURL = 'http://localhost:3000/api/v1/drawings/' + drawingId

    fetch(fetchURL)
      .then((res) => res.json())
      .then((json) => {
				// set fetched data to global varialbe paths
        paths = JSONStringToPaths(json.data)

      })

  })

}

// HELPER FUNCTION: takes in a paths array, returns
// a json 'stringifiable' object
function pathsToJSON(paths){
  let pathsArray = []
  let pathsArrayString = ""

  // Iterate through each path
  paths.forEach(function(path){
    let pathData = []
    let pathDataString = ""
    // Iterate through each particles array
    path.particles.forEach(function(particle){
      let particleData = []
      let particleDataString = ""

      particleData.push(
        particle.position.x,
        particle.position.y,
        particle.isNote
      )

      // particleDataString += '['
      particleDataString += `${particle.position.x.toString()},`
      particleDataString += `${particle.position.y.toString()},`
      particleDataString += `${particle.isNote}`
      particleDataString += '/'

      pathData.push(particleData)
      pathDataString += particleDataString

    })

    pathDataString+='**endPATH'


    pathsArray.push(pathData)
    pathsArrayString += pathDataString

  })


  // Return:
  // [P1,P2,P3]
  // P1: [[x1,y1,Note1],[x2,y2,Note2]]
  // debugger
  return [pathsArray, pathsArrayString]

}

// TAKES IN A STRING FROM JSON AND CONVERTS IT INTO PATH
function JSONStringToPaths(string){

  let splitByPath = string.split("**endPATH")
  let paths = []

  splitByPath.forEach(function(pathString){
    let pathStringArray = pathString.split("/")
    pathStringArray.pop()
    let path = new Path()

    pathStringArray.forEach(function(particleString){
      let particleStringArray = particleString.split(",")
      let x = parseFloat(particleStringArray[0])
      let y = parseFloat(particleStringArray[1])
      let isNote = particleStringArray[2]
      let vector = createVector(x,y)
      path.add(vector)
    })
    paths.push(path)
  })

  return paths
}
