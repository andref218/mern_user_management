const express = require("express");
const { model } = require("mongoose");
const { getStatus, searchUsers } = require("../controllers/userController");

const router = express.Router();

router.get("/status", getStatus);
router.get("/search/:query", searchUsers);

module.exports = router;
