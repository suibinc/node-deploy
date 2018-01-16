const path = require('path');
const iconv = require('iconv-lite');
const {spawn} = require('child_process');

let compiler = ($script, $params = {}, cb, end) => {
    const bat = spawn('cmd.exe', ['/c', `${path.resolve('')}/${$script.path}/${$script.file}`], {
        cwd: $params.WORKSPACE || ''
    });

    bat.stdout.on('data', (data) => {
        let buffer = new Buffer(data);
        cb && cb(iconv.decode(buffer, 'gbk'));
    });

    bat.stderr.on('data', (data) => {
        let buffer = new Buffer(data);
        cb && cb(iconv.decode(buffer, 'gbk'));
    });

    bat.on('exit', (code) => {
        console.log(`子进程退出码：${code}`);
        end && end(code);
    });
};

export default compiler;