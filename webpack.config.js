const path = require("path");
const outputDir = path.resolve(__dirname, "dist/js");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "production",
    entry: ["regenerator-runtime/runtime.js", path.resolve(__dirname, "src/js/main.js")],
    output: {
        path: outputDir,
        filename: "main.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      },
};