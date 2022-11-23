'use strict';
// catController
const catModel = require('../models/catModel');
const {validationResult} = require("express-validator");
const getCats = async (req,res) => {
    const cats = await catModel.getAllCats(res);
    res.json(cats);
};
const getCat = async(req,res) => { 
  const cat = await catModel.getCatById(res,req.params.catId);
    if(cat) {
        res.json(cat);
    } else {
        res.sendStatus(404);
    }

}
const modifyCat = async(req,res) => {
    if (req.params.catId) {
        req.body.id = req.params.catId
    }
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        const owner = req.user.user_id;
        const result = await catModel.updateCatById(res,req.body,owner);
        console.log("cat modified",result);
        if(result.affectedRows > 0) {
            res.json({message:"cat modified"})
        } else {
            res.status(404).json({message:"cat modified failed"})
        }
    } else {
        res.status(400).json({message:"Cat error with validation",errors:errors.array()})
    }

}
const createCat = async(req,res) => {
    const errors = validationResult(req);
    if (!req.file) {
        res.status(400).json({message:"File missing or invalid"})
    } else if(errors.isEmpty()) {
        req.body.owner = req.user.user_id;
        const catId = await catModel.createCat(res,req.body,req.file);
        console.log("Create successfully");
        res.status(201).json({message: "cat created",catId});
    } else {
        console.log("validation errors",errors);
        res.status(400).json({message: "cat creation fails",errors:errors.array()})
    }

}
const deleteCat = async(req,res) => {
    const result = await catModel.deleteCat(res,req.params.catId,req.user.user_id);
    console.log("cat deleted",result);
    if(result.affectedRows > 0) {
        res.json({message:"cat deleted"})
    } else {
        res.status(401).json({message:"cat delete failed"})
    }

}
module.exports = {
    getCat,
    getCats,
    modifyCat,
    createCat,
    deleteCat
} 