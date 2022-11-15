const util = require("util");
const exec = util.promisify(require("child_process").exec);
const ora = require("ora");

async function createNestProject(projectName) {
  var projectName = projectName + "-backend";
  let throbber = ora('Creating a new nest backend in the chosen folder').start();
  throbber.color='blue';
  throbber.spinner='arrow3';
  // process.stdout.write("Creating a new nest backend in the chosen folder");
  // var myInt = setInterval(function () {
  //   process.stdout.write(" .");
  // }, 2000);

  const { error, stdout, stderr } = await exec(
    `nest new ${projectName} -p npm`,
    {
      shell: "powershell.exe",
      windowsHide: false,
    }
  );
  throbber.stop();  
  if (!error) {
    //clearInterval(myInt);
    process.chdir(projectName);
    console.log(" Done", stdout);
    return process.cwd();
  } else {
    //clearInterval(myInt);
    console.log(stderr);
    return false;
  }
}

module.exports = createNestProject;
