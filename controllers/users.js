const express = require('express')
const users = express.Router()
const User = require('../models/users.js')
const Phones = require("../models/users.js");



/*new*/
users.get('/new', (req, res) => {
  res.render('users/new.ejs')
});


/*create*/
users.post('/', (req, res) => {
  User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err)
    }
    req.session.currentUser = createdUser
    console.log(createdUser);
    res.json({ createdUser })
  });
});

/*index*/
users.get("/", (req, res) => {
  User.find({}, (error, allUsers) => {
    res.json(allUsers);
  });
});


/*show*/
users.get("/:id", (req, res) => {
  User.findById(req.params.id, (error, foundUser) => {
    res.json(foundUser);
  });
});


/*user collection show route*/  //FIND USERS ID change owner from username to id
///////////////////////////////////////////////////////////////////////////////
users.get("/:id/collection", (req, res) => {
  Phones.find({owner: req.params.id}, (error, foundPhones) => {
  //////////////////////////////////////////////////////////////////////////////
    if (typeof req.session === "undefined") {
      res.render("/");
    } else {
      res.render(`users/show.ejs`, {
        phones: foundPhones,
        currentUser: req.session.currentUser
      });
    };
  });
});


module.exports = users
