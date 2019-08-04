///////PHONE SCHEMA/////

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const phoneSchema = new Schema ({
  name: {type: String, required: true},
  model:{type: String},
  img: {type: String},
  gallery: String,
  album: String,
  description: {type: String},
  status:String,
  acc:String,
  log: String
},{timestamps: true})


const Phone = mongoose.model("Phone", phoneSchema);
module.exports = Phone;
