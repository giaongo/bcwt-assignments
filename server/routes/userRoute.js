'use strict';
const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/userController")
router.get("/token",userController.checkToken)
router.route("/")
.get(userController.getUsers)
.post(
    body("name").isLength({min:3}).trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("passwd").isLength({min:3}).trim(),
    userController.createUser)
.put(
    body("name").isLength({min:3}).trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("passwd").isLength({min:3}).trim(),
    userController.modifyUser) 


router.route("/:userId")
.get(userController.getUser)
.put(
    body("name").isLength({min:3}).trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("passwd").isLength({min:3}).trim(),
    userController.modifyUser)
.delete(userController.deleteUser) 
module.exports = router
