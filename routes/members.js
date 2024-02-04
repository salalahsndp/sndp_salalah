const express = require("express");
const membersRouter = express.Router();

//importing models
const memberModel = require("../models/member", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //CustomModel=name of the Model
const family_memberModel = require("../models/family_member", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //CustomModel=name of the Model
const member_codeModel = require("../models/member_code", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function getMember(req, res, next) {
  //middlewarefor all /:id get requests
  let member;
  try {
    member = await memberModel.findById(req.params.id); //customModel
    if (member == null) {
      return res.status(404).json({ message: "cannot find member" }); //404 couldnt fnd something return exits out of the function
    }
  } catch (err) {
    return res.status(500).json({ message: err.message }); //500 error on server
  }
  res.member = member;
  next();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//creating one
membersRouter.post("/", async (req, res) => {
  try {
    const new_member = new memberModel(req.body);
    const savedMember = await new_member.save();
    res.status(201).json(savedMember);
  } catch (err) {
    res.status(500).json({ message: err.message }); // Internal Server Error
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//getting all
membersRouter.get("/", async (req, res) => {
  try {
    const all_members_data = await memberModel.find();
    res.json(all_members_data); //filenameofcustommodelmodelname
  } catch (err) {
    res.status(500).json({ messsage: err.message }); //to find the error in database,the error is not users fault
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//geting one
membersRouter.get("/:id", getMember, (req, res) => {
  //middleware gets activated;
  res.json(res.member);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//updating one
// PATCH route to update a member's information
membersRouter.patch("/:id", getMember, async (req, res) => {
  try {
    // Update member fields with values from req.body
    Object.assign(res.member, req.body);

    // Save the updated member
    const updatedMember = await res.member.save();

    // Respond with the updated member data
    res.json({ updatedMember });
  } catch (err) {
    // Handle error if needed
    res.status(400).json({ message: err.message });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//deleting one
membersRouter.delete("/:id", async (req, res) => {
  try {
    //await res.member.remove(); // This line might be causing the error
    await memberModel.deleteOne({ _id: req.params.id }); //customModel
    res.json({ message: "Deleted member" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = membersRouter;
