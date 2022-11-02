'use strict';
const pool = require("../database/db");
const promisePool = pool.promise();
const getAllUsers = async (res) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM wop_user");
    return rows;
  } catch(e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
}

const getUserById = async (res,userId) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM wop_user WHERE user_id = ?", [userId])
    return rows[0]
  } catch(e) {
    console.log("error",e.message);
    res.status(500).send(e.message)
  }
}
const addUser = async(res,data) => {
  const {name,email,passwd} = data
  try {
    await promisePool.query("INSERT INTO wop_user(name,email,password) VALUES(?,?,?)",[name, email,passwd])
    res.send("working")
  } catch(e) {
    console.log("error",e.message);
    res.status(500).send(e.message)
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser
};
