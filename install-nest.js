const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);
const ora = require("ora");


async function nestInstalled() {
  //process.stdout.write("Checking if nest.js installed");  
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
  let throbber = ora('Checking if nest.js installed').start();
  throbber.color='blue';
  throbber.spinner='arrow3';
  const status = await nestInstalled();
  throbber.stop();
    if (!status) {    
    throbber = ora('Installing nest.js').start();
    const { error, stdout } = await exec("npm install -g @nestjs/cli", {
      shell: "powershell.exe",
      detached: true,
    });
    if (!error) {
      throbber.stopAndPersist({       
        text: 'Installation done.',
      });
      console.log(stdout);
      return true;
    } else {
      return false;
    }
  } else {
    return status;
  }
}

module.exports = installNest;
