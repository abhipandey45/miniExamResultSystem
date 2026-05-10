const express = require("express");

const router = express.Router();

const {
  loginAdmin,
} = require("../controllers/authControllers");

module.exports = router;