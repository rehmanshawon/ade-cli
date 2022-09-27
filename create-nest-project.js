const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

async function createNestProject(projectName) {
  var projectName = projectName + "-backend";
  process.stdout.write("Creating a new nest backend in the chosen folder");
  var myInt = setInterval(function () {
    process.stdout.write(" .");
  }, 2000);

  const { error, stdout, stderr } = await exec(
    `nest new ${projectName} -p npm`,
    {
      shell: "powershell.exe",
      windowsHide: false,
    }
  );
  if (!error) {
    clearInterval(myInt);
    process.chdir(projectName);
    console.log(" Done", stdout);
    return process.cwd();
  } else {
    clearInterval(myInt);
    console.log(stderr);
    return false;
  }
}

module.exports = createNestProject;
