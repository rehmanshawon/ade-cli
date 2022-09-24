const inquirer = require("inquirer");
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

async function installDatabase() {
  const getDatabase = await inquirer.prompt([
    {
      type: "list",
      name: "database",
      message: "What is your database type?",
      choices: ["Postgres", "MySQL", "SQLite", "MSSQL", "Oracle"],
    },
  ]);
  console.log(getDatabase);
  if (getDatabase.database === "MySQL") {
    return await installMySQL();
  }
  if (getDatabase.database === "Postgres") {
    return await installPG();
  }
  if (getDatabase.database === "SQLite") {
    return await installSQLite();
  }
  if (getDatabase.database === "MSSQL") {
    return await installMSSQL();
  }
  if (getDatabase.database === "Oracle") {
    return await installOracle();
  }
}

async function installMySQL() {
  process.stdout.write("Installing MySQL");
  var myInt = setInterval(function () {
    process.stdout.write(" .");
  }, 2000);
  const { error, stdout } = await exec("npm install --save mysql2", {
    shell: "powershell.exe",
  });
  if (!error) {
    console.log(" Done", stdout);
    clearInterval(myInt);
    return true;
  } else {
    return error;
  }
}

async function installPG() {
  process.stdout.write("Installing Postgress");
  var myInt = setInterval(function () {
    process.stdout.write(" .");
  }, 2000);
  const { error, stdout } = await exec("npm install --save pg pg-hstore", {
    shell: "powershell.exe",
  });
  if (!error) {
    console.log(" Done", stdout);
    clearInterval(myInt);
    return true;
  } else {
    return error;
  }
}

async function installSQLite() {
  process.stdout.write("Installing SQLite");
  var myInt = setInterval(function () {
    process.stdout.write(" .");
  }, 2000);
  const { error, stdout } = await exec("npm install --save sqlite3", {
    shell: "powershell.exe",
  });
  if (!error) {
    console.log(" Done", stdout);
    clearInterval(myInt);
    return true;
  } else {
    return error;
  }
}

async function installMSSQL() {
  process.stdout.write("Installing Microsoft SQL Server");
  var myInt = setInterval(function () {
    process.stdout.write(" .");
  }, 2000);
  const { error, stdout } = await exec("npm install --save tedious", {
    shell: "powershell.exe",
  });
  if (!error) {
    console.log(" Done", stdout);
    clearInterval(myInt);
    return true;
  } else {
    return error;
  }
}

async function installOracle() {
  process.stdout.write("Installing Oracle");
  var myInt = setInterval(function () {
    process.stdout.write(" .");
  }, 2000);
  const { error, stdout } = await exec("npm install --save oracledb", {
    shell: "powershell.exe",
  });
  if (!error) {
    console.log(" Done", stdout);
    clearInterval(myInt);
    return true;
  } else {
    return error;
  }
}

module.exports = installDatabase;
