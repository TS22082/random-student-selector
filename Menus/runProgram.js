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
      if (inqurerResponse.option === "Quit") {
        process.exit();
      } else {
        cb("going well");
        process.exit();
      }
    });
}

module.exports = runProgram;
