const Result = require("../models/Result");

const Student = require("../models/Student");

const Subject = require("../models/Subject");



/*
========================================
CREATE RESULT
========================================
*/

const createResult = async (req, res) => {

  try {

    const {
      studentId,
      examName,
      subjects,
    } = req.body;

    // validations

    if (
      !studentId ||
      !examName ||
      !subjects ||
      subjects.length === 0
    ) {

      return res.status(400).json({
        message:
          "Student, exam name and subjects are required",
      });

    }

    // check student exists

    const student = await Student.findById(
      studentId
    );

    if (!student) {

      return res.status(404).json({
        message: "Student not found",
      });

    }

    // duplicate result validation

    const existingResult =
      await Result.findOne({
        studentId,
        examName,
      });

    if (existingResult) {

      return res.status(400).json({
        message:
          "Result already exists for this exam",
      });

    }

    let totalMarks = 0;

    let totalFullMarks = 0;

    let status = "Pass";



    // validate all subjects

    for (const item of subjects) {

      const subject =
        await Subject.findById(item.subjectId);

      if (!subject) {

        return res.status(404).json({
          message: "Subject not found",
        });

      }

      // marks validation

      if (
        item.marksObtained < 0 ||
        item.marksObtained >
          subject.fullMarks
      ) {

        return res.status(400).json({
          message: `Invalid marks for ${subject.subjectName}`,
        });

      }

      // pass/fail validation

      if (
        item.marksObtained <
        subject.passMarks
      ) {

        status = "Fail";

      }

      totalMarks += item.marksObtained;

      totalFullMarks += subject.fullMarks;

    }



    // percentage calculation

    const percentage =
      (totalMarks / totalFullMarks) * 100;



    // grade calculation

    let grade = "F";

    if (percentage >= 90) {

      grade = "A+";

    } else if (percentage >= 80) {

      grade = "A";

    } else if (percentage >= 70) {

      grade = "B";

    } else if (percentage >= 60) {

      grade = "C";

    } else if (percentage >= 50) {

      grade = "D";

    }



    // create result

    const result = await Result.create({

      studentId,
      examName,
      subjects,

      totalMarks,

      percentage: percentage.toFixed(2),

      grade,

      status,

    });

    res.status(201).json(result);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



/*
========================================
GET ALL RESULTS
========================================
*/

const getResults = async (req, res) => {

  try {

    const results = await Result.find()

      .populate("studentId")

      .populate("subjects.subjectId")

      .sort({ createdAt: -1 });

    res.status(200).json(results);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



/*
========================================
GET RESULT BY ID
========================================
*/

const getResultById = async (req, res) => {

  try {

    const result = await Result.findById(
      req.params.id
    )

      .populate("studentId")

      .populate("subjects.subjectId");

    if (!result) {

      return res.status(404).json({
        message: "Result not found",
      });

    }

    res.status(200).json(result);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



/*
========================================
GET RESULTS BY STUDENT
========================================
*/

const getResultsByStudent = async (
  req,
  res
) => {

  try {

    const results = await Result.find({
      studentId: req.params.studentId,
    })

      .populate("studentId")

      .populate("subjects.subjectId");

    res.status(200).json(results);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



/*
========================================
DELETE RESULT
========================================
*/

const deleteResult = async (req, res) => {

  try {

    const result = await Result.findById(
      req.params.id
    );

    if (!result) {

      return res.status(404).json({
        message: "Result not found",
      });

    }

    await result.deleteOne();

    res.status(200).json({
      message: "Result deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



module.exports = {

  createResult,
  getResults,
  getResultById,
  getResultsByStudent,
  deleteResult,

};