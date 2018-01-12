import config from '../../../build/config';
import State from '../../library/utils/State';
import file from '../../library/utils/file';
import * as SOCKET_EVENTS from '../../library/utils/events';

const PATH_PROJECT = `${config.PATH.CONFIG_ROOT}/__cache__/project.json`;

let userConfig = require(`${config.PATH.CONFIG_ROOT}/index.js`)
let userScript = require(`${config.PATH.CONFIG_ROOT}/script.js`);
let taskQueue = [];

let projectList = [];
let projectJson = file.readFileSync(PATH_PROJECT);
if (projectJson.length > 2) projectList = JSON.parse(projectJson);


class Handler {
    constructor() {
        userConfig.list = userConfig.list || [];
        userConfig.list.forEach(app => {
            app.status = State.NORMAL;
        });
    }

    async [SOCKET_EVENTS.GET_USER_CONFIG]() {
        return userConfig;
    }

    async [SOCKET_EVENTS.GET_PROJECT_LIST]() {
        return projectList;
    }

    async [SOCKET_EVENTS.ADD_PROJECT_LIST](data) {
        projectList.push({
            name: data.name,
            desc: data.desc,
            script: data.script || [],
            latest: {}
        });
        file.writeFileSync(PATH_PROJECT, JSON.stringify(projectList));
        return projectList;
    }

    async [SOCKET_EVENTS.DEL_PROJECT_LIST](data) {
        return projectList;
    }

    async [SOCKET_EVENTS.GET_USER_SCRIPT]() {
        return userScript;
    }

    async [SOCKET_EVENTS.GET_TASK_QUEUE]() {
        return taskQueue;
    }
}

export default new Handler();
