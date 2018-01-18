import * as SOCKET_EVENTS from '../../library/utils/events';

import BuildQueue from '../service/build-queue';
import UserConfig from '../service/user-config';

class Handler {
    async [SOCKET_EVENTS.GET_USER_CONFIG]() {
        return UserConfig.getUserConfig();
    }

    async [SOCKET_EVENTS.GET_PROJECT_LIST]() {
        return UserConfig.getProList();
    }

    async [SOCKET_EVENTS.ADD_PROJECT_LIST](list) {
        return UserConfig.addPro(list);
    }

    async [SOCKET_EVENTS.DEL_PROJECT_LIST](data) {
        return UserConfig.delPro(data);
    }

    async [SOCKET_EVENTS.GET_USER_SCRIPT]() {
        return UserConfig.getScriptList();
    }

    async [SOCKET_EVENTS.EXEC_SCRIPT](data) {
        let task = UserConfig.findTask(data);
        return BuildQueue.addTask(task);
    }

    async [SOCKET_EVENTS.SAVE_APP_SCRIPT](data) {
        return UserConfig.saveProScript(data);
    }

    async [SOCKET_EVENTS.GET_TASK_QUEUE]() {
        return BuildQueue.getTaskQueue();
    }

    async [SOCKET_EVENTS.GET_HISTORY_LIST](data) {
        return BuildQueue.getHistories(data);
    }

    async [SOCKET_EVENTS.GET_BUILD_INFO](data) {
        return BuildQueue.getBuildInfo(data);
    }
}

export default new Handler();
