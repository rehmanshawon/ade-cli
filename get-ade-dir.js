const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function getADEDirectory(){
    try {
       const { stdout } = await exec("npm root -g", {
        shell: "powershell.exe",
      });
      var path = stdout.toString().replace(/(\r\n|\n|\r)/gm, "");
      let adePath=join(path,'ade-cli');      
      console.log(adePath);      
      return adePath;      
    } catch (error) {
      console.log(error);
      return false;
    }
}

module.exports = getADEDirectory;