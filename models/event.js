const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
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
});

module.export = mongoose.model('Event', eventSchema);