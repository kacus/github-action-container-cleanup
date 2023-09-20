const { exec } = require("child_process");

const scriptDirName = require('path').dirname(require.main.filename); 

module.exports = {
  execShellScript: (shellScript) => {
    const fullShellScript = `${scriptDirName}/${shellScript}`;
    const shellCmd = `bash -x ${fullShellScript}`;
    console.log(shellCmd);
    exec(shellCmd, (error, stdout, stderr) => {
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
  }
};
