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
        type: 'confirm',
        message: 'Would you like to provide a screenshot, please locate screenshot in ./Assets/Images/ScreenShot.jpg:',
        name: 'image',
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
          "Apache"
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
  var badge = ['','','','']
  const badgeSourse = {
    "MIT" : `![License](https://img.shields.io/badge/License-MIT-green.svg)`,
    "ISC" : `![License](https://img.shields.io/badge/License-BSD-green.svg)`,
    "GNU" : `![License](https://img.shields.io/badge/License-GNU_3-blue.svg)`,
    "Apache" : `![License](https://img.shields.io/badge/License-Apache_2-blue.svg)`
  }
  const sourse = {
    "MIT" : ` - [MIT](https://choosealicense.com/licenses/mit/)`,
    "ISC" : ` - [ISC](https://choosealicense.com/licenses/isc/)`,
    "GNU" : ` - [GNU](https://choosealicense.com/licenses/gpl-3.0/)`,
    "Apache" : ` - [Apache](https://choosealicense.com/licenses/apache-2.0/)`
  }

  for (let i = 0; i < response.license.length; i++) {
    badge[i] = badgeSourse[response.license[i]];
    response.license[i] = sourse[response.license[i]];
}

if (response.image) {
  response.image = `![ScreenShot](./Assets/Images/ScreenShot.jpg)`
} else {
  response.image = ''
}

  return `
${badge.join('  ')}
# ${response.title}

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
${response.image}

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