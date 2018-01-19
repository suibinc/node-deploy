import * as SOCKET_EVENTS from '../library/utils/events';
import handler from './framework/handler';

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
        });
    });

    // 导入工程列表
    socket.on(SOCKET_EVENTS.ADD_PROJECT_LIST, (data, cb) => {
        if (data instanceof Array) {
            handler[SOCKET_EVENTS.ADD_PROJECT_LIST](data).then(result => {
                socket.emit(SOCKET_EVENTS.GET_PROJECT_LIST, result);
                socket.emit(SOCKET_EVENTS.SHOW_MESSAGE, {
                    type: 'success',
                    message: '导入应用成功'
                });
            });
        } else {
            socket.emit(SOCKET_EVENTS.SHOW_MESSAGE, {
                type: 'error',
                message: '导入应用失败'
            });
        }
    });

    // 导入工程列表
    socket.on(SOCKET_EVENTS.DEL_PROJECT_LIST, (data, cb) => {
        if (data && data.uuid) {
            handler[SOCKET_EVENTS.DEL_PROJECT_LIST](data).then(result => {
                socket.emit(SOCKET_EVENTS.GET_PROJECT_LIST, result);
                socket.emit(SOCKET_EVENTS.SHOW_MESSAGE, {
                    type: 'success',
                    message: '删除应用成功'
                });
            });
        } else {
            socket.emit(SOCKET_EVENTS.SHOW_MESSAGE, {
                type: 'error',
                message: '删除应用失败，应用不存在'
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

    socket.on(SOCKET_EVENTS.EXEC_SCRIPT, (data, cb) => {
        handler[SOCKET_EVENTS.EXEC_SCRIPT](data).then(result => {
            socket.emit(SOCKET_EVENTS.GET_TASK_QUEUE, result);
            socket.emit(SOCKET_EVENTS.SHOW_MESSAGE, {
                type: 'success',
                message: '已加入构建队列'
            });
        });
    });

    socket.on(SOCKET_EVENTS.SAVE_APP_SCRIPT, (data, cb) => {
        handler[SOCKET_EVENTS.SAVE_APP_SCRIPT](data).then(result => {
            socket.emit(SOCKET_EVENTS.GET_PROJECT_LIST, result);
            socket.emit(SOCKET_EVENTS.SHOW_MESSAGE, {
                type: 'success',
                message: '保存成功'
            });
        });
    });

    // 开始构建，返回构建队列
    socket.on(SOCKET_EVENTS.GET_TASK_QUEUE, (data, cb) => {
        handler[SOCKET_EVENTS.GET_TASK_QUEUE]().then(result => {
            socket.emit(SOCKET_EVENTS.GET_TASK_QUEUE, result);
        });
    });

    // 查看构建历史
    socket.on(SOCKET_EVENTS.GET_HISTORY_LIST, (data, cb) => {
        handler[SOCKET_EVENTS.GET_HISTORY_LIST](data).then(result => {
            socket.emit(SOCKET_EVENTS.GET_HISTORY_LIST, result);
        });
    });

    // 查看某个构建日志
    socket.on(SOCKET_EVENTS.GET_BUILD_INFO, (data, cb) => {
        handler[SOCKET_EVENTS.GET_BUILD_INFO](data).then(result => {
            socket.emit(SOCKET_EVENTS.GET_BUILD_INFO, result);
        });
    });

    socket.on('disconnect', () => {
        console.log('some one disconnect');
    });
};

export {
    connect,
    register
};