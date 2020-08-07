const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { opendir } = require('fs');

const task = process.env.npm_lifecycle_event;
const djangoPath = {
  // ! trailing slash is necessary
  templates: 'templates/twitch/',
  static: 'static/twitch/'
};
const subDir = { js: 'js' };
const packOption = {
  analyzer: false,
  splitVendors: false
};

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, djangoPath.static),
    publicPath: '/' + djangoPath.static
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: path.resolve(__dirname, djangoPath.templates, 'index.html')
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors'
        }
      }
    }
  }
};

if (packOption.analyzer) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
  config.plugins.unshift(new BundleAnalyzerPlugin());
}

if (task === 'dev') {
  config.mode = 'development';
  config.output.filename = path.join(subDir.js, '[name].js');
} else if (task === 'build') {
  config.mode = 'production';
  config.output.hashDigestLength = 8;
  config.output.filename = path.join(subDir.js, '[name].[hash].js');
  config.output.chunkFilename = path.join(subDir.js, '[id].[chunkhash].js');
  // good practice when hashing output name on content
  config.optimization.runtimeChunk = { name: 'rt' };
  // hashed module id prevent content hash from changing due to id changes
  config.optimization.moduleIds = 'hashed';
}

if (packOption.splitVendors) {
  config.optimization.splitChunks.cacheGroups.vendor.name = module => {
    const moduleName = module.context.match(
      /[\\/]node_modules[\\/](.*?)([\\/]|$)/
    )[1];
    return `npm-${moduleName.replace('@', '')}`;
  };
}

module.exports = config;
