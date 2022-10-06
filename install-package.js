const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

async function installCriticalPackages() {
    process.stdout.write("Installing necessary packages . . .");
    try {
      const { stdout } = await exec("npm install --save dotenv @nestjs/passport passport passport-local @nestjs/jwt passport-jwt", {
        shell: "powershell.exe",
      });
      console.log("Done!", stdout);      
    } catch (error) {
      console.log(error);
      return false;
    }
    process.stdout.write("Installing necessary types . . .");
    try {
        const { stdout } = await exec("npm install --save-dev @types/passport-local @types/passport-jwt", {
          shell: "powershell.exe",
        });
        console.log("Done!", stdout); 
        return true     
      } catch (error) {
        console.log(error);
        return false;
      }
  }

  //installCriticalPackages();
  module.exports=installCriticalPackages;