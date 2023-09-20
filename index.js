const { exec } = require("child_process");

const scriptDirName = require('path').dirname(require.main.filename); 

exec(`sh ${scriptDirName}/list-containers.sh`, (error, stdout, stderr) => {
    if (error) {
        console.log(`${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`${stderr}`);
        return;
    }
    console.log(`${stdout}`);
});

