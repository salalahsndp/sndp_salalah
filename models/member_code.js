const mongoose = require("mongoose");

const member_codeSchema = new mongoose.Schema({
  code: {
    type: Number,
  },
  id: {
    type: Number,
    unique: true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("member_codeModel", member_codeSchema);
