const mongoose = require('mongoose');
const Schema = mongoose.Schema

const phoneSchema = new Schema ({
  name: {type: String, required: true},
  model:{type: String},
  img: {type: String},
  gallery: String,
  album: String,
  description: {type: String},
  status:String,
  log: String
},{timestamps: true})

const userSchema = Schema({
  username: String,
  password: String,
  phones:[phoneSchema]
});

const User = mongoose.model('User', userSchema)

module.exports = User
