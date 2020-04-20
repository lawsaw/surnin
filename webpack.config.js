const dotenv = require('dotenv');

const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const extractCSS = new ExtractTextPlugin({
    filename: 'css/style.css',
    //allChunks: true
});

const options = {
    dev: true,
    path_src: './src',
    path_build: __dirname + '/frontend/web',
}

const API_PATH = '/proxy';
const API_URL = 'http://surnin:80';

const templates = [
    'index',
];

let generateTemplates = () => {
    return templates.map(item => (
        new HtmlWebPackPlugin({
            template: `${options.path_src}/pug/${item}.pug`,
            filename: `./${item}.html`,
            inject: false,
        })
    ));
};

const env = dotenv.config({
    path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
}).parsed;

module.exports = () => {

    return {
        node: {
            fs: 'empty'
        },
        entry: {
            defer: [`${options.path_src}/js/defer.js`],
            boundle: [
                `${options.path_src}/js/index.js`,
                `${options.path_src}/scss/style.scss`,
            ]
        },
        output: {
            publicPath: '/',
            path: options.path_build,
            filename: "js/[name].js",
        },
        module: {
            rules: [
                {
                    //test: /\.jsx?$/,
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    // use: {
                    //     loader: "babel-loader"
                    // }
                    use: ["babel-loader", "eslint-loader"]
                },
                {
                    test: /\.pug$/,
                    use: [
                        "html-loader",
                        //"pug-html-loader",
                        "pug-html-loader?pretty&exports=true"
                    ]
                },
                {
                    test: /\.scss$/,
                    use: extractCSS.extract([
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                //sourceMap: 'inline',
                                sourceMap: true,
                                plugins: function () {
                                    return [
                                        require('autoprefixer')({
                                            Browserslist: [
                                                '> 5%',
                                                'last 100 versions',
                                                'ie 6-8'
                                            ],
                                            add: true,
                                            supports: true,
                                            flexbox: true,
                                            grid: true,
                                            cascade: true
                                        }),
                                        require('cssnano')({ preset: 'default' })
                                    ]
                                }
                            }
                        }, 'sass-loader' ]
                    )
                },
                {
                    test: /svg\/.*\.svg$/,
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                extract: true,
                                spriteFilename: './svg/sprite.svg',
                            }
                        }
                    ]
                },
                {
                    test: /fonts\/.*\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: 'fonts/',
                            outputPath: './css/fonts',
                        }
                    }]
                },
                {
                    test: /images\/.*\.(png|jpg|gif|ico)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 50,
                                name: 'images/[name].[ext]',
                                publicPath: '../',
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            ...generateTemplates(),
            extractCSS,
            new SpriteLoaderPlugin({
                //plainSprite: true,
            }),
            new webpack.EnvironmentPlugin(env),
        ],
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },
        devServer: {
            historyApiFallback: {
                index: '/',
            },
            proxy: {
                [API_PATH]: {
                    target: API_URL,
                    pathRewrite: { [`^${API_PATH}`]: '/' },
                    changeOrigin: true,
                },
            },
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    parallel: false,
                    terserOptions: {
                        ecma: 6,
                        compress: {
                            drop_console: false,
                            dead_code: true,
                        },
                        output: {
                            ast: true,
                            code: true,
                            beautify: false
                        }
                    },
                })
            ],
        },
        mode: process.env.NODE_ENV,
        devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map': 'none',
    }
};