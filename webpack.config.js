// Load dependencies
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const npmInstallPlugin = require('npm-install-webpack-plugin');

// Set target NPM event and paths
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

// Let Babel can listen to NPM event as well so that it can load specific presets at start
process.env.BABEL_ENV = TARGET;

// Set common webpack configuration
const common = {
  // Babel
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  // Default Webpack setup
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },

  // Webpack loaders
  module: {
    loaders: [
      // SASS loaders
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },

      // Babel
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      }
    ]
  },

  // Webpack SASS loader configuration
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
