const colors = require("colors");
const cowsay = require("cowsay");
const mongoose = require("mongoose");

// Menus for inquirer operation
const runProgram = require("./Menus/runProgram");

//Connect to student model
const Student = require("./Models/Student");

// Create a connection mongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/student-selector",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//Shows splash screen
//ask Student select, add student or quit

runProgram(userChoice => {
  console.log(userChoice);

  switch (userChoice) {
    case "Enter Random Student selector":
      console.log("Enter Random Student selector");
      process.exit();
      break;

    case "Add students":
      console.log("adding a student");
      process.exit();
      break;

    default:
      process.exit();
      break;
  }
});
