'use strict';
const express = require('express');
const app = express();
const cors = require("cors");
const port = 3000;
const catRouter = require("./routes/catRoute");
const userRouter = require("./routes/userRoute");

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use("/cat",catRouter);
app.use("/user",userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
