const inquirer = require("inquirer");
const fs = require("fs");
const { exec } = require("child_process");
const { promisify } = require("util");
const installNest = require("./install-nest");
const installDatabase = require("./install-db");
const installSequelize = require("./install-sequelize");
const createProjectFolder = require("./get-folder");
const createNestProject = require("./create-nest-project");
const getConnectionParams = require("./get-connection-params");

let projectPath = "";

async function main() {
  let execAsync = promisify(exec);
  let { stdout: globalPath } = await execAsync("npm root -g");
  console.log(globalPath);
  var tmp = globalPath.toString().replace(/(\r\n|\n|\r)/gm, "");
  let filePathCopy = tmp + "/ade-cli/commands/add.js";
  // console.log(await getConnectionParams('hello'));
  // return
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
                console.log(await getConnectionParams(projectName));
                fs.copyFile(filePathCopy, projectPath + "/add.js", (err) => {
                  if (err) throw err;

                  console.log("File Copy Successfully.");
                });
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

//main();
module.exports = main;
