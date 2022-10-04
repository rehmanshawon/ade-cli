const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

async function sequelizeInstalled() {
  process.stdout.write("Checking if Sequelize is installed");
  try {
    const { stdout } = await exec("sequelize --version", {
      shell: "powershell.exe",
    });
    console.log("Sequelize already installed!", stdout);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function installSequelize() {
  const status = await sequelizeInstalled();
  if (!status) {
    process.stdout.write(" Installing Sequelize");
    var myInt = setInterval(function () {
      process.stdout.write(" .");
    }, 2000);
    //console.log(process.cwd());
    const { error, stdout, stderr } = await exec(
      "npm install --save sequelize sequelize-typescript dotenv",
      {
        shell: "powershell.exe",
      }
    );
    if (!error) {      
      const { err}=await exec("npm install --save-dev @types/sequelize",{shell:"powershell.exe"});
      if(!err)
      console.log(" Done", stdout);
      clearInterval(myInt);
      return true;
    } else {
      clearInterval(myInt);
      return false;
    }
  } else {
    return status;
  }
}

module.exports = installSequelize;
