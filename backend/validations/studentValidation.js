const { body } = require("express-validator");



const studentValidation = [

  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("rollNumber")
    .notEmpty()
    .withMessage("Roll number is required"),

  body("className")
    .notEmpty()
    .withMessage("Class name is required"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email"),

  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number"),

];

module.exports = studentValidation;