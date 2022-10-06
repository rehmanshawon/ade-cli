const inquirer = require("inquirer");
const fs = require("fs");
const { join } = require('path');
const { exec } = require("child_process");
const { promisify } = require("util");
const installNest = require("./install-nest");
const installDatabase = require("./install-db");
const installSequelize = require("./install-sequelize");
const createProjectFolder = require("./get-folder");
const createNestProject = require("./create-nest-project");
const getConnectionParams = require("./get-connection-params");
const copyEntireDirectory = require('./copy-directory');
const createDatabase=require('./create-db');
const installCriticalPackages=require('./install-package');

let projectPath = "";

const showError=(error)=>{
  console.log(error);
}

async function main() {  
  let execAsync = promisify(exec);
  let { stdout: globalPath } = await execAsync("npm root -g");
  //console.log(globalPath);
  var tmp = globalPath.toString().replace(/(\r\n|\n|\r)/gm, "");  
  let filePathCopy2=join(process.cwd(), 'src', 'database');
  let filePathCopy1=join(process.cwd(),'.sequelizerc');
  //console.log(filePathCopy1);    
  const projectType = await getProjectType();
  if (projectType.framework === "backend development") {
    {
      const projectName = await createProjectFolder();
      if (projectName) {
        if ((await installNest()) === true) {
          projectPath = await createNestProject(projectName);
          if (projectPath !== "") {
            const status = await installSequelize();
            if (status) {
              if (await installDatabase()) {
                const database = await getConnectionParams(projectName);
                const envString=`DB_HOST=${database.host}\nDB_PORT=${database.port}\nDB_USER=${database.username}\nDB_PASS=${database.password}\nDB_DIALECT=${database.dialect}\nDB_NAME_DEVELOPMENT=${database.name}\nDB_NAME_TEST=${database.name}\nDB_NAME_PRODUCTION=${database.name}\nJWTKEY=random_secret_key\nTOKEN_EXPIRATION=48h\nBEARER=Bearer\nAPP_PORT=3000`;
                fs.writeFileSync('./.env',envString,(err)=>{
                  console.log("write file error");
                });
                //const dest=projectPath+'/src/database';
                copyEntireDirectory(filePathCopy2,projectPath+'/src/database',showError);
                fs.copyFileSync(filePathCopy1, projectPath+'/.sequelizerc');
                if(await installCriticalPackages())
                  await createDatabase();        
              }
            }
          }
        }
      }
    }
  }
}

async function getProjectType() {
  return await inquirer.prompt({
    type: "list",
    name: "framework",
    message: "What is your project type?",
    choices: ["backend development", "frontend development"],
  });
}

main();
//module.exports = main;
