const mongoose = require("mongoose");

const family_memberSchema = new mongoose.Schema({
  family_member_name: {
    type: String,
    required: true,
  },
  relation: {
    type: String,
    required: true,
  },
  family_member_DOB: {
    type: Date,
    required: true,
  },

  creation_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("family_memberModel", family_memberSchema); //CustomModel=the name of the model
