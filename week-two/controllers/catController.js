'use strict';
// catController
const catModel = require('../models/catModel');
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
    await catModel.modifyCat(res,req.body);
    console.log("data updated");
}
const createCat = async(req,res) => {
    const catId = await catModel.createCat(res,req.body,req.file);
    console.log("Create successfully");
    res.status(201).json({catId});
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