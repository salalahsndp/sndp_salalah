const express = require("express");
const loginRouter = express.Router();
const bcrypt = require("bcrypt");
const adminModel = require("../models/admin"); // Import your Admin model

// Login endpoint
loginRouter.post("/", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    // Find the user by username
    const admin = await adminModel.findOne({ username: username });

    // Check if the user exists
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(
      password,
      admin.hashedPassword
    );

    // Check if passwords match
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // If everything is correct, you can generate a token or set a session and send a success response
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = loginRouter;

// const express = require("express");
// const loginRouter = express.Router();
// const bcrypt = require("bcrypt");
// //importing models
// const adminModel = require("../models/admin", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// async function getadmin(req, res, next) {
//   //middlewarefor all /:id get requests
//   let admin;
//   try {
//     admin = await adminModel.findById(req.params.id); //customModel
//     if (admin == null) {
//       return res.status(404).json({ message: "cannot find admin" }); //404 couldnt fnd something return exits out of the function
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message }); //500 error on server
//   }
//   res.admin = admin;
//   next();
// }

// // Login route
// loginRouter.post("/", async (req, res) => {
//   //deconstruction - extracting username and password from request body
//   const { username, password } = req.body;

//   try {
//     // Find the user by username
//     const admin = await adminModel.findOne({ username });
//     const isPasswordValid = await bcrypt.compare(
//       password,
//       admin.hashedPassword
//     );
//     // Check if the user exists and the password is correct
//     if (admin && isPasswordValid) {
//       // You can also generate a JWT token here for authentication
//       res.status(200).json({ message: "Login successful!" });
//     } else {
//       res.status(401).json({ message: "Invalid username or password" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// module.exports = loginRouter;

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //creating one

// loginRouter.post("/", async (req, res) => {
//   try {
//     const adminData = new adminModel(req.body);
//     console.log("Received Admin Data:", adminData);
//     await adminData.save();
//   } catch (err) {
//     res.status(500).json({ message: err.message }); // Internal Server Error
//   }
// });
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //async getting all
// loginRouter.get("/", async (req, res) => {
//   try {
//     const all_admins_data = await adminModel.find();
//     res.json(all_admins_data); //filenameofcustommodelmodelname
//   } catch (err) {
//     res.status(500).json({ messsage: err.message }); //to find the error in database,the error is not users fault
//   }
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //geting one
// loginRouter.get("/:id", getadmin, (req, res) => {
//   //middleware gets activated;
//   res.json(res.admin);
// });

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //updating one
// loginRouter.patch("/:id", getadmin, async (req, res) => {
//   if (req.body.password != null) {
//     //checks if request body contains name
//     res.admin.password = req.body.password;
//   }
//   if (req.body.username != null) {
//     //checks if request body contains name
//     res.admin.username = req.body.username;
//   }

//   try {
//     await res.admin.updateOne();
//     res.json(adminModel.findById(req.params._id));
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //deleting one
// loginRouter.delete("/:id", async (req, res) => {
//   try {
//     //await res.member.remove(); // This line might be causing the error
//     await adminModel.deleteOne({ _id: req.params.id }); //customModel
//     res.json({ message: "Deleted admin" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = loginRouter;
