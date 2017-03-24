var path = require('path');
var webpack = require('webpack');
const fs = require("fs")
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({filename: "assets/css/[name].min.css"});

module.exports = {
    // watch: true,
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: '/assets/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [path.resolve(__dirname, "node_modules")],
                loaders: ['babel-loader']
            }, {
                test: /\.html$/,
                use: [
                    {
                        loader: 'file-loader?name=[name].[ext]&publicPath=assets/&outputPath=assets/html/'
                    }, {
                        loader: 'extract-loader'
                    }, {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            removeComments: true,
                            collapseWhitespace: true
                        }
                    }
                ]
            }, {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        }, {
                            loader: 'postcss-loader'
                        }, {
                            loader: "sass-loader"
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json"]
    },
    externals: fs.readdirSync("node_modules").reduce(function(acc, mod) {
        if (mod === ".bin") {
            return acc
        }
        acc[mod] = "commonjs " + mod
        return acc
    }, {}),
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        extractSass
    ]
}
