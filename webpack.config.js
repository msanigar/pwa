const { resolve } = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const PUBLIC_PATH = 'https://fractured-play.co.uk/pwa/';

const config = {
	devtool: 'cheap-module-eval-source-map',

	entry: [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:9001',
		'webpack/hot/only-dev-server',
		'./main.js',
		'./assets/scss/main.scss'
	],

	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, 'dist'),
		publicPath: '/pwa'
	},

	context: resolve(__dirname, 'app'),

	devServer: {
		hot: true,
		contentBase: resolve(__dirname, 'dist'),
		publicPath: '/',
		port: 9001,
		historyApiFallback: true
	},

	module: {
		rules: [{
				test: /\.js$/,
				loaders: [
					'babel-loader'
				],
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				loaders: [{
						loader: 'style-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{ test: /\.(png|jpg)$/, use: 'url-loader?limit=15000' },
			{ test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader' },
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
			{ test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' }
		]
	},

	plugins: [
		new OpenBrowserPlugin({ url: 'http://localhost:9001' }),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development')
			}
		}),
    new SWPrecacheWebpackPlugin(
    {
      cacheId: 'pwa',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      minify: true,
      navigateFallback: PUBLIC_PATH + 'index.html',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    })
	]
};

module.exports = config;
