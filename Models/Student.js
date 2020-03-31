const mongoose = require('mongoose');

const { Schema } = mongoose;
const StudentSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'Student name is required',
  },
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
