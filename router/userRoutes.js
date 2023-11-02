const express = require("express");
const {
  getAllUserController,
  addUserController,
  getOneUserController,
  deleteUserController,
  updateUserController,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", getAllUserController);
router.get("/:id", getOneUserController);
router.post("/", addUserController);
router.delete("/:id", deleteUserController);
router.patch("/:id",updateUserController)

module.exports = router;
