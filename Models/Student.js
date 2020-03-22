const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
  string: {
    type: String,
    trim: true,
    required: "Student name is required"
  }
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
