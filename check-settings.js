const fs = require("fs");
const getConnectionParams = require("./get-connection-params");


async function test(){
const database = await getConnectionParams("projectName");
                const envString=`DB_HOST=${database.host}\nDB_PORT=${database.port}\nDB_USER=${database.username}\nDB_PASS=${database.password}\nDB_DIALECT=${database.dialect}\nDB_NAME_DEVELOPMENT=${database.name}\nDB_NAME_TEST=${database.name}\nDB_NAME_PRODUCTION=${database.name}\nJWTKEY=random_secret_key\nTOKEN_EXPIRATION=48h\nBEARER=Bearer\nAPP_PORT=3000`;
                fs.writeFileSync('./.env.local',envString,(err)=>{
                  console.log("write file error");
                });
            }

             test();
