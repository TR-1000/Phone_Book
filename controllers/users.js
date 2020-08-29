const express = require('express')
const users = express.Router()
const User = require('../models/users.js')
const Phones = require("../models/users.js");
const bcrypt = require('bcrypt');

/*new*/
users.get('/new', (req, res) => {
  res.render('users/new.ejs')
});


/*create*/
users.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser)=>{
    if (foundUser) {
      res.send('<a href="/users/new"> <----Back--- USERNAME UNAVAILABLE </a>')
    } else if (foundUser === null) {
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        User.create(req.body, (err, createdUser)=>{
           res.redirect('/')
           console.log("user created");
        });
     } else {
      res.send('<a href="/users/new"> <----Back---MISTAKES WERE MADE</a>')
     }
  });
});


/*index*/
users.get("/", (req, res) => {
  User.find({}, (error, allUsers) => {
    res.render("users/index.ejs", {
      users: allUsers
    });
  });
});


/*show*/
users.get("/:id", (req, res) => {
  User.findById(req.params.id, (error, foundUser) => {
    res.render("users/show.ejs", {
      user: foundUser
    });
  });
});


module.exports = users
