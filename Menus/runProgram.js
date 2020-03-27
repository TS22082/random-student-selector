const inquirer = require("inquirer");
const addStudent = require("./addStudents");

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
          process.exit();
          break;

        case "Add students":
          addStudent();
          break;

        default:
          process.exit();
          break;
      }
    });
}

module.exports = runProgram;
