const colors = require("colors");
const cowsay = require("cowsay");
const inquirer = require("inquirer");

const mongoose = require("mongoose");

//Connect to student model
const Student = require("./Models/Student");

let fullStudentArray = [];
let studentsArray = [];

// Create a connection mongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/student-selector", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    fullStudentArray = await Student.find();
    studentsArray = [...fullStudentArray];
    studentsArray.pop();

    runProgram();
  });

// function to start program
function runProgram() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: ["Enter Random Student selector", "Add students", "Quit"],
        name: "option"
      }
    ])
    .then(inqurerResponse => {
      const choice = inqurerResponse.option;

      switch (choice) {
        case "Enter Random Student selector":
          chooseStudentMenu();
          break;
        case "Add students":
          addStudentMenu();
          break;

        default:
          process.exit();
      }
    });
}

//function that brings user to add student menu screen
function addStudentMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: ["Add Student", "Quit"],
        name: "addScreenOption"
      }
    ])
    .then(inqurerResponse => {
      const choice = inqurerResponse.addScreenOption;

      switch (choice) {
        case "Add Student":
          addStudent();
          break;
        default:
          runProgram();
          break;
      }
    });
}

// screen for user to input student name
function addStudent() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter students name",
        name: "newStudent"
      }
    ])
    .then(res =>
      console.log(
        Student.create({ name: res.newStudent }).then(newStudent => {
          console.log(`${newStudent.name} was added succesfully`);
          addStudentMenu();
        })
      )
    );
}

//pick random student menu
function chooseStudentMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: ["Pick Student", "Quit"],
        name: "userChoice"
      }
    ])
    .then(res => {
      switch (res.userChoice) {
        case "Pick Student":
          chooseStudent();
          break;

        default:
          console.log("working");
          process.exit();
          break;
      }
    });
}

function chooseStudent() {
  const randomStudent =
    studentsArray[Math.floor(Math.random() * studentsArray.length)].name;

  console.log(randomStudent);
  chooseStudentMenu();
}
