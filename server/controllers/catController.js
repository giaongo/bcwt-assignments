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
    if (req.params.id) {
        req.body.id = req.params.catId
    }
    console.log(req.body);
    const result = await catModel.updateCatById(res,req.body);
    if(result.affectedRows > 0) {
        res.json({message:"cat modified"})
    } else {
        res.status(404).json({message:"cat was already deleted"})
    }
}
const createCat = async(req,res) => {
    const errors = validationResult(req);
    if(errors.isEmpty() && req.file) {
        const catId = await catModel.createCat(res,req.body,req.file);
        console.log("Create successfully");
        res.status(201).json({message: "cat created",catId});
    } else {
        console.log("validation errors",errors);
        res.status(400).json({message: "cat creation fails",errors:errors.array()})
    }

}
const deleteCat = async(req,res) => {
    const result = await catModel.deleteCat(res,req.params.catId);
    console.log("cat deleted",result);
    if(result.affectedRows > 0) {
        res.json({message:"cat deleted"})
    } else {
        res.status(404).json({message:"cat was already missing"})
    }

}
module.exports = {
    getCat,
    getCats,
    modifyCat,
    createCat,
    deleteCat
} 