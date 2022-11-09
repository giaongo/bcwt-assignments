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
        console.log("Network fails",error);
    }
} 

const renderResult = (data) => {
    results.innerHTML = "";
    for(let i=0; i < data.length; i++) {
       renderDataIntoResult(data[i],results);
    } 
}

const renderDataIntoResult = (data,results) => {
    const h3 = document.createElement("h3");
    h3.innerText = data.show.name;
    const img = document.createElement("img");
    img.src = data.show.image ? data.show.image.medium : "http://placekitten.com/200/300";
    const officialSite = document.createElement("a");
    const siteLink = data.show.officialSite ? data.show.officialSite : "#No-Link"
    officialSite.href = siteLink;
    officialSite.innerText = siteLink;
    officialSite.style.display = "block";
    const summary = document.createElement("p");
    summary.innerHTML = data.show.summary;
    results.append(h3);
    results.append(img);
    results.append(officialSite);
    results.append(summary);
    renderGenres(data.show.genres,results)
}

const renderGenres = (genresList,results) => {
    const genres = document.createElement("div");
    for(let j = 0; j < genresList.length; j++) {
        const genre = document.createElement("span");
        genre.innerText = genresList[j];
        if(j !== (genresList.length - 1)) {
            genre.innerText += " | ";
        } else {
            genre.innerHTML += "<hr><br>";
        }
        genres.append(genre);
    }
    results.append(genres);
}

document.addEventListener("click",(event) => {
    console.log("mouse clicked somewhere on the page",event);
})

