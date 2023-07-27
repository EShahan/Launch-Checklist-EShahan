// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */

}

function validateInput(testInput) {
   if (testInput.value === "") {
    return "Empty"
   }
   else if (isNaN(testInput.value)) {
    return "Not a Number"
   }
   else {
    return "Is a Number"
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let launchStatus = document.getElementById("launchStatus");
    let faultyItems = document.getElementById("faultyItems");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    for (let i=0; i<list.length; i++) {
        if(validateInput(list[i]) === "Empty") {
            alert("all fields are required!"); // Checks if any field is empty.
            return; // User must click submit again
        }
    }

    // Check that fuelLevel and cargoLevel are numbers
    if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("fuelLevel and cargoMass must both be numbers!");
        return; // User must click submit again
    }

    // Above are basic checks for that the information is readable. Below are checks for faulty equipment.

    // Update pilotStatus and copilotStatus to include name
    pilotStatus.innerHTML = `Pilot ${pilot.value} Ready`;
    copilotStatus.innerHTML = `Co-pilot ${copilot.value} Ready`;

    //If fuel level is too low (< 10,000L) faulty visible, shuttle not ready + red shade, cargoStatus too high
    if (fuelLevel.value < 10000) {
        faultyItems.style.visibility = "visible";
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = "red";
        fuelStatus.innerHTML = `Fuel level too low for launch`;
    }

    //If cargo is too large (> 10,000kg) faulty visible, shuttle not ready + specific red shade, cargoStatus too high
    if (cargoLevel.value > 10000) {
        faultyItems.style.visibility = "visible";
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = "#C7254E";
        cargoStatus.innerHTML = `Cargo Mass too high for launch`;
    }

    // If no faulty equipment, successful launch, rehide faultyItems, change color to green
    if (fuelLevel.value >= 10000 && cargoLevel.value <= 10000) {
        faultyItems.style.visibility = "hidden";
        launchStatus.innerHTML = `Shuttle is ready for launch`
        launchStatus.style.color = "#419F6A"
    }

    // console.log(validateInput(pilot));
    // console.log(validateInput(copilot));
    // console.log(validateInput(fuelLevel));
    // console.log(validateInput(cargoLevel));
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch().then( function(response) {
    });

    return planetsReturned;
}

function pickPlanet(planets) {
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
