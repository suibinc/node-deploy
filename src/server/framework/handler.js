import config from '../../../build/config';

let applications = require(`${config.PATH.CONFIG_ROOT}/applications`)
let buildQueue = [];

class Handler {
    async compiler(ctx) {
        let result = {
            code: 0,
            message: 'success'
        };
        buildQueue.push(ctx.params.id);
        console.log('compiler', ctx.params);
        ctx.body = JSON.stringify(result);
    }

    async application() {
        return applications.list;
    }
}

export default new Handler();
