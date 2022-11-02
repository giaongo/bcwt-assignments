'use strict';
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
// - create user route, user controller, use data available in user model
router.get("/",userController.getUsers)
router.get("/:userId", userController.getUser)

module.exports = router
