// Load dependencies
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

// Set target event and paths
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

// Set common webpack configuration
const common = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      // CSS and style loaders
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      }
    ]
  }
};

// Run server command
if (TARGET == 'start' || !TARGET) {
  module.exports = merge(common, {
    // Dev server
    devServer: {
      contentBase: PATHS.build,

      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      stats: 'errors-only',

      host: process.env.HOST,
      port: process.env.PORT
    },

    // Webpack HMR plugin load
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

// Build command
if (TARGET == 'build') {
  module.exports = merge(common, {});
}
