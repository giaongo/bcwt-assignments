"use strict";
const main = document.querySelector("main");
const article = document.createElement("article");
const header = document.createElement("header");
const h2 = document.createElement("h2");
const figure = document.createElement("figure");
const img = document.createElement("img");
const figcaption = document.createElement("figcaption");
const p = document.createElement("p");

h2.innerText = "Article header";
header.appendChild(h2);
img.src = "http://placekitten.com/320/160";
img.alt = "title";
figcaption.innerText = "Caption";
p.innerText = ">Here is some text. Here is some text. Here is some text. Here is some text.";
figure.append(img,figcaption);
article.append(header,figure,p);
main.appendChild(article);

