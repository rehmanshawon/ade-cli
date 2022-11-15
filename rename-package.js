const fs = require('fs');


function renamePackage(filepath,  newName){
    
    const packageJson = require(filepath);    
    packageJson['name']=newName;
    fs.writeFileSync(filepath, JSON.stringify(packageJson, null, 2));
    console.log('Package saved');
}

//renamePackage('./tocopy/package.json','shaw');
module.exports = renamePackage;
