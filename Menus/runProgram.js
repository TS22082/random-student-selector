const inquirer = require("inquirer");

function runProgram(cb) {
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
      cb(inqurerResponse.option);
    });
}

module.exports = runProgram;
