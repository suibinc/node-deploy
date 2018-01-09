import merge from 'webpack-merge';
import baseWebpackConfig from './base';
import config from '../../config';

let HtmlWebpackPlugin = require('html-webpack-plugin'); // html处理

export default merge(baseWebpackConfig, {
    entry: {
        'index': `${config.PATH.CLIENT_ROOT}/index.js`
    },
    output: {
        path: config.PATH.PROJECT_DIST,
        filename: `js/[name].js`,
        publicPath: ''
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: `${config.PATH.PROJECT_DIST}/index.html`,
            template: `${config.PATH.CLIENT_ROOT}/index.html`,
            chunks: ['index', `index.css`],
            inject: 'body',
            minify: {
                removeComments: false,
                collapseWhitespace: false,
                removeAttributeQutes: true
            },
            chunksSortMode: 'dependency'
        }),
    ]
});