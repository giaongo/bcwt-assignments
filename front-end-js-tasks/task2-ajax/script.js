'use strict';
const apiUrl = "https://api.tvmaze.com/search/shows?q="
const form = document.querySelector("#search-form");
const button = form.querySelector("button");
const input = form.querySelector("input");
const results = document.querySelector("#results")
button.addEventListener("click",(event) => {
    // do not submit the form to anywhere (no page refresh)
    event.preventDefault();     
    event.stopPropagation(); // prevents other generic event listeners
    const queryParam = input.value;
    if(queryParam) {
        getTVSeriesData(queryParam)
    }
});

const getTVSeriesData = async(name) => {
    try {
        const response = await fetch(apiUrl + name)
        const data = await response.json();
        console.log("results:",data);
        renderResult(data);
    } catch(error) {
        console.log("Network fails");
    }

} 

const renderResult = (data) => {
    results.innerHTML = "";
    for(let i=0; i < data.length; i++) {
        const h3 = document.createElement("h3");
        h3.innerText = data[i].show.name;
        const img = document.createElement("img");
        img.src = data[i].show.image.medium;
        results.append(h3);
        results.append(img);
    } 
}
document.addEventListener("click",(event) => {
    console.log("mouse clicked somewhere on the page",event);
})

