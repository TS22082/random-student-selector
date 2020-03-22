const colors = require("colors");
const cowsay = require("cowsay");
const mongoose = require("mongoose");

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

runProgram(res => {
  console.log(res);
});