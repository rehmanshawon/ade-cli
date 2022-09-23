var process = require('process');
const { exec } = require('child_process');
var fs = require('fs');
var dir = './tmp';


var spawn = require("child_process").spawn,child;
child = spawn("powershell.exe",["./create-folder.ps1"]);
async function createProjectFolder(){
    child.stdout.on("data", function(data){      
        var path=data.toString().replace(/(\r\n|\n|\r)/gm, "");    
        exec('echo.', {
            cwd: path
          }, (error, stdout, stderr) => {
            if (error) {
              console.error(error);
              return;
            }
           
          });   
        process.chdir(path);
        pathArray=path.split("\\");
        return pathArray[pathArray.length-1];
        // if (!fs.existsSync(dir)){
        //     fs.mkdirSync(dir);
        // }
        // console.log(process.cwd());
    });
    child.stderr.on("data",function(data){
        console.log("Powershell Errors: " + data);
    });
    child.on("exit",function(){
       /// console.log("Powershell Script finished");
    });
    child.stdin.end(); //end input
}

module.exports=createProjectFolder;
