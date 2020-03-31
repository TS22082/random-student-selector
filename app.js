const colors = require('colors'); // eslint-disable-line no-unused-vars
const cowsay = require('cowsay');
const inquirer = require('inquirer');

const mongoose = require('mongoose');

// Connect to student model
const Student = require('./Models/Student');

let fullStudentArray = [];
let studentsArray = [];
const showStudentTable = process.argv.length > 2;

// Create a connection mongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/student-selector', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(async () => {
  fullStudentArray = await Student.find();
  studentsArray = [...fullStudentArray];
  runProgram();
});

// function to start program
function runProgram() {
  inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'Enter Random Student Selector',
        'Add students',
        'Drop Students',
        'Quit',
      ],
      name: 'option',
    },
  ]).then((inqurerResponse) => {
    const choice = inqurerResponse.option;

    switch (choice) {
      case 'Enter Random Student Selector':
        if (fullStudentArray.length > 0) {
          chooseStudentMenu();
        } else {
          console.log(
            '\n!!! You must add students before choosing a random student\n'.red,
          );
          runProgram();
        }

        break;
      case 'Add students':
        addStudentMenu();
        break;
      case 'Drop Students':
        if (fullStudentArray.length > 0) {
          dropStudentMenu();
          break;
        } else {
          console.log(
            '\n!!! You must add students before you can drop anyone\n'.red,
          );
          runProgram();
          break;
        }

      default:
        process.exit();
    }
  });
}

// drop student menu
function dropStudentMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Select Students', 'Quit'],
        name: 'dropStudentOptions',
      },
    ]).then((res) => {
      switch (res.dropStudentOptions) {
        case 'Select Students':
          dropSelectStudents();
          break;

        default:
          runProgram();
          break;
      }
    });
}

function dropSelectStudents() {
  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'Choose students to drop',
        choices: fullStudentArray,
        name: 'studentsToDrop',
      },
    ]).then(async (res) => {
      if (res.studentsToDrop.length > 0) {
        res.studentsToDrop.forEach(async (studentToDrop) => {
          try {
            await Student.findOneAndRemove({ name: studentToDrop });
          } catch (err) {
            console.log('there was a problem', err);
          }
        });

        fullStudentArray = await Student.find();
        studentsArray = [...fullStudentArray];
      } else {
        console.log('\n!!! Noone was deleted\n'.red);
      }
      runProgram();
    });
}

// function that brings user to add student menu screen
function addStudentMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Add Student(s)', 'Quit'],
        name: 'addScreenOption',
      },
    ]).then((inqurerResponse) => {
      const choice = inqurerResponse.addScreenOption;

      switch (choice) {
        case 'Add Student(s)':
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
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter students name seperated by ", "\n',
      name: 'newStudent',
    },
  ]).then(async (res) => {
    const newStudents = res.newStudent.split(', ').filter((name) => name.length > 0);

    if (newStudents.length > 0) {
      newStudents.forEach(async (student) => {
        const newStudent = await Student.create({ name: student });
        newStudent.save();

        fullStudentArray = await Student.find();
        studentsArray = [...fullStudentArray];
      });
      console.log(
        '\n!!! Students were succesfully added to the database\n'.green,
      );
    } else {
      console.log('\n!!! No students were added to the database\n'.red);
    }

    addStudentMenu();
  });
}

// pick random student menu
function chooseStudentMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Pick Student', 'Quit'],
        name: 'userChoice',
      },
    ]).then((res) => {
      switch (res.userChoice) {
        case 'Pick Student':
          chooseStudent();
          break;

        default:
          runProgram();
          break;
      }
    });
}

function chooseStudent() {
  if (studentsArray.length === 0) {
    console.log('re-populating array...'.cyan);
    studentsArray = [...fullStudentArray];
  }
  const randomStudentIndex = Math.floor(Math.random() * studentsArray.length);
  const randomStudent = studentsArray[randomStudentIndex];
  const cowString = `${cowsay.say({
    text: `\n${randomStudent.name}\n`,
    e: 'oO',
    T: 'U ',
  }).rainbow}\n`;
  // Remove the rainbow coloring from the student's name
  const pattern = `${randomStudent.name.split('').map((ch) => `%1B%5B..m${ch}%1B%5B39m`).join('')}`;
  // and then make the student's name bold and white and log it all
  console.log(decodeURI(encodeURI(cowString).replace(new RegExp(pattern), `%1B%5B1m%1B%5B37m${randomStudent.name}%1B%5B39m%1B%5B22m`)));
  studentsArray.splice(randomStudentIndex, 1);

  if (showStudentTable) {
    // show the studentsArray and the already pickedStudents in green and red respectively
    const pickedStudents = fullStudentArray.filter((student) => !studentsArray.includes(student));
    const maxLength = Math.max(...studentsArray.map((student) => student.name.length));
    for (let idx = 0; idx < Math.max(pickedStudents.length, studentsArray.length); idx += 1) {
      if (idx < studentsArray.length && idx < pickedStudents.length) {
        console.log(`${studentsArray[idx].name.padEnd(maxLength, ' ').green} | ${pickedStudents[idx].name.red}`);
      } else if (idx < studentsArray.length) {
        console.log(`${studentsArray[idx].name.padEnd(maxLength, ' ').green} | `);
      } else {
        console.log(`${''.padEnd(maxLength, ' ').green}${(maxLength > 0) ? ' | ' : ''}${pickedStudents[idx].name.red}`);
      }
    }
  }
  chooseStudentMenu();
}
