const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

// Hash the password before saving it to the database
adminSchema.pre("save", async function (next) {
  const admin = this;
  //if block executes if there is any modification on the password field (here it is hashedPassword) otherwise it  exits out of the middleware using next()
  if (!admin.isModified("hashedPassword")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(admin.hashedPassword, salt);
    admin.hashedPassword = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("adminModel", adminSchema); //CustomModel=the name of the model

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const adminSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },

//   creation_date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// adminSchema.pre("save", async function (next) {
//   //presave - hash password before saving
//   try {
//     // Generate a salt for password hashing
//     const salt = await bcrypt.genSalt(10);

//     // Hash the user's password using the generated salt
//     const hashedPassword = await bcrypt.hash(this.password, salt);

//     // Replace the plain text password with the hashed password
//     this.password = hashedPassword;

//     // Call the next middleware in the chain or complete the save operation
//     next();
//   } catch (error) {
//     // If an error occurs during the hashing process, pass the error to the next middleware
//     next(error);
//   }
// });
