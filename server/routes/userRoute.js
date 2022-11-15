'use strict';
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
// - create user route, user controller, use data available in user model
router.route("/")
.get(userController.getUsers)
.post(userController.createUser)
.put(userController.modifyUser)
.delete(userController.deleteUser)

router.route("/:userId")
.get(userController.getUser)

module.exports = router
