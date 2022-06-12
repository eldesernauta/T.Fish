const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
// terser removes console.logs
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => {
    const { mode } = argv
    const isProduction = mode === 'production'

    return {
        context: __dirname + "/src",
        entry: './index.js',
        output: {
            filename: isProduction
                ? './src/bundle.[contenthash].js'
                : './src/bundle.js',
            path: path.resolve(__dirname, "build"),
            publicPath: '/'
        },
        resolve: {
            extensions: [".jsx", ".js", ".ttf", ".otf", ".sass", ".scss"],
            modules: ['node_modules']
        },
        devServer: {
            hot: true,
            historyApiFallback: true,
            port: 8081,
            open: true,
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                },

                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: './src/fonts/[name].[hash].[ext]',
                    }

                },

                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '/'
                            }
                        },
                        "css-loader"
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader",
                    ],
                },


                {
                    test: /\.(jpe?g|png|ico|gif|svg)(\?[a-z0-9=.]+)?$/,
                    type: 'asset/resource',
                },

            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: __dirname + "/public/index.html",
                favicon: __dirname + "/public/favicon.ico",
                manifest: "./public/manifest.json"
            }),
            new MiniCssExtractPlugin({
                filename: 'src/styles/[name].css',
                chunkFilename: 'src/styles/[id].css'
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.optimize\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
                canPrint: true
            }),
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        output: {
                            comments: false
                        },
                        compress: {
                            drop_console: true
                        }
                    }
                }),
                new OptimizeCssAssetsPlugin({})
            ]
        },
        externals: {
            'jsdom': 'window',
            'cheerio': 'window',
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': 'window',
            'react/addons': true,
        },
    }
};
