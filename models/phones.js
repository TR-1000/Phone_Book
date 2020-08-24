///////PHONE SCHEMA/////

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const phoneSchema = new Schema ({
  owner:{type: String, unique: true, require: true},
  name: {type: String, required: true, unique: true},
  model:{type: String},
  img: {type: String},
  gallery: String,
  album: String,
  description: {type: String},
  status:String,
  log: String
},{timestamps: true})


const Phone = mongoose.model("Phone", phoneSchema);
module.exports = Phone;
