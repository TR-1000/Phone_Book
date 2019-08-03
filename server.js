//___________________
//REQUIREMENTS
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const mongoURI = "mongodb://localhost 27017/"+"phone_book"; // the db name will be builds
//___________________
//PORT
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//THE MONGOD
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Fix Depreciation Warnings from Mongoose*
// May or may not need these depending on your Mongoose version
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// SOMEDAY WE'LL FIND IT, THAT MONGOOSE CONNECTION
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true}, () => {
  console.log("Someday we'll find it, the mongoose connection...");
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//MIDDLEWARE
//___________________

app.use(express.static('public'));


app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a   form


//___________________
// ROUTES
//___________________
//localhost:3000
app.get("/" , (req, res) => {
  res.render("index.ejs");
});

//___________________
//LISTENER
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
