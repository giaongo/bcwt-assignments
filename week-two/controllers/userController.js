'use strict';
const userModel = require("../models/userModel");

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
const modifyUser = (req,res) => {}
const createUser = (req,res) => {
    console.log(req.body);
    const userInfo = `username: ${req.body.name}, email: ${req.body.email}`
    res.send("Adding new user" + userInfo)
}
const deleteUser = (req,res) => {
}

module.exports = {
    getUsers,
    getUser, 
    modifyUser,
    createUser,
    deleteUser
}