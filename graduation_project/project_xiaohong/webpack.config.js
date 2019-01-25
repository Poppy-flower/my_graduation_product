var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'client/router/router.js'),
    output: {
        path: path.resolve(__dirname, 'views/'),
        publicPath: '',
        filename: 'router.js'
    },
    resolve: {
        extensions: ['.css', '.js', '.vue', '.scss'],
        alias: {
            'vue': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.es6$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.jpg|\.png|\.jpeg|\.JPG$/,
                loader: 'url-loader'
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader',
                query: {
                    variable: 'all',
                    interpolate: '\\{\\{(.+?)\\}\\}',
                    evaluate: '\\[\\[(.+?)\\]\\]'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('router.css'),
        new HtmlWebpackPlugin({
            filename: 'router.html',
            chunks: 'router',
            template: path.resolve(__dirname, 'client/router/router.ejs')
        })
    ]
};