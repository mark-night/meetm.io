const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  WorkboxPlugin = require('workbox-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin');

const task = process.env.npm_lifecycle_event;
const djangoPath = {
  // ! trailing slash is necessary
  templates: 'templates/projects/',
  static: 'static/projects/',
};
const subDir = { js: 'js', css: 'css', img: 'img' };
const packOption = {
  hashLength: 8,
  analyzer: false,
  splitVendors: false,
  workbox: true,
};

const config = {
  entry: './src/js/index.jsx',
  output: {
    path: path.resolve(__dirname, '..', djangoPath.static),
    publicPath: '/' + djangoPath.static,
    hashDigestLength: packOption.hashLength,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          'css-loader',
          {
            loader: 'resolve-url-loader',
            options: { keepQuery: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [require('autoprefixer')],
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.jsx?$/i,
        include: /node_modules/,
        use: 'react-hot-loader/webpack',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            // larger files fallback to file-loader with following options
            // modify context so [path] doesn't contain leading 'src'
            context: path.join(__dirname, 'src'),
            name: `[path][name].[contenthash:${packOption.hashLength}].[ext][query]`,
          },
        },
      },
    ],
  },
};

if (task === 'dev') {
  config.output.filename = path.join(subDir.js, '[name].js');
  config.devtool = 'eval-source-map';

  config.devServer = {
    contentBase: [
      path.resolve(__dirname, '..', djangoPath.static),
      path.resolve(__dirname, '..', djangoPath.templates),
    ],
    contentBasePublicPath: '/proj/',
    watchContentBase: true,
    hot: true,
    port: 3000,
    host: '0.0.0.0',
    disableHostCheck: true,
    overlay: true,
  };

  config.module.rules[0].use.unshift('style-loader');

  config.plugins = [
    new MiniCssExtractPlugin({
      filename: path.join(subDir.css, '[name].css'),
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true, // supported by html-webpack-harddisk-plugin
      template: './src/index.html',
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
  config.output.filename = path.join(subDir.js, '[name].[hash].js');
  config.output.chunkFilename = path.join(subDir.js, '[name].[chunkhash].js');

  config.module.rules[0].use.unshift(MiniCssExtractPlugin.loader);

  config.plugins = [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [path.resolve(__dirname, 'src/manifest.json')],
    }),
    new MiniCssExtractPlugin({
      filename: path.join(subDir.css, '[name].[hash].css'),
      chunkFilename: path.join(subDir.css, '[id].[chunkhash].css'),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: path.resolve(
        __dirname,
        '..',
        djangoPath.templates,
        'index.html'
      ),
    }),
  ];
  if (packOption.workbox) {
    config.plugins.push(
      new WorkboxPlugin.InjectManifest({
        // compileSrc: false,
        swSrc: './src/js/swSrc.js',
        swDest: path.resolve(
          __dirname,
          '..',
          djangoPath.templates,
          'sw-proj.js'
        ),
        manifestTransforms: [
          async entries => {
            const results = entries.map(entry => {
              const markup = new RegExp(djangoPath.templates);
              if (entry.url.match(markup)) {
                entry.url = '/proj/';
              }
              const hashed = new RegExp(`\\.\\w{${packOption.hashLength}}\\.`);
              if (entry.url.match(hashed)) {
                entry.revision = null;
              }
              return entry;
            });
            return { manifest: results, warnings: [] };
          },
        ],
      })
    );
  }

  config.optimization = {
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

if (packOption.analyzer) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
  config.plugins.unshift(new BundleAnalyzerPlugin());
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
