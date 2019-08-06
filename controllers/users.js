const express = require('express')
const users = express.Router()
const User = require('../models/users.js')


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
    console.log(createdUser);
    res.redirect('/')
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
