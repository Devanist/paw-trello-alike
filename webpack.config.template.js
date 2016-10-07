module.exports = {
    entry: "PATH_TO_main.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {test: /\.json$/, loader: "json-loader"},
            {test: /\.scss$/, loader: "style!css!sass"}
        ]
    }
};