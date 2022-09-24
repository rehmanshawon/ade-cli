var process = require("process");

const spawn = require("await-spawn");

async function createProjectFolder() {
  try {
    const data = await spawn("powershell.exe", ["./create-folder.ps1"]);
    var path = data.toString().replace(/(\r\n|\n|\r)/gm, "");
    if (path !== "") {
      process.chdir(path);
      const pathArray = path.split("\\");
      return pathArray[pathArray.length - 1];
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = createProjectFolder;
