import file from '../../library/utils/file';

const path = require('path');
const iconv = require('iconv-lite');
const {exec} = require('child_process');


let compiler = ($script, $params = {}, cb, end) => {
    let queue = [];
    let run = () => {
        let command = queue.pop();
        if (command === undefined) {
            return end && end(0);
        }
        console.log(command);
        exec(command, {
            cwd: $params.WORKSPACE || ''
        }, (err, stdout, stderr) => {
            if (err) return end && end(1, stderr);
            // let buffer = new Buffer(stdout);
            // cb && cb(iconv.decode(buffer, 'utf-8'));
            cb && cb(stdout);
            run();
        });
    };
    try {
        let str = file.readFileSync(`${path.resolve('')}/${$script.path}/${$script.file}`);
        queue = str.split('\n');
        queue = queue.reverse();
        run();
    } catch (e) {
        console.log(e);
    }

    // const bat = execFile(`${path.resolve('')}/${$script.path}/${$script.file}`, [], {
    //     cwd: $params.WORKSPACE || ''
    // });
    //
    // bat.stdout.on('data', (data) => {
    //     console.log('data');
    //     let buffer = new Buffer(data);
    //     cb && cb(iconv.decode(buffer, 'gbk'));
    // });
    //
    // bat.stderr.on('data', (data) => {
    //     let buffer = new Buffer(data);
    //     cb && cb(iconv.decode(buffer, 'gbk'));
    // });
    //
    // bat.on('exit', (code) => {
    //     console.log('exit');
    //     end && end(code);
    // });
};

export {
    compiler
};