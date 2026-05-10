const express = require("express");

const router = express.Router();

const {

  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,

} = require("../controllers/subjectController");

const subjectValidation = require(
  "../validations/subjectValidation"
);

const {
  protect,
} = require("../middleware/authMiddleware");



router.post(
  "/",
  protect,
  subjectValidation,
  createSubject
);

router.get(
  "/",
  protect,
  getSubjects
);

router.get(
  "/:id",
  protect,
  getSubjectById
);

router.put(
  "/:id",
  protect,
  subjectValidation,
  updateSubject
);

router.delete(
  "/:id",
  protect,
  deleteSubject
);

module.exports = router;