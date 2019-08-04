//___________________
//REQUIREMENTS
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const mongoURI = "mongodb://localhost 27017/"+"gameOfPhones"; // the db name will be builds
const Phone = require("./models/phones.js");
const MONGODB_URI = process.env.MONGODB_URI;

//___________________
//PORT
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//THE MONGOD
//___________________
// How to connect to the database either via heroku or locally
// SOMEDAY WE'LL FIND IT, THAT MONGOOSE CONNECTION
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true}, () => {
  console.log("Someday we'll find it, the mongoose connection...");
});


// Fix Depreciation Warnings from Mongoose*
// May or may not need these depending on your Mongoose version
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);



// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));


//___________________
//MIDDLEWARE
//___________________

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a   form



//___________________
// ROUTES
//___________________

/*new*/
app.get("/phones/new", (req,res) => {
  res.render("new.ejs");
});


/*create*/
app.post("/phones", (req, res) => {
  Phone.create(req.body, (error, newPhone) => {
    console.log(req.body);
    res.redirect("/phones");
  });
});


/*index*/
app.get("/phones", (req, res) => {
  Phone.find({}, (error, collection) => {
    res.render("index.ejs", {
      phones:collection
    });
  });
});



/*show*/
app.get("/phones/:id", (req, res) => {
  Phone.findById(req.params.id, (error, foundPhone) => {
    res.render("show.ejs", {
      phone:foundPhone
    });
  });
});


/*edit*/
app.get("/phones/:id/edit", (req, res) => {
  Phone.findById(req.params.id, (error, foundPhone) => {
    res.render("edit.ejs", {
      phone: foundPhone
    });
  });
});


/*update*/
app.put("/phones/:id", (req, res) => {
  Phone.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedPhone) => {
    res.redirect(`/phones/${req.params.id}`)
  });
});


/*delete*/
app.delete("/phones/:id", (req, res) => {
  Phone.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect("/phones");
  });
});


//___________________
//LISTENER
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
