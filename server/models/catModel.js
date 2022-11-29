'use strict';
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCats = async (res) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query("SELECT cat_id, wop_cat.name,weight,owner,filename,birthdate,wop_user.name AS ownername FROM wop_cat INNER JOIN wop_user ON wop_cat.owner = wop_user.user_id");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
}

const getCatById = async (res,catId) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query("SELECT * FROM wop_cat WHERE cat_id = ?",[catId]);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
}

const createCat = async(res,data,fileData) => {
  const {name,weight,owner,birthdate,coords} = data;
  const {filename} = fileData;
  try {
    const [result] = await promisePool.query("INSERT INTO wop_cat(name,weight,owner,filename,birthdate,coords) VALUES(?,?,?,?,?,?)",
    [name,weight,owner,filename,birthdate,coords]);
    return result.insertId
  } catch(e) {
    console.log("error",e.message);
    res.status(500).send(e.message);
  }
}

const updateCatById = async (res,newData,loginUser) => {
  const {name,birthdate,weight,owner,id} = newData
  try {
    let query = "";
    const queryPlaceHolder = [name,weight,owner,birthdate,id];
    if(loginUser === 1) {
      query = "UPDATE wop_cat SET name= ?, weight= ?,owner = ?,birthdate= ? WHERE cat_id = ?";
    } else {
      query = "UPDATE wop_cat SET name= ?, weight= ?,owner = ?,birthdate= ? WHERE cat_id = ? AND owner = ?";
      queryPlaceHolder.push(loginUser);
    }
    const [rows] = await promisePool.query(query,queryPlaceHolder);
    return rows
  } catch(e) {
    console.log("error",e.message);
    res.status(500).send(e.message);
  }
}

const deleteCat = async(res, id,owner) => {
  try {
    let query = "";
    const queryPlaceHolder = [id];
    if(owner === 1) {
      query = "DELETE FROM wop_cat WHERE cat_id = ?";
    } else {
      query = "DELETE FROM wop_cat WHERE cat_id = ? AND owner = ?";
      queryPlaceHolder.push(owner);
    }
    const [rows] = await promisePool.query(query, queryPlaceHolder);
    return rows
  } catch(e) {
    console.log("error",e.message);
    res.status(500).send(e.message);
  }
}
module.exports = {
  getAllCats,
  getCatById,
  createCat,
  updateCatById,
  deleteCat
}