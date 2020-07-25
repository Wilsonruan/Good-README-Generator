var fs = require("fs");
const util = require('util');
const inquirer = require("inquirer");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt (
    [
      {
        type: 'input',
        message: 'Please enter project title name:',
        name: 'title'
      },
      {
        type: 'input',
        message: 'Please provide a summary Description of the project:',
        name: 'description'
      },
      {
        type: 'input',
        message: 'Please provide a description of Installation instructions:',
        name: 'installation',
      },
      {
        type: 'input',
        message: 'Please provide a description of Usage for users:',
        name: 'usage',
      },
      {
        type: 'input',
        message: 'Please select a a description of Credit:',
        name: 'credit',
      },
      {
        type: 'checkbox',
        message: 'Please select License:',
        choices: [
          "MIT",
          "ISC",
          "GNU GPLv3",
          'Apache'
         ], 
        name: 'credit',
      },
      {
        type: 'input',
        message: 'Please provide a badges:',
        name: 'badges',
      },
      {
        type: 'input',
        message: 'Please provide a description of Contributing for project:',
        name: 'contributing',
      },
      {
        type: 'input',
        message: 'Please provide a description of Test:',
        name: 'test',
      }
    ]
  )
}

fs.appendFile("README.md", process.argv[2] + '\n', function(err) {

if (err) throw err
    
    console.log('Please enter:')
  
  });