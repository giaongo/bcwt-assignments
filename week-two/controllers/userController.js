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
const createUser = async(req,res) => {
    await userModel.addUser(res,req.body)
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