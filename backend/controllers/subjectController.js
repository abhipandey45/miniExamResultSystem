const { validationResult } = require("express-validator");

const Subject = require("../models/Subject");



/*
========================================
CREATE SUBJECT
========================================
*/

const createSubject = async (req, res) => {

  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({
        errors: errors.array(),
      });

    }

    const {
      subjectName,
      subjectCode,
      fullMarks,
      passMarks,
    } = req.body;

    // check duplicate subject code

    const existingSubject = await Subject.findOne({
      subjectCode,
    });

    if (existingSubject) {

      return res.status(400).json({
        message: "Subject code already exists",
      });

    }

    const subject = await Subject.create({

      subjectName,
      subjectCode,
      fullMarks,
      passMarks,

    });

    res.status(201).json(subject);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



/*
========================================
GET ALL SUBJECTS
========================================
*/

const getSubjects = async (req, res) => {

  try {

    const subjects = await Subject.find().sort({
      createdAt: -1,
    });

    res.status(200).json(subjects);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



/*
========================================
GET SINGLE SUBJECT
========================================
*/

const getSubjectById = async (req, res) => {

  try {

    const subject = await Subject.findById(
      req.params.id
    );

    if (!subject) {

      return res.status(404).json({
        message: "Subject not found",
      });

    }

    res.status(200).json(subject);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



/*
========================================
UPDATE SUBJECT
========================================
*/

const updateSubject = async (req, res) => {

  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({
        errors: errors.array(),
      });

    }

    const subject = await Subject.findById(
      req.params.id
    );

    if (!subject) {

      return res.status(404).json({
        message: "Subject not found",
      });

    }

    // duplicate subject code check

    const existingSubject = await Subject.findOne({
      subjectCode: req.body.subjectCode,
      _id: { $ne: req.params.id },
    });

    if (existingSubject) {

      return res.status(400).json({
        message: "Subject code already exists",
      });

    }

    const updatedSubject =
      await Subject.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(updatedSubject);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



/*
========================================
DELETE SUBJECT
========================================
*/

const deleteSubject = async (req, res) => {

  try {

    const subject = await Subject.findById(
      req.params.id
    );

    if (!subject) {

      return res.status(404).json({
        message: "Subject not found",
      });

    }

    await subject.deleteOne();

    res.status(200).json({
      message: "Subject deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



module.exports = {

  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,

};