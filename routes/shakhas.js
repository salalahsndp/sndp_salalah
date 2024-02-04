const express = require("express");
const shakhaRouter = express.Router();
//importring models
const shakhaModel = require("../models/shakha", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //CustomModel=name of the Model

async function getShakha(req, res, next) {
  //middlewarefor all /:id get requests
  let shakha;
  try {
    shakha = await shakhaModel.findById(req.params.id); //customModel
    if (shakha == null) {
      return res.status(404).json({ message: "cannot find shakha" }); //404 couldnt fnd something return exits out of the function
    }
  } catch (err) {
    return res.status(500).json({ message: err.message }); //500 error on server
  }
  res.shakha = shakha;
  next();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//creating one
shakhaRouter.post("/", async (req, res) => {
  const shakhaObject = new shakhaModel({
    shakha_name: req.body.shakha_name,
  });
  try {
    const newShakhaObject = await shakhaObject.save();
    res.status(201).json(newShakhaObject); //201 success status
  } catch (err) {
    res.status(400).json({ message: err.message }); //userfault
  }
});

// shakhaRouter.post("/", async (req, res) => {
//   try {
//     const shakhaData = new shakhaModel(req.body);
//     await shakhaData.save(); //member data is passed to new_member only after saving it that is why await
//     res.status(201).json(shakhaModel.find());
//   } catch (err) {
//     // Handle error if needed
//     res.status(500).json({ message: err.message }); // Internal Server Error
//   }
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//getting all
shakhaRouter.get("/", async (req, res) => {
  try {
    const all_shakha_data = await shakhaModel.find();
    res.json(all_shakha_data); //filenameofcustommodelmodelname
  } catch (err) {
    res.status(500).json({ messsage: err.message }); //to find the error in database,the error is not users fault
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//geting one
shakhaRouter.get("/:id", getShakha, (req, res) => {
  //middleware gets activated;
  res.json(res.shakha);
});

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//updating one
shakhaRouter.patch("/:id", getShakha, async (req, res) => {
  if (req.body.shakha_name != null) {
    //checks if request body contains name
    res.shakha.shakha_name = req.body.shakha_name;
  }

  try {
    const updateshakha = await res.shakha.save();

    res.json({
      updateshakha: updateshakha,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//deleting one
shakhaRouter.delete("/:id", async (req, res) => {
  try {
    //await res.member.remove(); // This line might be causing the error
    await shakhaModel.deleteOne({ _id: req.params.id }); //customModel
    res.json({ message: "Deleted member" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = shakhaRouter;
