const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

async function nestInstalled() {
  process.stdout.write("Checking if nest.js installed");
  try {
    const { stdout } = await exec("nest info", {
      shell: "powershell.exe",
    });
    console.log(stdout);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function installNest() {
  const status = await nestInstalled();
  if (!status) {
    process.stdout.write("Installing nest.js");
    var myInt = setInterval(function () {
      process.stdout.write(" .");
    }, 2000);
    const { error, stdout, stderr } = await exec("npm install -g @nestjs/cli", {
      shell: "powershell.exe",
      detached: true,
    });
    if (!error) {
      clearInterval(myInt);
      console.log(" Done", stdout, stderr);
      return true;
    } else {
      return false;
    }
  } else {
    return status;
  }
}

module.exports = installNest;
