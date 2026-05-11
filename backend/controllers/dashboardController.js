const Student = require("../models/Student");
const Subject = require("../models/Subject");
const Result = require("../models/Result");

//Dashboard
const getDashboardSummary = async (
  req,
  res
) => {
  try {
    // total students
    const totalStudents =
      await Student.countDocuments();
    // total subjects
    const totalSubjects =
      await Subject.countDocuments();
    // total results
    const totalResults =
      await Result.countDocuments();
    // passed students
    const passedStudents =
      await Result.countDocuments({
        status: "Pass",
      });
    // failed students
    const failedStudents =
      await Result.countDocuments({
        status: "Fail",
      });

    // response
    res.status(200).json({
      totalStudents,
      totalSubjects,
      totalResults,
      passedStudents,
      failedStudents,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardSummary,
};