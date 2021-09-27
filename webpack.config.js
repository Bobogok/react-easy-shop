/* eslint-disable import/no-unresolved */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
const autoprefixer = require('autoprefixer');

const devMode = process.env.NODE_ENV === 'development';
const prodMode = !devMode;

console.log(`isDevMode: ${devMode}`);

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (prodMode) {
    config.minimizer = [
      new TerserPlugin({
        parallel: 4
      }) // This will enable CSS optimization only in production mode.
    ];
  }

  return config;
};

const cssLoaders = (extra) => {
  const loaders = [MiniCssExtractPlugin.loader, 'css-loader'];

  if (extra) {
    loaders.push(extra);
  }

  // push after all extra - no conflict config
  loaders.push({
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['ie >= 8', 'last 4 version']
          })
        ]
      }
      // sourceMap: true
    }
  });

  return loaders;
};

const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: prodMode,
        removeComments: prodMode
      }
    }),
    new RemovePlugin({
      before: {
        include: ['build']
        // parameters for "before normal compilation" stage.
      },
      watch: {
        include: ['build']
        // parameters for "before watch compilation" stage.
      },
      after: {
        // parameters for "after normal and watch compilation" stage.
      }
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/img'),
          to: path.resolve(__dirname, 'build/img')
        }
      ],
      options: {
        concurrency: 100
      }
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css'
    })
  ];

  if (prodMode) {
    // for production
  }

  return base;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index.jsx',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      reducers: path.resolve(__dirname, 'src/reducers')
    }
  },
  optimization: optimization(),
  devServer: {
    static: {
      directory: path.join(__dirname, 'src')
    },
    historyApiFallback: true,
    compress: true,
    port: 1337,
    open: false,
    hot: devMode
  },
  devtool: devMode ? 'source-map' : 'eval',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  }
};
