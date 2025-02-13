const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./react/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: [path.resolve(__dirname, "react"), "node_modules"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [`style-loader`, 'css-loader', 'postcss-loader'],
                exclude: /node_modules/,
            }            
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./react/index.html",
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        hot: true,
        historyApiFallback: true,
        port: 3000,
    },
};