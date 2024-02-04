const express = require("express");
const membersRouter = express.Router();
const memberModel = require("../models/member", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //CustomModel=name of the Model
const family_memberModel = require("../models/family_member", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //CustomModel=name of the Model
const shakhaModel = require("../models/shakha", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //CustomModel=name of the Model
const adminModel = require("../models/admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//generating member code

member_codeModel
  .findOne({ code: 1567 })
  .then((starting_code) => {
    if (!starting_code) {
      const startimg_code = new member_codeModel({
        code: 1567,
      });
      startimg_code.save();
    }
  })
  .catch((error) => {
    console.error("ERROR", error);
  });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//creating one
membersRouter.post("/", async (req, res) => {
  try {
    const new_member = new memberModel(req.body);
    new_member.member_code = starting_code + 1;
    const family_member = new family_memberModel({
      // memberModel
    });
    const new_family_member = await family_member.save();

    await memberModel.updateOne({
      $push: { family_members: new_family_member._id },
    });

    // Push the shakha ID into the member's shakha array
    await memberModel.updateOne(
      { _id: new_member._id },
      { $push: { shakha: new_shakha._id } }
    );
    const updated_member_data = await memberModel.findById(new_member._id); //updated data after pushing the ids
    res.status(201).json(updated_member_data);
  } catch (err) {
    // Handle error if needed
    res.status(500).json({ message: err.message }); // Internal Server Error
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//getting all
membersRouter.get("/", async (req, res) => {
  try {
    const all_members_data = await memberModel.find();
    const all_family_members_data = await family_memberModel.find(); //customModel
    const all_shakha_data = await shakhaModel.find();
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
membersRouter.patch("/:id", getMember, async (req, res) => {
  // if (req.body.password != null) {
  //   //checks if request body contains name
  //   res.admin.password = req.body.password;
  // }
  if (req.body.name != null) {
    //checks if request body contains name
    res.member.name = req.body.name;
  }
  if (req.body.DOB != null) {
    res.member.DOB = req.body.DOB;
  }
  if (req.body.profession != null) {
    res.member.profession = req.body.profession;
  }
  if (req.body.email_id != null) {
    res.member.email_id = req.body.email_id;
  }
  if (req.body.photo != null) {
    res.member.photo = req.body.photo;
  }
  if (req.body.GSM_no != null) {
    res.member.GSM_no = req.body.GSM_no;
  }
  if (req.body.WhatsApp_no != null) {
    res.member.WhatsApp_no = req.body.WhatsApp_no;
  }
  if (req.body.blood_group != null) {
    res.member.blood_group = req.body.blood_group;
  }
  if (req.body.family_status != null) {
    res.member.family_status = req.body.family_status;
  }
  if (req.body.residential_area != null) {
    res.member.residential_area = req.body.residential_area;
  }
  if (req.body.passport_no != null) {
    res.member.passport_no = req.body.passport_no;
  }
  if (req.body.civil_id_no != null) {
    res.member.civil_id_no = req.body.civil_id_no;
  }
  if (req.body.address_in_India != null) {
    res.member.address_in_India = req.body.address_in_India;
  }
  if (req.body.tel_no != null) {
    res.member.tel_no = req.body.tel_no;
  }
  if (req.body.is_family_residing_in_Oman != null) {
    res.member.is_family_residing_in_Oman = req.body.is_family_residing_in_Oman;
  }
  if (req.body.application_no != null) {
    res.application_no = req.body.application_no;
  }
  if (req.body.received_on != null) {
    res.member.received_on = req.body.received_on;
  }
  if (req.body.submitted_by != null) {
    res.member.submitted_by = req.body.submitted_by;
  }
  if (req.body.card_no != null) {
    res.member.card_no = req.body.card_no;
  }
  if (req.body.checked_by != null) {
    res.member.checked_by = req.body.checked_by;
  }
  if (req.body.approved_by != null) {
    res.member.approved_by = req.body.approved_by;
  }
  if (req.body.president != null) {
    res.member.president = req.body.president;
  }
  if (req.body.secretary != null) {
    res.member.secretary = req.body.secretary;
  }
  if (req.body.family_member_name != null) {
    res.family_member.family_member_name = req.body.family_member_name;
  }
  if (req.body.family_member_DOB != null) {
    res.family_member.family_member_DOB = req.body.family_member_DOB;
  }
  if (req.body.relation != null) {
    res.family_member.relation = req.body.relation;
  }
  if (req.body.shakha_name != null) {
    res.shakha_name = req.body.shakha_name;
  }
  if (req.body.shakha_name != null) {
    res.shakha_name = req.body.shakha_name;
  }
  try {
    const updatedmember = await res.member.save();
    const updatefamily_member = await res.family_member.save();
    const updateshakha = await res.shakha.save();
    const updateadmin = await res.admin.save();
    res.json({
      updatedmember: updatedmember,
      updatefamily_member: updatefamily_member,
      updateshakha: updateshakha,
      updateadmin: updateadmin,
    });
  } catch (err) {
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
