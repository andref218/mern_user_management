const express = require("express");
const { model } = require("mongoose");
const {
  getStats,
  searchUsers,
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/stats", getStats);
router.get("/search/:query", searchUsers);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
