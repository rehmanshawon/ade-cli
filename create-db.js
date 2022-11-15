const util = require("util");
const exec = util.promisify(require("child_process").exec);
const ora = require("ora");

async function createDatabase() {
  let throbber = ora('Creating database from your supplied paramaters').start();
  throbber.color='blue';
  throbber.spinner='arrow3';
   // process.stdout.write("Creating database from your supplied paramaters");
    try {
      const { stdout } = await exec("npx sequelize-cli db:create", {
        shell: "powershell.exe",
      });
      throbber.stop();
      console.log("Database created! You can now run migrations. Create models in models folder before generating migrations.", stdout);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  module.exports=createDatabase;