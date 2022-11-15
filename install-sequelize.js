const util = require("util");
const exec = util.promisify(require("child_process").exec);
const ora = require("ora");

async function sequelizeInstalled() {
  //process.stdout.write("Checking if Sequelize is installed");  
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
  let throbber = ora('Checking if Sequelize is installed').start();
  throbber.color='blue';
  throbber.spinner='arrow3';
  const status = await sequelizeInstalled();
  throbber.stop(); 
  if (!status) {
    throbber = ora('Installing Sequelize').start();
  throbber.color='blue';
  throbber.spinner='arrow3';
   // process.stdout.write(" Installing Sequelize");
    // var myInt = setInterval(function () {
    //   process.stdout.write(" .");
    // }, 2000);
    //console.log(process.cwd());
    const { error, stdout, stderr } = await exec(
      "npm install --save sequelize sequelize-typescript --loglevel verbose",
      {
        shell: "powershell.exe",
      }
    );
    throbber.stop();
    if (!error) {      
      const { err}=await exec("npm install --save-dev sequelize-cli @types/sequelize --loglevel verbose",{shell:"powershell.exe"});
      if(!err)
      console.log(" Done", stdout);
      //clearInterval(myInt);
      return true;
    } else {
      //clearInterval(myInt);
      return false;
    }
  } else {
    return status;
  }
}

module.exports = installSequelize;
