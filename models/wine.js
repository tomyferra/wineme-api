const mongoose = require('mongoose');
const { Schema } = mongoose;

const WineSchema = new Schema({
  Name: {type : String, required: true},
  Winery: {type : String},
  Variety: {type : String},
  Description: {type : String},
  Year: {type: Number},
  Totalqualifications: {type: Number},
  Avgqualifications: {type: Number},
  Score:{type: Number},
  Image: {type: String},
  Region: {type: String},
})

module.exports = mongoose.model('Wine',WineSchema);
