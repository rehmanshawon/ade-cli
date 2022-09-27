const inquirer = require("inquirer");
const installNest = require("./install-nest");
const installDatabase = require("./install-db");
const installSequelize = require("./install-sequelize");
const createProjectFolder = require("./get-folder");
const createNestProject = require("./create-nest-project");
const getConnectionParams = require("./get-connection-params");

async function main() {
  // console.log(await getConnectionParams('hello'));
  // return
  const projectType = await getProjectType();
  if (projectType.framework === "backend development") {
    {
      const projectName = await createProjectFolder();
      if (projectName) {
        if ((await installNest()) === true) {
          const success = await createNestProject(projectName);
          if (success) {
            const status = await installSequelize();
            if (status) {
              if (await installDatabase()) {
                console.log(await getConnectionParams(projectName));
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
