'use strict';
// catRoute
const express = require('express');
const router = express.Router()
const catController = require("../controllers/catController")

router.get("/", catController.getCats);
router.get('/:catId', catController.getCat);
router.post("/", (req,res) => {
    console.log(req);
    res.send("From this endpoint you can add more cats.")
  });
router.put("/", (req,res) => {
    res.send("From this endpoint you can edit more cats.")})
router.delete("/",(req,res) => {
    res.send("From this endpoint you can delete more cats.")})

module.exports = router;