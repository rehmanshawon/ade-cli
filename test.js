//const util = require("util");
//const exec = util.promisify(require("node:child_process").exec);
//const { spawn } = require("child_process");
const spawn = require("await-spawn");
var events = require("events");
//var myEmitter = new events.EventEmitter();

// const firstSpawn = spawn("powershell.exe", ["./create-folder.ps1"]);
// firstSpawn.stdout.on("data", function (data) {
//   console.log("Powershell Data: " + data);
// });
// firstSpawn.on("exit", (exitCode) => {
//   if (parseInt(exitCode) !== 0) {
//     console.log(exitCode);
//   }
//   myEmitter.emit("firstSpawn-finished");
// });

// // myEmitter.on('firstSpawn-finished')
// myEmitter.on("firstSpawn-finished", () => {
//   console.log("done");
//   //const secondSpawn = spawn("echo", ["BYE!"]);
// });

// async function lsExample() {
//   const { stdout, stderr } = await exec("ls");
//   console.log("stdout:", stdout);
//   console.error("stderr:", stderr);
// }

// async function lsExample() {
//   const { stdout, stderr } = await exec("ls");
//   console.log("stdout:", stdout);
//   console.error("stderr:", stderr);
// }

// lsExample();

const main = async () => {
  try {
    const bl = await spawn("powershell.exe", ["./create-folder.ps1"]);
    console.log(bl.toString());
  } catch (e) {
    console.log(e.stderr.toString());
  }
};

main();
