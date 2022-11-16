const util = require("util");
const exec = util.promisify(require("child_process").exec);
const ora = require("ora");

async function installCriticalPackages() {
  let throbber = ora('Installing necessary packages').start();
  throbber.color='blue';
  throbber.spinner='arrow3';
   // process.stdout.write("Installing necessary packages . . .");
    try {
       const { stdout } = await exec("npm install --save --save-exact react", {
        shell: "powershell.exe",
      });
      // const { stdout } = await exec("npm install --save dotenv @nestjs/passport passport passport-local @nestjs/jwt passport-jwt", {
      //   shell: "powershell.exe",
      // });
      console.log("Done!", stdout);
      throbber.stop();
      return true;      
    } catch (error) {
      console.log(error);
      return false;
    }
    // throbber.stop();
    // throbber = ora('Installing necessary types').start();
    // throbber.color='blue';
    // throbber.spinner='arrow3';

    // //process.stdout.write("Installing necessary types . . .");
    // try {
    //     const { stdout } = await exec("npm install --save-dev @types/passport-local @types/passport-jwt", {
    //       shell: "powershell.exe",
    //     });
    //     console.log("Done!", stdout); 
    //     throbber.stop();
    //     return true     
    //   } catch (error) {
    //     console.log(error);
    //     return false;
    //   }
  }

  //installCriticalPackages();
  module.exports=installCriticalPackages;