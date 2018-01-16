import compiler from '../framework/compiler';

let taskQueue = [];
let buildRepo = '';
let isRunning = false;

class BuildQueue {
    getBuildRepo() {
        return buildRepo;
    }

    addTask(task) {
        console.log(task);
        if (task) {
            taskQueue.push(task);
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
            console.log(data);
        }, code => {
            console.log('end', code);
            console.log(buildRepo);
        });
    }

    getTaskQueue() {
        return taskQueue;
    }
}

export default new BuildQueue();