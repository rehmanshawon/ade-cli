const util = require("util");
const exec = util.promisify(require("child_process").exec);
const ora = require("ora");

async function installCriticalPackages() {
  let throbber = ora('Installing necessary packages').start();
  throbber.color='blue';
  throbber.spinner='arrow3';   
    try {
       const { stdout } = await exec("npm install --save --save-exact", {
        shell: "powershell.exe",
      });      
      console.log("Done!", stdout);
      throbber.stop();
      return true;      
    } catch (error) {
      console.log(error);
      return false;
    }    
  }

  //installCriticalPackages();
  module.exports=installCriticalPackages;