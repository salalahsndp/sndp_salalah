const mongoose = require("mongoose");

const shakhaSchema = new mongoose.Schema({
  shakha_name: {
    type: String,
    required: true,
  },

  creation_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("shakhaModel", shakhaSchema); //CustomModel=the name of the model
