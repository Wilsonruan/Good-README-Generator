var fs = require("fs");
const util = require('util');
const inquirer = require("inquirer");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt(
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
        message: 'Please provide a description of Contributing for project:',
        name: 'contributing',
      },
      {
        type: 'input',
        message: 'Please provide a description of Test:',
        name: 'test',
      },
      {
        type: 'checkbox',
        message: 'Please select License:',
        choices: [
          "MIT",
          "ISC",
          "GNU",
          'Apache'
        ],
        name: 'license',
      },
      {
        type: 'input',
        message: 'Please provide a your GitHub username:',
        name: 'github',
      },
      {
        type: 'input',
        message: 'Please provide a your email address:',
        name: 'email',
      },
    ]
  )
}

function generator(response) {
  var badge = ['','','',''];

  for (let i = 0; i < response.license.length; i++) {
      badge[i] = `![License](https://img.shields.io/badge/License-${response.license[i]}-blue.svg)`
      if ( response.license[i] === 'GNU') {
        response.license[i] = ` - [GNU](https://choosealicense.com/licenses/gpl-3.0/)`
      } else {
        response.license[i] = ` - [${response.license[i]}](https://choosealicense.com/licenses/${response.license[i].toLowerCase()}/)`
      }
  }

  return `
${badge.join('  ')}
## ${response.title}

## Description:
    ${response.description}

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage) 
- [Contributing](#contributing)
- [Test](#test)
- [License](#license) 
- [Questions](#questions)

## Installation:
    ${response.installation}

## Usage:
    ${response.usage}

## License:
  ${response.license.join('\n  ')}

## Contributing:
    ${response.contributing}

## Test:
    ${response.test}

## Questions: 
  - Please feel free to contact for additional questions by email below: 
  - [Email] ${response.email}.
  - You may visit my GitHub Page for additional information below: 
  - [GitHub] ${response.github}.
  `
}

async function init () {
  try {
    var response = await promptUser();
    var readME = generator(response);
    await writeFileAsync('README.md', readME)
    console.log('Success');
  } catch (err) {
    console.log(err)
  }
}

init()