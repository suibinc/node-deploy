import * as actions from './actions';
import * as mutations from './mutations';

function generatorGetters(state) {
    let getters = {};
    if (typeof state !== 'object' || state instanceof Array) return {};
    for (let key in state) {
        if (state.hasOwnProperty(key)) {
            let name = key.replace(/([A-Z])/g, '_$1').toUpperCase();
            getters[name] = function (state) {
                return state[key];
            };
        }
    }
    return getters;
}

const state = {
    projectList: [],
    userScript: {
        list: []
    },
    userConfig: { // 用户设置文件
        list: []
    },
    taskQueue: [],
    histories: [],
    buildRepo: ''
};

export default {
    state,
    getters: generatorGetters(state),
    actions: actions.CORE,
    mutations: mutations.CORE
};