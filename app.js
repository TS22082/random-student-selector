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
    .then(async res => {
      const newStudent = await Student.create({ name: res.newStudent });
      newStudent.save();
      fullStudentArray = await Student.find();
      studentsArray = [...fullStudentArray];

      console.log(`${newStudent.name} was added succesfully`);
      addStudentMenu();
    });
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
          runProgram();
          break;
      }
    });
}

function chooseStudent() {
  if (studentsArray.length > 0) {
    const randomStudentIndex = Math.floor(Math.random() * studentsArray.length);
    const randomStudent = studentsArray[randomStudentIndex];

    console.log(
      cowsay.say({
        text: "\n" + randomStudent.name + "\n",
        e: "oO",
        T: "U "
      }).rainbow + "\n"
    );

    studentsArray.splice(randomStudentIndex, 1);
  } else {
    console.log("re-populating array...");

    studentsArray = [...fullStudentArray];
    const randomStudentIndex = Math.floor(Math.random() * studentsArray.length);
    const randomStudent = studentsArray[randomStudentIndex];

    console.log(
      cowsay.say({
        text: "\n" + randomStudent.name + "\n",
        e: "oO",
        T: "U "
      }).rainbow + "\n"
    );

    studentsArray.splice(randomStudentIndex, 1);
  }

  chooseStudentMenu();
}
