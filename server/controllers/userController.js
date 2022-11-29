'use strict';
const userModel = require("../models/userModel");
const {validationResult} = require("express-validator");
const getUsers = async (req,res) => {    
    const users = await userModel.getAllUsers(res)
    res.json(users)
}
const getUser = async (req,res) => {
    const user = await userModel.getUserById(res,req.params.userId)
    if(user) {
        delete user.password
        res.json(user)
    } else {
        res.sendStatus(404)
    }
}

const modifyUser = async(req,res) => {
    const loginUser = req.user.user_id;
    if(req.params.userId) {
        req.body.id = req.params.userId;
    } else {
        req.body.id = loginUser;
    }
    if(!req.body.role && loginUser !== 1) {
        req.body.role = 1;
    } else if (loginUser === 1) {
        req.body.role = 0;
    }
    console.log("req.body",req.body);
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        const result = await userModel.modifyUser(res,req.body,loginUser);
        console.log("result",result);
        if(result && result.affectedRows > 0) {
            res.json({message:"user modified"});
        } else {
            res.status(404).json({message:"User modified failed"});
        }
    } else {
        res.status(400).json({message:"User validation failed",errors:errors.array()})
    }
}
const deleteUser = async (req,res) => {
    const loginUser = req.user.user_id;
    const result = await userModel.deleteUser(res,req.params.userId,loginUser)
    if(result && result.affectedRows > 0) {
        res.json({message:"user deleted"})
    } else {
        res.status(400).json({message:"user delete failed"})
    }
}

const checkToken = (req,res) => {
    delete req.user.password;
    res.json({user:req.user});
}
module.exports = {
    getUsers,
    getUser, 
    modifyUser,
    deleteUser,
    checkToken
}