import handler from './framework/handler';
import * as SOCKET_EVENTS from '../library/utils/events';

let server = null;
let io = null;

let connect = (app, port) => {
    server = require('http').createServer(app.callback());
    io = require('socket.io')(server);
    io.set('heartbeat interval', 60000);
    io.set('heartbeat timeout', 5000);
    io.on('connection', register);
    server.listen(port);
};

let register = socket => {
    // 获取已导入的工程列表
    socket.on(SOCKET_EVENTS.GET_PROJECT_LIST, (data, cb) => {
        handler[SOCKET_EVENTS.GET_PROJECT_LIST]().then(result => {
            socket.emit(SOCKET_EVENTS.GET_PROJECT_LIST, result);
            socket.emit(SOCKET_EVENTS.SHOW_MESSAGE, {
                message: 'login succ'
            });
        });
    });

    // 导入工程列表
    socket.on(SOCKET_EVENTS.ADD_PROJECT_LIST, (data, cb) => {
        if (data && data.name && data.file) {
            handler[SOCKET_EVENTS.ADD_PROJECT_LIST](data).then(result => {
                socket.emit(SOCKET_EVENTS.GET_PROJECT_LIST, result);
                socket.emit(SOCKET_EVENTS.SHOW_MESSAGE, {
                    type: 'success',
                    message: '导入应用成功'
                });
            });
        }
    });

    // 获取用户自己配置的工程列表
    socket.on(SOCKET_EVENTS.GET_USER_CONFIG, (data, cb) => {
        handler[SOCKET_EVENTS.GET_USER_CONFIG]().then(result => {
            socket.emit(SOCKET_EVENTS.GET_USER_CONFIG, result);
        });
    });

    // 获取脚本列表
    socket.on(SOCKET_EVENTS.GET_USER_SCRIPT, (data, cb) => {
        handler[SOCKET_EVENTS.GET_USER_SCRIPT]().then(result => {
            socket.emit(SOCKET_EVENTS.GET_USER_SCRIPT, result);
        });
    });

    // 开始构建，返回构建队列
    socket.on(SOCKET_EVENTS.GET_TASK_QUEUE, (data, cb) => {
        handler[SOCKET_EVENTS.GET_TASK_QUEUE]().then(result => {
            socket.emit('task-queue', result);
        });
    });

    // 查看构建历史
    socket.on(SOCKET_EVENTS.GET_HISTORY_LIST, (data, cb) => {
        console.log('history');
        console.log(data);
    });

    // 查看某个构建日志
    socket.on(SOCKET_EVENTS.GET_BUILD_INFO, (data, cb) => {
        console.log('history');
        console.log(data);
    });

    socket.on('disconnect', () => {
        console.log('some one disconnect');
    });
};

export {
    connect,
    register
};