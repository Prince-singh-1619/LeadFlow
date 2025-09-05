const userModel = require("../models/userModel");

async function editUserController(req, res) {
  try {
    const { _id, name, email, phone, company, notes } = req.body;
    if (!_id) throw new Error("_Id not found");
    if (!name) throw new Error("name required");
    if (!email) throw new Error("email required");
    if (!phone) throw new Error("phone required");
    if (!company) throw new Error("company required");

    const update = await userModel.findByIdAndUpdate(
      _id,
      { name, email, phone, company, notes },
      { new: true }
    );

    res.status(200).json({
      message: "User updated",
      data: update,
      success: true,
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

module.exports = editUserController;
