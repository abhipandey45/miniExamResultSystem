const express = require("express");

const router = express.Router();

const {

  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,

} = require("../controllers/studentController");

const studentValidation = require(
  "../validations/studentValidation"
);

const {
  protect,
} = require("../middleware/authMiddleware");



router.post(
  "/",
  protect,
  studentValidation,
  createStudent
);

router.get(
  "/",
  protect,
  getStudents
);

router.get(
  "/:id",
  protect,
  getStudentById
);

router.put(
  "/:id",
  protect,
  studentValidation,
  updateStudent
);

router.delete(
  "/:id",
  protect,
  deleteStudent
);

module.exports = router;