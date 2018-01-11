import program from 'commander';
import packageJson from '../../package.json';
import Koa from 'koa';
import koaWebpack from 'koa-webpack';
import webpack from 'webpack';
import MemoryFS from 'memory-fs';
import path from 'path';
import config from '../../build/config';
import router from './routes';
import webpackConfig from '../../build/webpack';
import handler from './framework/handler';

const app = new Koa();
const fs = new MemoryFS();

const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
io.set('heartbeat interval', 60000);
io.set('heartbeat timeout', 5000);

program.version(packageJson.version)
    .option('-c, --config [config]', 'webpack.config.js', `./build/webpack/index.js`)
    .parse(process.argv);
let actName = process.env.PROJECT_NAME;
let actRoot = process.env.PROJECT_ROOT;

// start koa server
let webpackHtml = '';

for (let name in webpackConfig.entry) {
    if (webpackConfig.entry.hasOwnProperty(name)) {
        webpackConfig.entry[name] = [
            webpackConfig.entry[name],
            `webpack-hot-middleware/client?path=http://127.0.0.1:${config.SERVER_PORT}/__webpack_hmr&reload=true`
        ];
        webpackConfig.plugins.push(
            // 开启全局的模块热替换(HMR)
            new webpack.HotModuleReplacementPlugin()
        );
    }
}

const clientCompiler = webpack(webpackConfig);
clientCompiler.outputFileSystem = fs;
clientCompiler.plugin('done', () => {
    const {outputFileSystem} = clientCompiler;
    try {
        let htmlPath = path.join(webpackConfig.output.path, `index.html`);
        let htmlFile = outputFileSystem.readFileSync(htmlPath, 'utf-8');
        if (htmlFile) webpackHtml = htmlFile;
    } catch (e) {
        console.log(e);
    }
});

app.use(koaWebpack({
    compiler: clientCompiler,
    dev: {
        publicPath: '/',
        stats: {
            colors: true,
            modules: false,
            chunks: false,
            chunkModules: false,
            children: false
        }
    },
    hot: {
        path: `/__webpack_hmr`,
        log: console.log.bind(console)
    }
}));

router.get('/', async ctx => {
    console.log(ctx.path);
    ctx.body = webpackHtml || 'null';
});

io.on('connection', socket => {
    console.log('new connection');
    socket.on('application', (data, cb) => {
        console.log('application', data);
        handler.application().then(result => {
            console.log(result);
            socket.emit('application', result);
        });
    });

    socket.on('build-list', (data, cb) => {
        console.log('message');
        console.log(data);
    });

    socket.on('disconnect', () => {
        console.log('some one disconnect');
    });

    socket.on('event', data => {
        console.log('event');
        console.log(data);
        socket.emit('event', 'fasdfaf');
    });
});
server.listen(config.SOCKET_PORT);

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(config.SERVER_PORT);