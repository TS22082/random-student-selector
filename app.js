const inquirer = require("inquirer");
const colors = require("colors");
const cowsay = require("cowsay");
const mongoose = require("mongoose");

const Student = require("./Models/Student");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/student-selector",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

function runProgram() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: ["Pick a student", "Add students", "Quit"],
        name: "option"
      }
    ])
    .then(inqurerResponse => {
      if (inqurerResponse.option === "Quit") {
        process.exit();
      } else {
        console.log("going well");
        process.exit();
      }
    });
}

runProgram();
