/**
 * Created by jyothi on 20/6/17.
 */
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env  = require('yargs').argv.env; // use --env with webpack 2

const libraryName = 'CohortGraph';
const libraryFileName = 'cohortgraph';
let plugins = [], outputFile;

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = libraryFileName + '.min.js';
} else {
    outputFile = libraryFileName + '.js';
}

module.exports = {

    entry: './src/index.js',
    output: {
        path: __dirname + '/lib',
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd'
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            'node_modules'
        ],
        extensions: ['.js'],
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: ['babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-0'],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.html$/,
                loader: 'raw'
            }
        ]
    },
    devServer: {
        contentBase: '.',
        port: 3456,
        inline: true
    },
    plugins: plugins
};