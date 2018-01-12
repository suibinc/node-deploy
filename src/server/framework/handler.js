import config from '../../../build/config';
import State from '../../library/utils/State';
import { guid } from '../../library/utils';
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

    async [SOCKET_EVENTS.ADD_PROJECT_LIST](list) {
        console.log(list);
        list.forEach(data => {
            let uuid = guid();
            projectList.push({
                uuid: uuid,
                name: data.name || uuid,
                desc: data.desc || '',
                script: data.script || [],
                latest: {},
                status: State.NORMAL
            });
        });
        file.writeFileSync(PATH_PROJECT, JSON.stringify(projectList), undefined, false);
        return projectList;
    }

    async [SOCKET_EVENTS.DEL_PROJECT_LIST](data) {
        console.log('delete', data.uuid);
        let index = projectList.findIndex(item => item.uuid === data.uuid);
        if (index >= 0) {
            projectList.splice(index, 1);
            file.writeFileSync(PATH_PROJECT, JSON.stringify(projectList), undefined, false);
        }
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
