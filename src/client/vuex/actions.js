import * as mutations from './mutations';

export const UPDATE_PROJECT_LIST = 'UPDATE_PROJECT_LIST';
export const UPDATE_USER_SCRIPT = 'UPDATE_USER_SCRIPT';
export const UPDATE_USER_CONFIG = 'UPDATE_USER_CONFIG';
export const UPDATE_TASK_QUEUE = 'UPDATE_TASK_QUEUE';

export const CORE = {
    [UPDATE_PROJECT_LIST]({commit}, payload) {
        commit(mutations.SET_PROJECT_LIST, payload.list);
    },
    [UPDATE_USER_SCRIPT]({commit}, payload) {
        commit(mutations.SET_USER_SCRIPT, payload.data);
    },
    [UPDATE_USER_CONFIG]({commit}, payload) {
        commit(mutations.SET_USER_CONFIG, payload.data);
    },
    [UPDATE_TASK_QUEUE]({commit}, payload) {
        commit(mutations.SET_TASK_QUEUE, payload.list);
    }
};
