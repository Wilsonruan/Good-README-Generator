var fs = require("fs");

fs.appendFile("README.md", process.argv[2] + '\n', function(err) {

if (err) throw err
    
    console.log('Please enter:')
  
  });