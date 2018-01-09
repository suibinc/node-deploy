import merge from 'webpack-merge';
import baseWebpackConfig from './base';
import config from '../config';
import { assetsPath } from '../utils';

let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

export default merge(baseWebpackConfig, {
    entry: {
        'index': `${config.PATH.CLIENT_ROOT}/index.js`
    },
    output: {
        path: config.PATH.PROJECT_DIST,
        filename: `js/[name].js`,
        publicPath: '/'
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
        new ExtractTextPlugin({
            filename: assetsPath(`css/[name].css`)
        })
    ]
});