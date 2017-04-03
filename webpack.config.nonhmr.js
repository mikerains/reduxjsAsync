


var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var webpack = require('webpack');

module.exports = {
    devtool: "cheap-eval-source-map",
    entry: {
        app: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
        //filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            }
        ]
    },

    //plugins: [new HtmlWebpackPlugin({template: './src/index.html'})]
    plugins: [
        new CleanWebpackPlugin(['dist', 'build'], {
            verbose: true,
            dry: false,
            exclude: ['shared.js']
        }),
        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: './src/myindex.ejs', // Load a custom template (ejs by default see the FAQ for details)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: function (module) {
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        })]
}

//module.exports = config;