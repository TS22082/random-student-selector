const inquirer = require("inquirer");
const runProgram = require("./runProgram");

function addStudent() {
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
      const choice = inqurerResponse;

      switch (choice) {
        case "Add Student":
          break;

        default:
          process.exit();
          break;
      }
    });
}

module.exports = addStudent;
