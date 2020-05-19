module.exports = {
    // change to .tsx if necessary
    entry: './src/index.js',
    mode: 'production',
    output: {
      filename: './dist/bundle.js'
    },
    resolve: {
      // changed from extensions: [".js", ".jsx"]
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
      rules: [
        // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' }, exclude: /node_modules/ },
        { test: /\.(t|j)sx?$/, use: 'ts-loader', exclude: /node_modules/ },
  
        // addition - add source-map support
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        { test:/\.css$/, use:['style-loader','css-loader'] },
        { test: /\.png?$/, use: "file-loader", exclude: /node_modules/ }
      ]
    },
    externals: {
      "react": "React",
      "react-dom": "ReactDOM",
    },
    // addition - add source-map support
    devtool: "source-map"
  }