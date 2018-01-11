import path from 'path';

function resolve(dir) {
    return path.resolve(__dirname, '..', dir);
}

let _ = {
    SOCKET_PORT: 3322,
    SERVER_PORT: 3333,
    PATH: {
        CONFIG_ROOT: resolve('config'),
        PROJECT_ROOT: resolve(''),
        PROJECT_DIST: resolve('dist'),
        CLIENT_ROOT: resolve('src/client'),
        SERVER_ROOT: resolve('src/server'),
        NODE_MODULE: resolve('node_modules')
    }
};

export default _;