const express = require("express");
const router = express.Router();

const saveUserController = require("../controller/saveUser");
const getUserController = require("../controller/getUser");
const deleteUserController = require("../controller/deleteUser");
const editUserController = require("../controller/editUser");

router.post("/save-user", saveUserController);
router.get("/get-user", getUserController);
router.put("/edit-user", editUserController);
router.delete("/delete-user", deleteUserController);

module.exports = router;
