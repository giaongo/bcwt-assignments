'use strict';
const express = require('express');
const app = express();
const port = 3000;

app.get('/cat', (req, res) => {
  res.send('From this endpoint you can get cats.')
});
app.get('/cat/:catId', (req, res) => {
  console.log(req.params);
  res.send('From this endpoint you can get cats.'+ req.params.catId)
});
app.get("/user",(req,res) => {
  console.log(req.params);
  res.send('From this endpoint you can get users.')
})
app.post("/cat", (req,res) => {
  console.log(req);
  res.send("From this endpoint you can add more cats.")
});
app.put("/cat", (req,res) => {
  res.send("From this endpoint you can edit more cats.")})
app.delete("/cat",(req,res) => {
  res.send("From this endpoint you can delete more cats.")})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
