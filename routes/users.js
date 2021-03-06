'use strict';

var express = require('express');
var router = express.Router();
var Firebase = require('firebase')
var User = require('../models/user');

var ref = new Firebase('https://hw23significantotter.firebaseio.com/');

router.get('/register', function(req, res, next) {
  //var token = req.cookies.userjwt;
  //if(token) return res.redirect("/dashboard");
  //res.render('register');
  res.send("registered on backend from get")
});

router.post('/register', function(req, res, next) {
  console.log('**** /register route invoked');
  User.register(req.body, function(err, user) {
    console.log(req.body, 'WORKS');
    res.send(user);
  });
});
  // var token = req.cookies.userjwt;
  //
  // ref.register(userObj, function(err, savedUser) {
  //   res.data = token
  //   res.cookie = token
  //   res.send(savedUser)
// });

// router.post('/register', function(req, res, next) {
//   User.register(req.body, function(err, savedUser) {
//     res.status(err ? 400 : 200).send(err || savedUser);
//   });
// });

function returnFromRegCallback() {
  console.log('****returnFromRegCallback:' + arguments[0])
}

router.get('/login', function(req, res, next) {
  var token = req.cookies.userjwt;
  //if(token) return res.redirect("/dashboard");
  //res.render('login');
  res.send("OK")
});

/*

router.put('/password', User.isLoggedIn, function(req, res, next) {
User.findById(req.user._id, function(err, user){
ref.changePassword({
email: user.email,
oldPassword: req.body.oldPass,
newPassword: req.body.newPass
}, function(error) {
if (error) {
switch (error.code) {
case "INVALID_PASSWORD":
res.status(400).send("The specified user account password is incorrect.");
break;
case "INVALID_USER":
res.status(400).send("The specified user account does not exist.");
break;
default:
res.status(400).send("Error changing password:", error);
}
} else {
res.send("User password changed successfully!");
}
});
});
});

*/




router.post('/login', function(req, res, next) {

  // req.body --> {email:  , password:  }

  User.login(req.body, function(err, token) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.cookie('userjwt', token).send("User Logged In");
    }
  });
});

router.post('/logout', function(req, res, next) {
  res.clearCookie('userjwt').send();
});
/*
router.get('/profile', User.isLoggedIn, function(req, res) {
User.findById(req.token._id, function(err, user) {
res.send(user);
});
});
*/
module.exports = router;
