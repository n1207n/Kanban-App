// Load dependencies
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const npmInstallPlugin = require('npm-install-webpack-plugin');

// Set target event and paths
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

// Set common webpack configuration
const common = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      // SASS loaders
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(PATHS.app, './sass')]
  }
};

// Run server command
if (TARGET == 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',

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
      new webpack.HotModuleReplacementPlugin(),
      new npmInstallPlugin({
        save: true
      })
    ]
  });
}

// Build command
if (TARGET == 'build') {
  module.exports = merge(common, {});
}
