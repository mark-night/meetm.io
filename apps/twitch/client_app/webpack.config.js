const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const task = process.env.npm_lifecycle_event;
const djangoPath = {
  // ! trailing slash is necessary
  templates: 'templates/twitch/',
  static: 'static/twitch/',
  basename: '/twitch/',
};
const subDir = { js: 'js', css: 'css' };
const packOption = {
  analyzer: false,
  splitVendors: false,
};

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '..', djangoPath.static),
    publicPath: '/' + djangoPath.static,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['css-loader'],
      },
      {
        test: /\.js?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

if (task === 'dev') {
  config.output.filename = path.join(subDir.js, '[name].js');

  config.devServer = {
    contentBase: [
      path.resolve(__dirname, '..', djangoPath.static),
      path.resolve(__dirname, '..', djangoPath.templates),
    ],
    watchContentBase: true,
    host: '0.0.0.0',
    port: 3000,
    contentBasePublicPath: djangoPath.basename,
    overlay: true,
    hot: true,
  };

  config.module.rules[0].use.unshift('style-loader');

  config.plugins = [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: './src/templates/index.html',
      filename: path.resolve(
        __dirname,
        '..',
        djangoPath.templates,
        'index.html'
      ),
    }),
    new HtmlWebpackHarddiskPlugin(),
  ];
} else if (task === 'build') {
  config.mode = 'production';
  config.output.hashDigestLength = 8;
  config.output.filename = path.join(subDir.js, '[name].[hash].js');
  config.output.chunkFilename = path.join(subDir.js, '[id].[chunkhash].js');

  config.module.rules[0].use.unshift(MiniCssExtractPlugin.loader);

  config.plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: path.join(subDir.css, '[name].[hash].css'),
      chunkFilename: path.join(subDir.css, '[id].[chunkhash].css'),
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: path.resolve(
        __dirname,
        '..',
        djangoPath.templates,
        'index.html'
      ),
    }),
  ];

  config.optimization = {
    runtimeChunk: { name: 'rt' },
    moduleIds: 'hashed',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
        },
      },
    },
  };
}

if (packOption.splitVendors) {
  config.optimization.splitChunks.cacheGroups.vendor.name = module => {
    const moduleName = module.context.match(
      /[\\/]node_modules[\\/](.*?)([\\/]|$)/
    )[1];
    return `npm-${moduleName.replace('@', '')}`;
  };
}

if (packOption.analyzer) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
  config.plugins.unshift(new BundleAnalyzerPlugin());
}

module.exports = config;
