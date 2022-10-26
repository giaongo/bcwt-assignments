"use strict";
const express = require("express");
const app = express();
const port = 3000;
let counter = 0;

app.use(express.static("public"));
app.set("view engine","pug");
app.get("/",(req,res) => {
    res.send("Hello World!");
})

app.get("/test",(req,res) => {
    console.log("someone is trying to test me");
    counter++;
    res.render("test", {
        title: "Pug test page",
        header1: "Pug test page",
        header2: "Counter",
        exampleText:"Page requested " + counter + " times.",
    })
})

app.get("/catinfo",(req,res) => {
    const cat = {
        name: "Frank",
        birthdate: "2010-12-25",
        weight:5,
    };
    res.json(cat);

})
app.listen(port , () => {
    console.log(`Example app listening on port ${port}`);
})