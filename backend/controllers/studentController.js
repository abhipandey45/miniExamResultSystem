const { validationResult } = require("express-validator");

const Student = require("../models/Student");



/*
========================================
CREATE STUDENT
========================================
*/

const createStudent = async (req, res) => {

  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({
        errors: errors.array(),
      });

    }

    const {
      name,
      rollNumber,
      className,
      section,
      email,
      phone,
    } = req.body;

    // check existing roll number

    const existingStudent = await Student.findOne({
      rollNumber,
    });

    if (existingStudent) {

      return res.status(400).json({
        message: "Roll number already exists",
      });

    }

    const student = await Student.create({

      name,
      rollNumber,
      className,
      section,
      email,
      phone,

    });

    res.status(201).json(student);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



/*
========================================
GET ALL STUDENTS
========================================
*/

const getStudents = async (req, res) => {

  try {

    const keyword = req.query.search
      ? {
          $or: [
            {
              name: {
                $regex: req.query.search,
                $options: "i",
              },
            },
            {
              rollNumber: {
                $regex: req.query.search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const students = await Student.find(
      keyword
    ).sort({
      createdAt: -1,
    });

    res.status(200).json(students);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



/*
========================================
GET SINGLE STUDENT
========================================
*/

const getStudentById = async (req, res) => {

  try {

    const student = await Student.findById(
      req.params.id
    );

    if (!student) {

      return res.status(404).json({
        message: "Student not found",
      });

    }

    res.status(200).json(student);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



/*
========================================
UPDATE STUDENT
========================================
*/

const updateStudent = async (req, res) => {

  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({
        errors: errors.array(),
      });

    }

    const student = await Student.findById(
      req.params.id
    );

    if (!student) {

      return res.status(404).json({
        message: "Student not found",
      });

    }

    // duplicate roll number check

    const existingRoll = await Student.findOne({
      rollNumber: req.body.rollNumber,
      _id: { $ne: req.params.id },
    });

    if (existingRoll) {

      return res.status(400).json({
        message: "Roll number already exists",
      });

    }

    const updatedStudent =
      await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(updatedStudent);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



/*
========================================
DELETE STUDENT
========================================
*/

const deleteStudent = async (req, res) => {

  try {

    const student = await Student.findById(
      req.params.id
    );

    if (!student) {

      return res.status(404).json({
        message: "Student not found",
      });

    }

    await student.deleteOne();

    res.status(200).json({
      message: "Student deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



module.exports = {

  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,

};