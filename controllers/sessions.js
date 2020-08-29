const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')
const bcrypt = require('bcrypt');

// form for new session/log in
sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs')
});

sessions.post('/', (req, res) => {
  // console.log(req.session);
  // console.log('this is req.body ', req.body)
  // console.log('this is password', req.body.password)
  User.findOne({ username: req.body.username}, (error, foundUser) => {
    if(error) {
      //console.log(error)
      res.send('<a href="/sessions/new">MISTAKES WERE MADE</a>')
    } else if (!foundUser) {
      res.send('user not found!')
    } else {
      if(bcrypt.compareSync(req.body.password, foundUser.password)) {
        //console.log("this is the current user", foundUser);
        req.session.currentUser = foundUser
        //console.log("This is req.session", req.session);
        res.redirect('/')
      } else {
        res.send('<a href="/sessions/new">INCORRECT USERNAME OR PASSWORD</a>')
      };
    };
  });
});

sessions.delete('/', (req, res)=>{
    req.session.destroy(() => {
        res.redirect('/')
    });
});
module.exports = sessions
