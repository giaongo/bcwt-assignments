"use strict";
const express = require("express");
const router = express.Router();
const { login,createUser } = require("../controllers/authController");
const {body} = require("express-validator");
router.post("/login", login);
router.post("/register",
        body("name").isLength({min:3}).trim().escape(),
        body("email").isEmail().normalizeEmail(),
        body("passwd").isLength({min:8}).matches("[A-Z]").trim(),
        createUser)
module.exports = router;