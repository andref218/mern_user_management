const express = require("express");
const { model } = require("mongoose");
const {
  getStatus,
  searchUsers,
  getUserById,
  getAllUsers,
  createUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/status", getStatus);
router.get("/search/:query", searchUsers);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);

module.exports = router;
