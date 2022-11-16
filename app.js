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
const renamePackage=require('./rename-package');
const ora = require("ora");
const openVSCodeInCurDir = require("./open-vscode");
const getADEDirectory = require("./get-ade-dir");
const copyFolderRecursiveSync = require("./copy-entire-directory");
const copyFolderSync = require("./copy-entire-directory");

let projectPath = "";
let adePath=process.cwd();
//let adePath= await getADEDirectory();
let toCopyPath=join(adePath,'tocopy');
console.log(toCopyPath);
const showError=(error)=>{
  console.log(error);
}

async function main() {  
  let execAsync = promisify(exec);
  let { stdout: globalPath } = await execAsync("npm root -g");
  //console.log(globalPath);
  var tmp = globalPath.toString().replace(/(\r\n|\n|\r)/gm, "");
  adePath=join(tmp,'ade-cli');
  toCopyPath=join(adePath,'tocopy');
  console.log(toCopyPath);
  let filePathCopy2=join(process.cwd(), 'tocopy', 'src/database');
  let filePathCopy1=join(adePath,'.sequelizerc');
  //console.log(filePathCopy1);    
  const projectType = await getProjectType();
  if (projectType.framework === "backend development") {
    {
      const projectName = await createProjectFolder();
      projectPath=process.cwd();
      if (projectName) {
        if ((await installNest()) === true) {
          renamePackage(toCopyPath+'/package.json',projectName);
          //copyEntireDirectory(toCopyPath,projectPath,showError);
          //fs.copyFileSync(filePathCopy1, projectPath+'/.sequelizerc');
         // projectPath = await createNestProject(projectName);
         // if (projectPath !== "") {
            const status = await installSequelize();
            if (status) {

              if (await installDatabase()) {
                const database = await getConnectionParams(projectName);
                const envString=`DB_HOST=${database.host}\nDB_PORT=${database.port}\nDB_USER=${database.username}\nDB_PASS=${database.password}\nDB_DIALECT=${database.dialect}\nDB_NAME_DEVELOPMENT=${database.name}\nDB_NAME_TEST=${database.name}\nDB_NAME_PRODUCTION=${database.name}\nJWTKEY=random_secret_key\nTOKEN_EXPIRATION=48h\nBEARER=Bearer\nAPP_PORT=3000`;
                fs.writeFileSync(toCopyPath+'/.env',envString,(err)=>{
                  console.log("write file error");
                });
                //const dest=projectPath+'/src/database';
                //copyEntireDirectory(toCopyPath,projectPath,showError);
                //copyFolderRecursiveSync(toCopyPath,projectPath);
                copyFolderSync(toCopyPath,projectPath);
                fs.copyFileSync(filePathCopy1, projectPath+'/.sequelizerc');
                if(await installCriticalPackages())
                  await createDatabase();
                  await openVSCodeInCurDir();

                }
            }
          }
        //}
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

//main();
module.exports = main;
