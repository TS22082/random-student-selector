const inquirer = require("inquirer");
const colors = require("colors");
const cowsay = require("cowsay");
const mongoose = require("mongoose");

const Student = require("./Models/Student");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/student-selector", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("You have been connected to mongodb"));
