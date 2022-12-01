const { join } = require("path");
var process = require("process");
const util = require("util");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);

let psScript = `Function Select-FolderDialog
{
    param([string]$Description="Select Folder",[string]$RootFolder="Desktop")

 [System.Reflection.Assembly]::LoadWithPartialName("System.windows.forms") |
     Out-Null     

   $objForm = New-Object System.Windows.Forms.FolderBrowserDialog
        $objForm.Rootfolder = $RootFolder
        $objForm.Description = $Description
        $Show = $objForm.ShowDialog()
        If ($Show -eq "OK")
        {
            Return $objForm.SelectedPath
        }
        Else
        {
            Write-Error "Operation cancelled by user."
        }
    }

$folder = Select-FolderDialog # the variable contains user folder selection
write-host $folder
`;
async function createProjectFolder() {
  try {
    //const data = await spawn("powershell.exe", ["./create-folder.ps1"]);
    const { error, stdout } = await exec(psScript, {
      shell: "powershell.exe",
    });
    //const data = await spawn("powershell.exe", psScript, { shell: true });
    var path = stdout.toString().replace(/(\r\n|\n|\r)/gm, "");
    console.log(path);
    if (path !== "") {      
      const folderName =join(path,'backend');
      const folderNameFront =join(path,'frontend');
      try {
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName);
        }
        if (!fs.existsSync(folderNameFront)) {
          fs.mkdirSync(folderNameFront);
        }
      } catch (err) {
        console.error(err);
      }
      process.chdir(folderName);
      const pathArray = folderName.split("\\");
      return pathArray[pathArray.length - 1];
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = createProjectFolder;
