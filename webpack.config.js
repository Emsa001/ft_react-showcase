const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./react/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    resolve: {
        alias: {
            "react": path.resolve(__dirname, "react"),
        },
        extensions: [".ts", ".tsx", ".js"],
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
            favicon: "./public/favicon.ico",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "public", to: "public" }, // Copies all files from public to dist/public
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        hot: true,
        liveReload: true,
        historyApiFallback: true,
        port: 3000,
    },
};