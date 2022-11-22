'use strict';
const express = require('express');
const app = express();
const port = 3000;
const loggedIn = (req,res,next) => {
  if(req.user) {
    next();
  } else {
    res.redirect("/form");
  }
};

const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./utils/pass");
const user = {
  username: "foo",
  password: "bar"
}

app.set('views','./views');
app.set('view engine', 'pug');
app.use(cookieParser())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // form data
// as the user navigates from page to page, the session itself can be authenticated using the built in session strategy
app.use(session({
  secret:"ghfdioigob",
  saveUninitialized:false,
  resave:true,
  cookie:{maxAge:60000}
}));
app.use(passport.initialize());
app.use(passport.session())

app.get('/', (req, res) => {
  res.render('home');
});
app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/secret', loggedIn,(req,res) => {
  res.render("secret");
}
);
app.post('/login', passport.authenticate("local", {failureRedirect:"/form"}),
(req,res) => {
  console.log("working success");
  res.redirect("/secret")
});

// app.get("/logout",(req,res) => {
//   // req.session.loggedIn = false;
//   res.clearCookie("connect.sid")
//   res.redirect("/");
// })
app.get("/logout",(req,res,next) => {
  req.logout(function(err) {
    if(err) {return next(err);}
    res.clearCookie("connect.sid")
    res.redirect("/");
  });
});

app.get('/getCookie', (req, res) => {
  console.log(req.cookies);
  res.send("Your color choice was " + req.cookies.color);
});

app.get("/setCookie/:color",(req,res) => {
  console.log(req.params.color);
  res.cookie("color",req.params.color);
  res.send("cookie set");
})

app.get('/deleteCookie', (req, res) => {
  res.clearCookie("color")
  res.send("Color cookie deleted")
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
