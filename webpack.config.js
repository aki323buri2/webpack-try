const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
	entry: {
		app: './src/index.js', 
		print: './src/print.js', 
	}, 
	devtool: 'inline-source-map', 
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true
		}), 
		new CleanWebpackPlugin(['dist']), 
		new HtmlWebpackPlugin({
			title: 'Development', 
		}), 
	], 
	output: {
		filename: '[name].bundle.js', 
		path: path.resolve(__dirname, 'dist'), 
	}, 
	devServer: {
		host: '0.0.0.0', 
		disableHostCheck: true,
		port: 3000, 
		contentBase: './dist', 
	}, 
	module: {
		rules: [
			{
				test: /\.jsx?$/, 
				exclude: /node_modules/, 
				use: {
					loader: 'babel-loader', 
					options: {
						presets: [
							[ 'env', { browsers: [ 'ie 10', 'last 2 versions' ] } ], 
						], 
						plugins: [
							'transform-class-properties', 
							'transform-decorators-legacy', 
						], 
					}, 
				}, 
			}, 
			{
				test: /(scss|sass|css)$/, 
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader', 
					use: [
						{
							loader: 'css-loader', 
							options: {
								url: false, 
								minimize: true, 
								sourceMap: true, 
							}, 
						}, 
						{
							loader: 'sass-loader', 
							options: {
								sourceMap: true, 
							}, 
						}, 
						{
							loader: 'postcss-loader', 
							options: {
								plugins: [
									require('autoprefixer')({
										browsers: [
											'ie 10', 
											'last 2 version', 
										], 
									}), 
								], 
							}, 
						}, 
					], 
				}), 
			}, 
		], 
	}, 
	plugins: [
		new ExtractTextPlugin('[name].css'), 
	], 
};