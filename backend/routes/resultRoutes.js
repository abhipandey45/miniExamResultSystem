const express = require("express");

const router = express.Router();

const {

  createResult,
  getResults,
  getResultById,
  getResultsByStudent,
  deleteResult,

} = require("../controllers/resultController");

const {
  protect,
} = require("../middleware/authMiddleware");



router.post(
  "/",
  protect,
  createResult
);

router.get(
  "/",
  protect,
  getResults
);

router.get(
  "/:id",
  protect,
  getResultById
);

router.get(
  "/student/:studentId",
  protect,
  getResultsByStudent
);

router.delete(
  "/:id",
  protect,
  deleteResult
);

module.exports = router;