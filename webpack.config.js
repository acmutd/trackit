const path = require("path");

module.exports = {
  // change to .tsx if necessary
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "./dist/bundle.js",
  },
  devServer: {
    contentBase: "./dist/dist/",
    port: 3000,
  },
  resolve: {
    // changed from extensions: [".js", ".jsx"]
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' }, exclude: /node_modules/ },
      { test: /\.(t|j)sx?$/, use: "ts-loader", exclude: /node_modules/ },

      // addition - add source-map support
      {
        enforce: "pre",
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/react"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
        loader: "source-map-loader",
      },
      { test: /\.css$/, use: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.png?$/, use: "file-loader", exclude: /node_modules/ },
    ],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  // addition - add source-map support
  devtool: "source-map",
};
