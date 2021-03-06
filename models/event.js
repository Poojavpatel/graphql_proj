const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:String,
    required:true
  },
  date:{
    type:String,
    required:true
  },
  createdBy:{
    type:String,
    ref:'User'
  },
});

module.exports = mongoose.model('Event', eventSchema);