const inquirer = require("inquirer");
const installNest = require("./install-nest");
const installDatabase = require("./install-db");
const installSequelize = require("./install-sequelize");
const createProjectFolder = require("./get-folder");
const createNestProject = require("./create-nest-project");

async function main() {
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
              await installDatabase();
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
