'use strict';
const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/userController")
// - create user route, user controller, use data available in user model
router.route("/")
.get(userController.getUsers)
.post(
    body("name").isLength({min:3}).trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("passwd").isLength({min:3}).trim(),
    userController.createUser)
.put(userController.modifyUser) // add backend logic and validator
.delete(userController.deleteUser) 

router.route("/:userId")
.get(userController.getUser)

module.exports = router
