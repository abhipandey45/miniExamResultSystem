const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");

const generateToken = require("../utils/generateToken");



const loginAdmin = async (req, res) => {

  try {

    const { email, password } = req.body;

    // validation
    console.log("Inside validation --");
    if (!email || !password) {

      return res.status(400).json({
        message: "Email and password are required",
      });

    }

    // find admin

    const admin = await Admin.findOne({ email });

    if (!admin) {

      return res.status(401).json({
        message: "Invalid credentials",
      });

    }

    // compare password

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {

      return res.status(401).json({
        message: "Invalid credentials",
      });

    }

    // send response

    res.status(200).json({

      message: "Login successful",

      token: generateToken(admin._id),

      admin: {
        id: admin._id,
        email: admin.email,
      },

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  loginAdmin,
};