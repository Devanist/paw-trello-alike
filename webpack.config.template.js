var webpack = require('webpack');
var PROD = process.argv.indexOf('--prod') !== -1;

module.exports = {
    entry: "PATH_TO_main.js",
    devtool: 'source-map',
    output: {
        path: PROD ? "./OUTPUT/" : __dirname,
        filename:  PROD ? "bundle.min.js" : "bundle.js",
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['transform-object-rest-spread']
                }
            },
            {test: /\.json$/, loader: "json-loader"},
            {test: /\.scss$/, loader: "style!css!sass"},
            {test: /\.png$/, loader: "url-loader"}
        ]
    },
    plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false}
        })
    ] : []
};