const inquirer = require("inquirer");



async function getConnectionParams(projectName) {
  let database={
    username:'root',
    password:'password',
    name:`${projectName}`,
    host:'localhost',
    port:3306,
    dialect:'mysql'
  }
  let input=await inquirer.prompt({      
      name: "username",
      message: "Database Username (default is root)?",
      choices: ["backend development", "frontend development"],
    });
    database.username=input.username?input.username:database.username;
    input=await inquirer.prompt({      
        name: "password",
        message: "Database Username (default is password)?",
        choices: ["backend development", "frontend development"],
      });
      database.password=input.password?input.password:database.password;
    input=await inquirer.prompt({      
          name: "name",
          message: `Database Name (default is ${projectName})?`,
          choices: ["backend development", "frontend development"],
        });
        database.name=input.name?input.name:database.name;
    input=await inquirer.prompt({      
            name: "host",
            message: "Database Host (default is localhost)?",
            choices: ["backend development", "frontend development"],
          });
          database.host=input.host?input.host:database.host;
    input=await inquirer.prompt({      
            name: "port",
            message: "Database Port (default is 3306)?",
            choices: ["backend development", "frontend development"],
          });
          database.port=input.port?input.port:database.port;
    input=await inquirer.prompt({      
            name: "dialect",
            message: "Database Dialect (default is mysql)?",
            choices: ["backend development", "frontend development"],
          });
          database.dialect=input.dialect?input.dialect:database.dialect;
    return database;
    
  }

  module.exports=getConnectionParams;