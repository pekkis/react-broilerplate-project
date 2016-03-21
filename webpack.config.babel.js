import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import Webpack_isomorphic_tools_plugin from 'webpack-isomorphic-tools/plugin';
import merge from 'merge';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import pkg from './package.json';
import clientConf from './config.client';
import { getStyleLoader } from '@dr-kobros/react-broilerplate/lib/webpack';
import isomorphicConfig from './webpack-isomorphic.js';

const ENV = process.env.NODE_ENV;
const PATHS = {
    src: path.resolve('./src'),
    build: path.resolve('./dist'),
    modules: path.resolve('./node_modules'),
    test: path.resolve('./test')
};


let webpack_isomorphic_tools_plugin;
webpack_isomorphic_tools_plugin = new Webpack_isomorphic_tools_plugin(
    isomorphicConfig
);
if (ENV === 'development') {
    webpack_isomorphic_tools_plugin = webpack_isomorphic_tools_plugin.development();
}

const common = {

    context: __dirname,

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: [
                    PATHS.modules,
                ]
            },
            getStyleLoader(
                ENV,
                {
                   test: /\.p?css$/,
                    include: [
                        PATHS.src,
                    ]
                },
                [
                    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    'postcss-loader'
                ]
            ),
            getStyleLoader(
                ENV,
                {
                    test: /\.css$/,
                    include: [
                        PATHS.modules,
                    ]
                },
                [
                    'css-loader'
                ]
            ),
            {
                test: webpack_isomorphic_tools_plugin.regular_expression('images'),
                loaders: [
                    'file?hash=sha512&digest=hex&name=assets/images/[hash:base58:8].[ext]',
                    'img?minimize&optimizationLevel=5&progressive=true'
                ],
                include: [
                    PATHS.src
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]',
                include: [
                    PATHS.src,
                    PATHS.modules
                ]
            },
            {
                test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])$/,
                loader: 'file-loader?name=assets/fonts/[name].[ext]',
                include: [
                    PATHS.src,
                    PATHS.modules
                ]
            }
        ]
    },
    postcss: function () {
        return [autoprefixer, precss];
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        root: [
            PATHS.src,
        ],
        extensions: ['', '.js', '.jsx']
    },
    resolveLoader: {
        root: PATHS.modules
    }
};

const plugins = [
    webpack_isomorphic_tools_plugin,
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
        title: 'JavaScript SchamaScript',
        template: 'web/index.html',
        favicon: 'web/favicon.ico',
        inject: 'body'
    }),
    new webpack.DefinePlugin({
        __DEVELOPMENT__: process.env.NODE_ENV === 'development',
        __DEVTOOLS__: false
    })
];

const envs = {

    test: {
      devtool: 'inline-source-map' //just do inline source maps instead of the default
    },

    development: {
        devtool: 'cheap-module-source-map',
        entry: [
            'webpack-hot-middleware/client',
            './src/client.jsx'
        ],
        output: {
            path: path.join(__dirname, 'dist'),
            publicPath: '/',
            filename: 'client.[hash].js'
        },
        plugins: plugins.concat([
            new webpack.HotModuleReplacementPlugin(),
        ])
    },
    prod: {
        devtool: 'source-map',
        entry: {
            client: './src/client.jsx',
        },

        output: {
            path: path.join(__dirname, 'dist'),
            publicPath: '/',
            filename: '[name].[chunkhash].js'
        },
        plugins: plugins.concat([
            new ExtractTextPlugin("styles.[contenthash].css"),
            new webpack.optimize.UglifyJsPlugin({
                'mangle': false,
                'compress': {
                    /* eslint-disable camelcase */
                    dead_code: true,  // discard unreachable code
                    unsafe: false, // some unsafe optimizations (see below)
                    unused: false, // drop unused variables/functions
                    hoist_vars: false, // hoist variable declarations
                    side_effects: false, // drop side-effect-free statements
                    global_defs: {} // glob
                    /* eslint-enable camelcase */
                }
            }),
            new webpack.NoErrorsPlugin()
        ])
    }
}

module.exports = merge(common, envs[ENV]);
