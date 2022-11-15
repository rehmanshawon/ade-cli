const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function openVSCodeInCurDir(){
    try {
       const { stdout } = await exec("code .", {
        shell: "powershell.exe",
      });
      // const { stdout } = await exec("npm install --save dotenv @nestjs/passport passport passport-local @nestjs/jwt passport-jwt", {
      //   shell: "powershell.exe",
      // });
      console.log("Done!", stdout);      
      return true;      
    } catch (error) {
      console.log(error);
      return false;
    }
}

module.exports=openVSCodeInCurDir;