const { exec } = require("child_process");

const scriptDirName = require('path').dirname(require.main.filename); 
const execCmd = `bash ${scriptDirName}/kill-containers.sh`;

console.log(execCmd);

exec(execCmd, (error, stdout, stderr) => {
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

