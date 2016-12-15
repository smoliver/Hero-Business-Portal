require('dotenv').config()
var webpack = require('webpack');

// Process args
var context = (function() {
    var suffixes = ['API_DOMAIN'],
        env = process.argv.filter(function(val) { return val.indexOf('--env') > -1 });
    if (env.length === 0) {
        throw 'Error: Must provide a --env environment';
    }
    env = env[0].split('=')[1];
    return suffixes.reduce(function(args, suffix) {
        var envVar = process.env[`${env}_${suffix}`];
        if (!envVar) {
            throw `Error: Must specify ${env}_${suffix} in the .env file in the root`
        }
        args[`${suffix}`] = envVar;
        return args;
    }, {
        'ENV': env
    });
})()

module.exports = {
    context: __dirname + '/src',
    entry: ['whatwg-fetch', './index.js'],
    output: {
        path: __dirname + '/dist',
        filename: context.ENV === 'PROD' ? 'bundle.min.js' : 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'API_DOMAIN': JSON.stringify(context.API_DOMAIN)
            }
        })
    ].concat(context.ENV === 'PROD' ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        })
    ] : []),
    devtool: '#cheap-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: 'node_modules',
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['transform-object-assign']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.svg$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.(png|woff|woff2|eot|ttf)$/,
                loader: 'url-loader?limit=100000'
            },
        ]
    }
}