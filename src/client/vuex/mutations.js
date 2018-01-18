export const SET_PROJECT_LIST = 'SET_PROJECT_LIST';
export const SET_USER_SCRIPT = 'SET_USER_SCRIPT';
export const SET_USER_CONFIG = 'SET_USER_CONFIG';
export const SET_TASK_QUEUE = 'SET_TASK_QUEUE';
export const SET_BUILD_INFO = 'SET_BUILD_INFO';
export const SET_HISTORIES = 'SET_HISTORIES';

export const CORE = {
    [SET_PROJECT_LIST](state, list) {
        state.projectList = list;
    },
    [SET_USER_SCRIPT](state, data) {
        if (data) {
            data.list = data.list || [];
            state.userScript = data;
        }
    },
    [SET_USER_CONFIG](state, data) {
        if (data) {
            data.list = data.list || [];
            state.userConfig = data;
        }
    },
    [SET_TASK_QUEUE](state, list) {
        state.taskQueue = list;
    },
    [SET_HISTORIES](state, list) {
        state.histories = list;
    },
    [SET_BUILD_INFO](state, info) {
        state.buildInfo = info;
    }
};