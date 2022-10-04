const fs = require("fs");
const path = require("path");

// our main copier function which takes src, dest and an error handler.
const copyEntireDirectory = (src, dest, errorCallback) => {
    // lets first create a copy function that copies content in a recursive way
    // copySrc - content to copy
    // copyDest - destination to copy to
    // callback - function to handle any error
    const copy = (copySrc, copyDest, callback) => {
        // first read sourc directory
      fs.readdir(copySrc, (err, list) => {       
        if (err) {
          callback(err);
          return;
        }
        // list has all the items found in a list
        // now check every item
        list.forEach((item) => {
          const ss = path.resolve(copySrc, item); // get the full path of the item
          fs.stat(ss, (err, stat) => {            
            if (err) {
              callback(err);
            } else {
              const curSrc = path.resolve(copySrc, item); // full path of current item source
              const curDest = path.resolve(copyDest, item); // full path of current item destination
  
              if (stat.isFile()) {     
                // if the item is file then read its content and write it to destination           
                fs.createReadStream(curSrc).pipe(fs.createWriteStream(curDest));
                // if the item is a directory, then make it at the dest path in a recursive way so that
                // a directory under a directory is also made
              } else if (stat.isDirectory()) {                
                fs.mkdirSync(curDest, { recursive: true });
                // then call this copy function recursively
                // so that we can copy the content of the directory inside the src directory
                // by the way, a recursive funtion is a function that calls itself.
                copy(curSrc, curDest,callback);
              }
            }
          });
        });
      });
    };
  
    // our copy function is above done
    // lets get back to the main function
    // first check if the destination directory is valid
    // if not, then make it and make it recursively
    // because the supplied destination path can contain a dest/further-dest/furthest-dest format
    fs.access(dest, (err) => {
      if (err) {        
        fs.mkdirSync(dest, { recursive: true });
      }
      // now call the copy function with the parameters supplied
      // in main function
      copy(src, dest,errorCallback);
    });
  };

  // our error handler. It just shows the error, does nothing else
  const showError=(error)=>{
    console.log(error);
  }

  // call the main copier function
  // with a src and destination folder
  copyEntireDirectory('./src','./dest/deeper-dest/deepest-dest',showError);
  // check that the destination will be created if it doesn't exist.

  // Thank you.