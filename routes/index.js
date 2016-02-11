var express = require('express');
var router = express.Router();
var jwt = require("jwt-simple")
var JWT_SECRET = process.env.JWT_SECRET; //this need be set manually in the environment

var User = require("../models/user");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Significant Otters' });
});


module.exports = router;
