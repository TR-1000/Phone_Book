///////BUILD SCHEMA/////

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const phoneSchema = new Schema ({
  name: {type: String, required: true},
  img: {type: String},
  gallery: [String],
  album: [String],
  description: {type: String},
  ram: {type: String},
  album: [String],
  status:String,
  acc:[String],
  log: String
},{timestamps: true})


const Phone = mongoose.model("Phone", phoneSchema);
module.exports = Phone;
