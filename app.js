var inquirer = require('inquirer');
var colors = require('colors');
var cowsay = require('cowsay');

var students = [
  'Adnan Niaz',
  'Chin Kuay',
  'Enkhtaivan Sain-Er',
  'Herman Liu',
  'Huan Nguyen',
  'Irene Lee',
  'Jennifer Ni',
  'Jimmy Nguyen',
  'Mario Alvarez',
  'Martin Nguyen',
  'Matthew Romano',
  'Michael Alverez',
  'Mohamed Htout',
  'Patricio Aguilar',
  'Sarah Nass',
  'Wanjing Zhou',
  'Wilson Wong',
  'Ye Bao',
  'Yi Nan'
];

function pickStudent(arr) {
  var arrayLength = arr.length;

  if (arrayLength === 0) {
    arr = [
      'Adnan Niaz',
      'Chin Kuay',
      'Enkhtaivan Sain-Er',
      'Herman Liu',
      'Huan Nguyen',
      'Irene Lee',
      'Jennifer Ni',
      'Jimmy Nguyen',
      'Mario Alvarez',
      'Martin Nguyen',
      'Matthew Romano',
      'Michael Alverez',
      'Mohamed Htout',
      'Patricio Aguilar',
      'Sarah Nass',
      'Wanjing Zhou',
      'Wilson Wong',
      'Ye Bao',
      'Yi Nan'
    ];
    arrayLength = arr.length;
  }

  var randomNum = Math.floor(Math.random() * arrayLength);
  var randomStudent = arr[randomNum];

  arr.splice(randomNum, 1);
  console.log('\033[2J');
  console.log(
    cowsay.say({
      text: '\n' + randomStudent + '\n',
      e: 'oO',
      T: 'U '
    }).rainbow + '\n'
  );
}

function runProgram() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Pick a student', 'Quit'],
        name: 'option'
      }
    ])
    .then(inqurerResponse => {
      if (inqurerResponse.option === 'Quit') {
        process.exit();
      } else {
        pickStudent(students);
        runProgram();
      }
    });
}

runProgram();
