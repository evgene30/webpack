const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const filename = (ext) => `[name],${ext}`;

module.exports = {
    mode: "production",
    entry: {
        main: path.resolve(__dirname, "./src/js/script.js"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "./js/script.js",
        publicPath: "",
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./css/style.css",
        }),
        new HtmlWebpackPlugin({
            title: "webpack-project",
            template: path.resolve(__dirname, "./src/index.html"), // шаблон
            filename: "index.html", // название выходного файла
            inject: 'body',
            inify: { collapseWhitespace: true },
        }),
        new HtmlWebpackPlugin({
            title: "webpack-project",
            template: path.resolve(__dirname, "./src/all-animals.html"), // шаблон
            filename: "all-animals.html", // название выходного файла
            inify: { collapseWhitespace: true },
            inject: 'body',
        }),
        new CopyPlugin({
            patterns: [{ from: "./src/img/", to: "./img/" }],
        }),
    ],
    module: {
        rules: [
            {
                loader: "url-loader",
                options: {
                    name: "./img/assets/[name].[ext]",
                },
                test: /\.(jpe?g|png|gif|svg)$/i,
            },

            {
                test: /\.(woff(2)?|eot|ttf|otf|)$/,
                loader: "url-loader",
                options: {
                    name: "./fonts/[name].[ext]",
                },
            },

            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
};
