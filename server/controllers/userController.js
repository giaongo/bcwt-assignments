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

const createUser = async(req,res) => {
    if(!req.body.role) {
        req.body.role = 1
    }
    const errors = validationResult(req);
    console.log("validation errors",errors);
    if(errors.isEmpty()) {
        const result = await userModel.addUser(res,req.body)
        console.log(result);
        res.status(201).json({message:"user created",userId:result})
    } else {
        res.status(400).json({message:"user creation failed",errors: errors.array()})
    }

}


const modifyUser = async(req,res) => {
    if(req.params.userId) {
        req.body.id = req.params.userId;
    }
    if(!req.body.role) {
        req.body.role = 1;
    }
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        const result = await userModel.modifyUser(res,req.body);
        if(result.affectedRows > 0) {
            res.json({message:"user modified"});
        } else {
            res.status(404).json({message:"User was already deleted"});
        }
    } else {
        res.status(400).json({message:"User modified failed",errors:errors.array()})
    }
}
const deleteUser = async (req,res) => {
    const result = await userModel.deleteUser(res,req.params.userId)
    if(result.affectedRows > 0) {
        res.json({message:"user deleted"})
    } else {
        res.status(400).json({message:"user was already missing"})
    }
}

module.exports = {
    getUsers,
    getUser, 
    modifyUser,
    createUser,
    deleteUser
}