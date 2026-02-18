const express = require("express");
const { model } = require("mongoose");
const { getStatus } = require("../controllers/userController");

const router = express.Router();

router.get("/status", getStatus);

module.exports = router;
