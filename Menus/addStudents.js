const inquirer = require("inquirer");

function addStudent(cb) {
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
      cb(inqurerResponse.option);
    });
}

module.exports = runProgram;
