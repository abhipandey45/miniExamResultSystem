const express = require("express");
const router = express.Router();

const { loginAdmin,} = require("../controllers/authControllers");

// LOGIN ROUTE
router.post(
  "/login",
  loginAdmin
);

module.exports = router;