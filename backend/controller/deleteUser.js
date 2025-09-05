const userModel = require("../models/userModel");

async function deleteUserController(req, res) {
  const dataId = req.query.dataId;
  if (!dataId) throw new Error("data Id not received");

  try {
    const deleted = await userModel.findByIdAndDelete(dataId);

    if (!deleted) {
      res.status(404).json({
        message: "User data not found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "user data deleted",
      data: deleted,
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

module.exports = deleteUserController;
