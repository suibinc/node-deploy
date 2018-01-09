class BuildExec {
    async compiler(ctx) {
        ctx.body = "fasdfas";
        console.log('compiler', ctx.params);
    }

    async status(ctx) {
        ctx.body = "fasdfas";
        console.log('compiler', ctx.params);
    }
}

export default new BuildExec();
