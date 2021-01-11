const path = require("path"),
	TerserPlugin = require("terser-webpack-plugin"),
	fs = require('fs');
const babelLoader = {
	loader: "babel-loader",
	options: {
		cacheDirectory: true,
		presets: ["@babel/preset-env"],
		cacheDirectory: true,
		compact: false,
	},
};
const _is_prod = process.env.NODE_ENV === 'prod';
module.exports = {
	plugins: [],
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [babelLoader, { loader: "ts-loader" }],
			},
			{ test: /\.js$/, exclude: /node_modules/, use: babelLoader },
		],
	},
	resolve: { extensions: [".ts", ".js"] },
	entry: {
		'vr': path.join(__dirname, "./src/main.ts"),
	},
	output: {
		filename: _is_prod ? "[name].prod.js" : "[name].dev.js",
		path: _is_prod ? path.resolve(__dirname, "./dist") : path.resolve(__dirname, "./example"),
		publicPath: 'dist/',
		libraryTarget: 'umd',
		globalObject: 'this',
		chunkFilename: '[name].chunk.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'example'),
		index: 'index.html',
		port: 3000,
		open: true,
		compress: true
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				terserOptions: {
					ecma: 5,
					warnings: false,
					compress: { toplevel: true, passes: 2 },
					mangle: { toplevel: true },
					module: false,
					output: {
						comments: false
					},
					toplevel: false,
					nameCache: null,
					ie8: false,
					keep_classnames: void 0,
					keep_fnames: false,
					safari10: false
				},
				extractComments: false
			}),
		],
	},
};
