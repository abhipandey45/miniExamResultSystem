const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    examName: {
      type: String,
      required: true,
      trim: true,
    },

    subjects: [
      {
        subjectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
          required: true,
        },

        marksObtained: {
          type: Number,
          required: true,
        },
      },
    ],

    totalMarks: {
      type: Number,
      default: 0,
    },

    percentage: {
      type: Number,
      default: 0,
    },

    grade: {
      type: String,
      default: "F",
    },

    status: {
      type: String,
      enum: ["Pass", "Fail"],
      default: "Fail",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Result",
  resultSchema
);