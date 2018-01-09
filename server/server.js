import program from 'commander';
import packageJson from '../package.json';
import Koa from 'koa';
import koaWebpack from 'koa-webpack';
import webpack from 'webpack';
import MemoryFS from 'memory-fs';
import path from 'path';
import config from '../config';
import router from './routes';
import webpackConfig from '../build/webpack';

const app = new Koa();
const fs = new MemoryFS();

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
            `webpack-hot-middleware/client?path=http://127.0.0.1:${config.PORT}/__webpack_hmr&reload=true`
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

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(config.PORT || 3000);