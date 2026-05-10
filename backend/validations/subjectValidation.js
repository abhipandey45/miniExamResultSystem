const { body } = require("express-validator");



const subjectValidation = [

  body("subjectName")
    .notEmpty()
    .withMessage("Subject name is required"),

  body("subjectCode")
    .notEmpty()
    .withMessage("Subject code is required"),

  body("fullMarks")
    .isNumeric()
    .withMessage("Full marks must be a number")
    .custom((value) => value > 0)
    .withMessage("Full marks must be positive"),

  body("passMarks")
    .isNumeric()
    .withMessage("Pass marks must be a number")
    .custom((value) => value > 0)
    .withMessage("Pass marks must be positive"),

  body("passMarks").custom(
    (value, { req }) => {

      if (
        Number(value) >= Number(req.body.fullMarks)
      ) {

        throw new Error(
          "Pass marks must be less than full marks"
        );

      }

      return true;

    }
  ),

];

module.exports = subjectValidation;