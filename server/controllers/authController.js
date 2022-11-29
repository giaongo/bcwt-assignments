"use strict";
const jwt = require("jsonwebtoken");
const passport = require("passport");
const userModel = require("../models/userModel");
const {validationResult} = require("express-validator");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const login = (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      delete user.password;
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res);
};

const createUser = async(req,res) => {
  console.log("creating new user",req.body);
  if(!req.body.role) {
      req.body.role = 1
  }
  const errors = validationResult(req);
  console.log("validation errors",errors);
  if(errors.isEmpty()) {
    //Hash the input password and replace the clear  texxt password with the hash password before adding to db
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(req.body.passwd,salt);
      req.body.passwd = passwordHash;
      const result = await userModel.addUser(res,req.body)
      console.log(result);
      res.status(201).json({message:"user created",user_id:result})
  } else {
      res.status(400).json({message:"user creation failed",errors: errors.array()})
  }

}
const logout = async(req,res) => {
  res.json({message:"User logged out"})
}
module.exports = {
  login,
  createUser,
  logout
};
