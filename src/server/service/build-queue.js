import config from '../../../build/config';
import file from "../../library/utils/file";
import compiler from '../framework/compiler';
import UserConfig from './user-config';

const HISTORY_ROOT = `${config.PATH.CONFIG_ROOT}/__cache__/history`;
const HISTORY_PATH = `${config.PATH.CONFIG_ROOT}/__cache__/history.json`;
let histories = {};
let taskQueue = [];
let buildRepo = '';
let isRunning = false;

class BuildQueue {
    constructor() {
        let historyJson = file.readFileSync(HISTORY_PATH);
        if (historyJson.length > 2) histories = JSON.parse(historyJson);
    }

    getBuildRepo() {
        return buildRepo;
    }

    addTask(task) {
        console.log(task);
        if (task) {
            taskQueue.push(task);
            if (!histories[task.uuid]) {
                histories[task.uuid] = [];
            }
            histories[task.uuid].push({
                uuid: task.task,
                user: 'root',
                status: true,
                start: Date.now(),
                end: Date.now()
            });
            file.writeFileSync(HISTORY_PATH, JSON.stringify(histories), undefined, false);
            this.runTask();
        }
        return taskQueue;
    }

    runTask() {
        if (isRunning) return false;
        isRunning = true;

        let task = taskQueue.pop();
        if (!task) return false;

        compiler(task.script, task.params, data => {
            buildRepo = buildRepo + data;
            file.writeFileSync(`${HISTORY_ROOT}/${task.task}.log`, buildRepo, undefined, false);
        }, code => {
            let item = histories[task.uuid].find(i => i.uuid === task.task);
            if (item) {
                item.end = Date.now();
                file.writeFileSync(HISTORY_PATH, JSON.stringify(histories), undefined, false);
            }
            UserConfig.taskCallback(task.uuid, code, {});
            isRunning = false;
            this.runTask();
        });
    }

    getTaskQueue() {
        return taskQueue;
    }
}

export default new BuildQueue();