"use strict";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;

// fake database: ****************
const users = [
    {
      user_id: 1,
      name: "Foo Bar",
      email: "foo@bar.fi",
      password: "foobar",
    },
    {
      user_id: 2,
      name: "Bar Foo",
      email: "bar@foo.fi",
      password: "barfoo",
    },
  ];
  // *******************
  const getUser = (id) => {
    const user = users.filter((usr) => {
        if(usr.user_id === id) {
            return usr;
        }
    });
    return user[0];
  }

  const getUserLogin = (email) => {
    const user = users.filter((usr) => {
      if (usr.email === email) {
        return usr;
      }
    });
    return user[0];
  };

// serialize:store user id in session
  passport.serializeUser((id,done) => {
    console.log("serialize",id);
    process.nextTick(function() {
        return done(null,id)
    })
  });
// deserialize: get user id from session and from that get all user data 
/* When the session is authenticated, Passport will call the deserializeUser function, which is yieliding the previously stored userId,...
The req.use property is then set to the yielded information */
  passport.deserializeUser(async(id,done) => {
    console.log("id",id);
    const user = getUser(id);
    console.log("deserialize",user);
    process.nextTick(function() {
        return done(null,user);
    })
  });

  passport.use(
    new Strategy((username,password,done)=> {
        const user = getUserLogin(username);
        if(!user) {
            return done(null,false);
        } else if(user.password !== password) {
            return done(null,false);
        } else {
            return done(null,user.user_id);
        }
    })
  )
  module.exports = passport;