const path = require("path");

module.exports = {
  target: "node",
  entry: "/src/main.ts",
  resolve: {
    extensions: [".js", ".ts"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "./",
  },
  // Loaders
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: ["babel-loader", "ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  externals: ["canvas"],
};
