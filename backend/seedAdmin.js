// Only for testing Login API on postman ******

const dns = require("dns");
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require("mongoose");

const dotenv = require("dotenv");

const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");

const Admin = require("./models/Admin");

dotenv.config();

connectDB();



const seedAdmin = async () => {

  try {

    await Admin.deleteMany();

    const hashedPassword = await bcrypt.hash(
      "admin123",
      10
    );

    await Admin.create({

      email: "admin@gmail.com",

      password: hashedPassword,

    });

    console.log("Admin Created");

    process.exit();

  } catch (error) {

    console.log(error.message);

    process.exit(1);

  }

};

seedAdmin();