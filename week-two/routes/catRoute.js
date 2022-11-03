'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const multer = require("multer");
const catController = require("../controllers/catController");


const upload = multer({dest:"uploads/"})
router.route("/")
.get(catController.getCats)
.post(upload.single("cat"),catController.createCat)
.put(catController.modifyCat);

router.route("/:catId")
.get(catController.getCat)
.delete(catController.deleteCat)



module.exports = router;