const inquirer = require('inquirer');
const { exec } = require('child_process');
var process = require('process');
var spawn = require("child_process").spawn,child;

//const { exec } = require('child_process');
//const createProjectFolder=require('./get-folder');

let project='';

let nestStart=false;
let nest=false;
let sequelize=false;
let database='';
let projectName='';



async function main() {
  const projectType=await getProjectType();
  console.log(projectType)
  if(projectType.framework==='backend development')
  {

   projectName= await createProjectFolder();
    if(projectName!=='')
    {
      if(await installNest()){
        if(await installSequelize()){
          await installDatabase();
        } 
      }
    } 
  }
}

async function createProjectFolder(){
  child = spawn("powershell.exe",["./create-folder.ps1"]);
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
      
  });
  child.stderr.on("data",function(data){
      console.log("Powershell Errors: " + data);
  });
  child.on("exit",function(){
     console.log("Powershell Script finished");
  });
  child.stdin.end(); //end input
}

async function getProjectType()
{
  return await inquirer.prompt({
    type: 'list',
    name: 'framework',
    message: 'What is your project type?',
    choices: ['backend development', 'frontend development'],
  });
  //return projectType;
}
async function installNest()
{
   exec('nest info', {'shell':'powershell.exe'}, (error, stdout, stderr)=> {          
    if(error!==null)
    {
      process.stdout.write("Installing nest.js")
      var myInt = setInterval(function () {
        process.stdout.write(" .");
    }, 2000);
      exec('npm install -g @nestjs/cli', {'shell':'powershell.exe'}, (error, stdout, stderr)=> {
      if(error===null)
        {
          nest=true;
          clearInterval(myInt);
          console.log(' Done',stdout, stderr);          
          return true;
          }                              
        });           
          }
          else{
            console.log('nest.js is already installed!');            
            nest=true;
            return true;
            
          }
        })

}

           
  async function installDatabase(){
    inquirer
        .prompt([
          {
            type: 'list',
            name: 'database',
            message: 'What is your database type?',
            choices: ['Postgres', 'MySQL','SQLite','MSSQL','Oracle'],
          },
        ])
        .then(answers=>{
          database=answers.database;
          if(database==='MySQL')
          {
              process.stdout.write("Installing MySQL");
                var myInt = setInterval(function () {
                  process.stdout.write(" .");
              }, 2000);
              exec('npm install --save mysql2',{'shell':'powershell.exe'},(error,stdout,stderr)=>{
                  if(error===null)
                  {
                    console.log(' Done',stdout, stderr);
                    clearInterval(myInt);
                  }
              })
          }
          else if(database==='Postgres')
          {
              process.stdout.write("Installing Postgress");
                var myInt = setInterval(function () {
                  process.stdout.write(" .");
              }, 2000);
              exec('npm install --save pg pg-hstore',{'shell':'powershell.exe'},(error,stdout,stderr)=>{
                  if(error===null)
                  {
                    console.log(' Done',stdout, stderr);
                    clearInterval(myInt);
                  }
              })
          }
          else if(database==='SQLite')
          {
              process.stdout.write("Installing SQLite");
                var myInt = setInterval(function () {
                  process.stdout.write(" .");
              }, 2000);
              exec('npm install --save sqlite3',{'shell':'powershell.exe'},(error,stdout,stderr)=>{
                  if(error===null)
                  {
                    console.log(' Done',stdout, stderr);
                    clearInterval(myInt);
                  }
              })
          }
          else if(database==='MSSQL')
          {
              process.stdout.write("Installing Microsoft SQL Server");
                var myInt = setInterval(function () {
                  process.stdout.write(" .");
              }, 2000);
              exec('npm install --save tedious',{'shell':'powershell.exe'},(error,stdout,stderr)=>{
                  if(error===null)
                  {
                    console.log(' Done',stdout, stderr);
                    clearInterval(myInt);
                  }
              })
          }
          else if(database==='Oracle')
          {
              process.stdout.write("Installing Oracle");
                var myInt = setInterval(function () {
                  process.stdout.write(" .");
              }, 2000);
              exec('npm install --save oracledb',{'shell':'powershell.exe'},(error,stdout,stderr)=>{
                  if(error===null)
                  {
                    console.log(' Done',stdout, stderr);
                    clearInterval(myInt);
                  }
              })
          }
        });        
  }

  async function installSequelize()
  {
    process.stdout.write("Checking if Sequelize is installed")
    exec('sequelize --version', {'shell':'powershell.exe'}, (error, stdout, stderr)=> {
      if(error!==null)
      {
            process.stdout.write(" Installing Sequelize");
            var myInt = setInterval(function () {
              process.stdout.write(" .");
          }, 2000);
            exec('npm install sequelize',{'shell':'powershell.exe'},(error,stdout,stderr)=>{
              if(error===null)
              {
                console.log(' Done',stdout, stderr);
                clearInterval(myInt);
              }
            })
            return true;
            
      }
      else{
        console.log('Sequelize already installed!');
        return true;
        
      }
      });
  }

  main();