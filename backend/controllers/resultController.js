const Result = require("../models/Result");
const Student = require("../models/Student");
const Subject = require("../models/Subject");

// Create result

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

    // Validate subjects
    for (const item of subjects) {
      const subject =
        await Subject.findById(
          item.subjectId
        );
      if (!subject) {
        return res.status(404).json({
          message: "Subject not found",
        });
      }

      // convert marks to number
      const marksObtained = Number(
        item.marksObtained
      );

      // marks validation
      if (
        marksObtained < 0 ||
        marksObtained >
        Number(subject.fullMarks)
      ) {
        return res.status(400).json({
          message: `Invalid marks for ${subject.subjectName}`,
        });

      }

      // pass/fail validation
      if (
        marksObtained <
        Number(subject.passMarks)
      ) {
        status = "Fail";
      }

      // calculate totals
      totalMarks += marksObtained;
      totalFullMarks += Number(
        subject.fullMarks
      );

    }

// Percentage Calculater
    const percentage = Number(
      (
        (totalMarks /
          totalFullMarks) *
        100
      ).toFixed(2)
    );

    // Grade Calculation
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


// Create Result
    const result = await Result.create({
      studentId,
      examName,
      subjects,
      totalMarks,
      percentage,
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



//Get All Results
const getResults = async (req, res) => {

  try {
    const query = {};
    if (req.query.examName) {
      query.examName =
        req.query.examName;
    }

    const results =
      await Result.find(query)
        .populate("studentId")
        .populate("subjects.subjectId")
        .sort({
          createdAt: -1,
        });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


//Get Result

const getResultById = async (
  req,
  res
) => {

  try {
    const result =
      await Result.findById(
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

//Get Result By Student_ID
const getResultsByStudent = async (
  req,
  res
) => {

  try {
    const results =
      await Result.find({
        studentId:
          req.params.studentId,
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

//Delete Section
const deleteResult = async (
  req,
  res
) => {

  try {
    const result =
      await Result.findById(
        req.params.id
      );

    if (!result) {
      return res.status(404).json({
        message: "Result not found",
      });
    }

    await result.deleteOne();

    res.status(200).json({
      message:
        "Result deleted successfully",
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