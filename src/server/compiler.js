const path = require('path');
const iconv = require('iconv-lite');
const {spawn} = require('child_process');
const bat = spawn('cmd.exe', ['/c', 'test.bat'], {
    cwd: 'C:\\Users\\64104\\Documents\\node-deploy\\config\\scripts\\win'
});

console.log(path.resolve(''));
console.log(process.platform);
bat.stdout.on('data', (data) => {
    let buffer = new Buffer(data);
    console.log(iconv.decode(buffer, 'gbk'));
    console.log('-----------');
});

bat.stderr.on('data', (data) => {
    console.log(data.toString());
    console.log('-----------');
});

bat.on('exit', (code) => {
    console.log(`子进程退出码：${code}`);
});

// let run = async (file, callback) => {
//     child_process.execFile(file, null, {
//         cwd: config.PATH.SCRIPT_ROOT
//     }, function (err, stdout, stderr) {
//         callback && callback(err, stdout, stderr);
//     });
// };

// run('test.bat', (err, stdout, stderr) => {
//     if (err) {
//         console.log(err);
//         return false;
//     }
//     console.log(typeof stdout);
//     console.log(stdout);
//     console.log('-------------');
//     console.log(stderr);
// });