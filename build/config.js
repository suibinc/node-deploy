import path from 'path';

function resolve(dir) {
    return path.resolve(__dirname, '..', dir);
}

let _ = {
    PORT: 3333,
    PATH: {
        SCRIPT_ROOT: resolve('scripts'),
        PROJECT_ROOT: resolve(''),
        PROJECT_DIST: resolve('dist'),
        CLIENT_ROOT: resolve('client'),
        SERVER_ROOT: resolve('server'),
        NODE_MODULE: resolve('node_modules')
    }
};

export default _;