import config from '../../../build/config';
import { guid } from '../../library/utils';
import file from '../../library/utils/file';
import State from '../../library/utils/State';

const PATH_PROJECT = `${config.PATH.CONFIG_ROOT}/__cache__/project.json`;
let userConfig = require(`${config.PATH.CONFIG_ROOT}/index.js`)
let userScript = require(`${config.PATH.CONFIG_ROOT}/script.js`);
let projectList = [];

class UserConfig {
    constructor() {
        let projectJson = file.readFileSync(PATH_PROJECT);
        if (projectJson.length > 2) projectList = JSON.parse(projectJson);
        userConfig.list = userConfig.list || [];
        userConfig.list.forEach(app => {
            app.status = app.status || State.NORMAL;
        });
    }

    getUserConfig() {
        return userConfig;
    }

    getScriptList() {
        return userScript;
    }

    getProList() {
        return projectList;
    }

    addPro(list) {
        console.log(list);
        list.forEach(data => {
            let uuid = guid();
            projectList.push({
                uuid: uuid,
                name: data.name || uuid,
                desc: data.desc || '',
                script: data.script || [],
                params: data.params || [],
                latest: {},
                status: State.NORMAL
            });
        });
        console.log(projectList);
        file.writeFileSync(PATH_PROJECT, JSON.stringify(projectList), undefined, false);
        return projectList;
    }

    delPro(data) {
        console.log('delete', data.uuid);
        let index = projectList.findIndex(item => item.uuid === data.uuid);
        if (index >= 0) {
            projectList.splice(index, 1);
            file.writeFileSync(PATH_PROJECT, JSON.stringify(projectList), undefined, false);
        }
        return projectList;
    }

    saveProScript(data) {
        let index = projectList.findIndex(item => item.uuid === data.uuid);
        if (index >= 0) {
            projectList[index].script = data.list;
            file.writeFileSync(PATH_PROJECT, JSON.stringify(projectList), undefined, false);
        }
        return projectList;
    }

    findTask(data) {
        let index = projectList.findIndex(item => item.uuid === data.uuid);
        if (index >= 0) {
            let _item = projectList[index];
            _item.script = _item.script || [];
            let _script = _item.script[data.script];

            if (_script) {
                _item.status = State.BUILDING;
                return {
                    task: guid(),
                    uuid: data.uuid,
                    name: _item.name,
                    params: _item.params,
                    script: _script
                };
            }
        }
        return null;
    }

    taskCallback(uuid, code, data) {
        let index = projectList.findIndex(item => item.uuid === uuid);
        if (index >= 0) {
            let _item = projectList[index];
            _item.status = code === 0 ? State.NORMAL : State.ERROR;
            _item.latest = {
                time: Date.now()
            };
        }
    }
}

export default new UserConfig();
