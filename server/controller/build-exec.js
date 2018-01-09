let buildQueue = [];

class BuildExec {
    async compiler(ctx) {
        let result = {
            code: 0,
            message: 'success'
        };
        buildQueue.push(ctx.params.id);
        console.log('compiler', ctx.params);
        ctx.body = JSON.stringify(result);
    }

    async remove(ctx) {
        let result = {
            code: 0,
            message: 'success'
        };
        buildQueue.splice(ctx.params.id, 1);
        console.log('remove', ctx.params);
        ctx.body = JSON.stringify(result);
    }

    async status(ctx) {
        let result = {
            code: 0,
            message: 'success',
            result: buildQueue
        };
        ctx.body = JSON.stringify(result);
    }
}

export default new BuildExec();
