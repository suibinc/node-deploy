import config from '../build/config'

let child_process = require('child_process');

let run = async (file, callback) => {
    child_process.execFile(file, null, {
        cwd: config.PATH.SCRIPT_ROOT
    }, function (err, stdout, stderr) {
        callback && callback(err, stdout, stderr);
    });
};

run('test.bat', (err, stdout, stderr) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(typeof stdout);
    console.log(stdout);
    console.log('-------------');
    console.log(stderr);
});