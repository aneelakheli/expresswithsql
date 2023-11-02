const express = require("express");
const {
  getAllUserController,
  addUserController,
  getOneUserController,
  deleteUserController,
  updateUserController,
} = require("../controllers/userController");
const validate = require("../middleware/validate");
const { validator } = require("../middleware/validator");
const router = express.Router();

router.get("/", getAllUserController);
router.get("/:id", getOneUserController);
router.post(
  "/",
  validate(["name", "email", "phoneNumber"]),
  validator,
  addUserController
);
router.delete("/:id", deleteUserController);
router.patch("/:id", updateUserController);

module.exports = router;
