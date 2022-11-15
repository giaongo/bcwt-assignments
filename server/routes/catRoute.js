'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const multer = require("multer");
const catController = require("../controllers/catController");
const {body} = require("express-validator");

const fileFilter = (req,file,cb) => {
    // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
    const acceptedTypes = ["image/jpeg","image/png","image/gif"]
    if(acceptedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
     // To reject this file pass `false`, like so:
    cb(null, false);
}
const upload = multer({dest:"uploads/",fileFilter})
router.route("/")
.get(catController.getCats)
.post(
    upload.single("cat"),
    body("name").isAlphanumeric(),
    body("birthdate").isDate(),
    body("weight").isFloat({min:0.1,max:30}),
    body("owner").isInt({min:1}),
    catController.createCat)
.put(catController.modifyCat)

router.route("/:catId")
.get(catController.getCat)
.delete(catController.deleteCat)
.put(catController.modifyCat);


module.exports = router;