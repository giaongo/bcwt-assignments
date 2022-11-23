'use strict';
const { query } = require("../database/db");
const pool = require("../database/db");
const promisePool = pool.promise();
const getAllUsers = async (res) => {
  try {
    const [rows] = await promisePool.query("SELECT user_id,name,email,role FROM wop_user");
    return rows;
  } catch(e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
}

const getUserById = async (res,userId) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM wop_user WHERE user_id = ?", [userId]);
    return rows[0];
  } catch(e) {
    console.log("error",e.message);
    res.status(500).send(e.message)
  }
}

const getUserLogin = async (user) => {
  try {
    console.log("getUser",user);
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE email = ?;',
        user);
    return rows;
  } catch (e) {
    console.log("error",e.message);
    res.status(500).send(e.message);
  }
};

const addUser = async(res,data) => {
  const {name,email,passwd,role} = data;
  try {
    const [result] = await promisePool.query("INSERT INTO wop_user(name,email,password,role) VALUES(?,?,?,?)",[name, email,passwd,role]);
    return result.insertId;
  } catch(e) {
    console.log("error",e.message);
    res.status(500).send(e.message);
  }
}

const modifyUser = async(res,data) => {
  const {name,email,passwd,role,id} = data;
  try {
    const query = "UPDATE wop_user SET name=?,email=?,password=?,role=? WHERE user_id =?"
    const [result] = await promisePool.query(query,[name,email,passwd,role,id]);
    return result;
  } catch(e) {
    console.log("error",e.message);
    res.status(500).send(e.message);
  }
}

const deleteUser = async(res,id) => {
  try {
    const query = "DELETE FROM wop_user WHERE user_id=?"
    const [rows] = await promisePool.query(query,[id])
    return rows
  } catch(e) {
    console.log("error",e.message);
    res.status(500).send(e.message);
  }

}

module.exports = {
  getAllUsers,
  getUserById,
  getUserLogin,
  addUser,
  modifyUser,
  deleteUser
};
