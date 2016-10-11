import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import merge from 'merge';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import pkg from './package.json';
import clientConf from './config.client';
import { getStyleLoader } from './src/broilerplate-util/webpack';
import { List } from 'immutable';

const ENV = process.env.NODE_ENV;

const PATHS = {
  src: path.resolve(__dirname, './src'),
  build: path.resolve(__dirname, './dist'),
  modules: path.resolve(__dirname, './node_modules'),
  test: path.resolve(__dirname, './test')
};

export function getPostCss() {
  return function () {
    return [autoprefixer, precss];
  }
}

export function getCommonLoaders(ENV) {
  return List([
    getStyleLoader(
      ENV,
      {
        test: /\.p?css$/,
        include: [
          PATHS.src,
        ],
        loaders: [
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },
    ),
    getStyleLoader(
      ENV,
      {
        test: /\.css$/,
        include: [
          PATHS.modules,
        ],
        loaders: [
          'css-loader'
        ]
      },
    ),
    {
      test: /\.(png|jpg|gif|ico|svg)$/,
      loaders: [
        'file?hash=sha512&digest=hex&name=assets/images/[hash:base58:8].[ext]',
        'img?minimize&optimizationLevel=5&progressive=true'
      ],
      include: [
        PATHS.src
      ]
    },
    {
      test: /font.*\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]',
      include: [
        PATHS.src,
        PATHS.modules
      ]
    }
  ]);
}

const common = {

  context: __dirname,

  module: {
    loaders: getCommonLoaders(PATHS, ENV).concat(
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [
          PATHS.modules,
        ]
      }
    ).toJS()
  },
  postcss: getPostCss(),
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
  new webpack.optimize.OccurenceOrderPlugin(),
  new HtmlWebpackPlugin({
    title: 'Trollo',
    template: 'web/index.html',
    favicon: 'web/favicon.ico',
    inject: 'body'
  }),
  new webpack.DefinePlugin({
    __DEVELOPMENT__: process.env.NODE_ENV === 'development',
    __DEVTOOLS__: false,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  })
];

const envs = {
  test: {
    devtool: 'inline-source-map' //just do inline source maps instead of the default
  },

  development: {
    devtool: 'cheap-module-source-map',
    entry: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './src/client.js'
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
  production: {
    devtool: 'source-map',
    entry: {
      client: './src/client.js',
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

export default merge(common, envs[ENV]);
