// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
                <img src="${imageUrl}">
    `
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
    // let faultyItems = document.getElementById("faultyItems");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");

    inputList = [pilot, copilot, fuelLevel, cargoLevel];
    // console.log(validateInput(pilot));
    // console.log(validateInput(copilot));
    // console.log(validateInput(fuelLevel));
    // console.log(validateInput(cargoLevel));

    // Checks if any field is empty.
    for (let i=0; i<inputList.length; i++) {
        if(validateInput(inputList[i]) === "Empty") {
            // alert("all fields are required!"); // Checks if any field is empty.
            // return; // Prevents status' from updating
        }
    }

    // Check if any value is inappropriate
    if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number" || validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        // alert("Make sure to enter valid information for each field!");
        // return; // Prevents status' from updating
    }

    // Above are basic checks for that the information is readable. Below are checks for faulty equipment.

    // Update pilotStatus and copilotStatus to include name
    pilotStatus.innerHTML = `Pilot ${pilot.value} Ready`;
    copilotStatus.innerHTML = `Co-pilot ${copilot.value} Ready`;

    //If fuel level is too low (< 10,000L) faulty visible, shuttle not ready + red shade, cargoStatus too high
    if (fuelLevel.value < 10000) {
        list.style.visibility = "visible";
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = "red";
        fuelStatus.innerHTML = `Fuel level too low for launch`;
    }
    else { // Fixes scenario where bad fuel amount is inserted initially, then good amount for fuel but still bad for cargo will still read a poor status for fuel
        fuelStatus.innerHTML = `Fuel level high enough for launch`
    }

    //If cargo is too large (> 10,000kg) faulty visible, shuttle not ready + specific red shade, cargoStatus too high
    if (cargoLevel.value > 10000) {
        list.style.visibility = "visible";
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = "#C7254E";
        cargoStatus.innerHTML = `Cargo Mass too high for launch`;
    }
    else { // Fixes scenario where bad cargo amount is inserted initially, then good amount for cargo but still bad for fuel will still read a poor status for cargo
        cargoStatus.innerHTML = `Cargo mass low enough for launch`;
    }

    // If no faulty equipment, successful launch, rehide faultyItems, change color to green
    if (fuelLevel.value >= 10000 && cargoLevel.value <= 10000) {
        list.style.visibility = "hidden";
        launchStatus.innerHTML = `Shuttle is ready for launch`
        launchStatus.style.color = "#419F6A"
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * 6)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
