const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

async function createDatabase() {
    process.stdout.write("Creating database from your supplied paramaters");
    try {
      const { stdout } = await exec("npx sequelize-cli db:create", {
        shell: "powershell.exe",
      });
      console.log("Database created! You can now run migrations. Create models in models folder before generating migrations.", stdout);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  module.exports=createDatabase;