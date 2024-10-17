const selectElement = document.querySelector("#breeds");
const dogName = document.querySelector(".dogName");


selectElement.addEventListener('change', getPhotoOfSelectedDog);

function getAllBreeds(allBreedsWithArrays) {
	const baseBreeds = Object.keys(allBreedsWithArrays);
	const allBreeds = [];
	for (const breed of baseBreeds) {
		//
		if (allBreedsWithArrays[breed].length === 0) {
			allBreeds.push(breed);
		} else {
			for (const subBreed of allBreedsWithArrays[breed]) {
				const fullBreedName = `${breed} ${subBreed}`;
				allBreeds.push(fullBreedName);
			}
		}
	}
	return allBreeds;
}

function fillSelectWithOptions(allBreeds) {
	let html = "";
	for (const breed of allBreeds) {
		html += `<option value="${breed}">${breed}</option>`;
	}

	selectElement.innerHTML = html;

}

//-Select reiksmes gavimas ir image patalpinimas html'e---
function getPhotoOfSelectedDog() {
	const selectedBreed = selectElement.value;
	const dynamicSegment = selectedBreed.split(" ").join("/");
	
	// KAI YRA VIENAS PAVADINIMAS VEISLĖJE:
	// https://dog.ceo/api/breed/akita/images/random
	//          /akita/images/random
	// KAI YRA DU PAVADINIMAI VEISLĖJE:
	// https://dog.ceo/api/breed/australian/kelpie/images/random
	//          /australian/kelpie/images/random


	fetch(`https://dog.ceo/api/breed/${dynamicSegment}/images/random`)
		.then((headerRawData) => headerRawData.json())
		.then(doJobAfterServerRespondsWithImage);
}

//--funkcijos kurios iškviečiamos fetcho-----
function doJobAfterServerResponds(data) {
	const allBreeds = getAllBreeds(data.message);
	fillSelectWithOptions(allBreeds);
}
function doJobAfterServerRespondsWithImage(data) {
	const imgElement = document.querySelector("#dynamic-image");
	imgElement.src = data.message;
	dogName.innerHTML = selectElement.value;
}
//--------------------------------------
fetch("https://dog.ceo/api/breeds/list/all")
	.then((headerRawData) => headerRawData.json()) //kai srv. sutinka duoti duomenis
	.then(doJobAfterServerResponds); //kai srv gražina atsakymą - duomenis




function doJobAfterServerResponds(data){
    const allBreeds = getAllBreeds(data.message);
    fillSelectWithOptions(allBreeds);
}



// Fetch - contact with server

fetch("https://dog.ceo/api/breeds/list/all")
    .then((headerRawData) => headerRawData.json())
    .then(doJobAfterServerResponds);

