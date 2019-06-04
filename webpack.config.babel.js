import path from 'path';
import webpack from 'webpack';
import BabelEnginePlugin from 'babel-engine-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const PATHS = {
  app: path.join(__dirname, './src/client/app.js'),
  build: path.join(__dirname, './dist')
};

const config = {
  entry: ['babel-polyfill', 'webpack-hot-middleware/client?reload=true', PATHS.app],
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['.js', '.jsx']
  },
  target: 'web',
  node: {
    fs: 'empty',
    child_process: 'empty'
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  //
  // optimization: {
  //   minimize: false
  // },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /test\.js$/],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.gif$/, use: 'url-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
      {
        test: /\.(jpg|png|ttf|eot|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: '[name]-[hash:7].[ext]'
        }
      },
      {
        test: /\.(ogg|mp3|wma)$/,
        use: 'file-loader'
      },
      { test: /\.json$/, use: 'json-loader' },
      {
        include: /\.pug/,
        use: ['raw-loader', 'pug-html-loader']
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: false,
      publicPath: false
    },
    host: '127.0.0.1',
    port: process.env.PORT
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

if (TARGET === 'start' || !TARGET) {
  config.mode = 'development';
  config.devtool = 'cheap-module-eval-source-map';
  const DefineDevEnvPlugin = new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  });
  config.plugins.push(DefineDevEnvPlugin);
  module.exports = config;
}
if (TARGET === 'build' || TARGET === 'start-prod') {
  config.mode = 'production';
  const uglify = new UglifyJSPlugin({
    test: /\.(js)$/,
    exclude: /node_modules/,
    cache: true,
    parallel: true,
    sourceMap: true,
    uglifyOptions: {
      warnings: false,
      parse: {},
      compress: {},
      mangle: true,
      output: null,
      toplevel: false,
      nameCache: null,
      ie8: false,
      keep_fnames: false
    }
  });

  const babelPlugin = new BabelEnginePlugin({ presets: ['es2015'] });

  const DefineProdEnvPlugin = new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  });

  config.plugins.push(DefineProdEnvPlugin);
  config.plugins.push(babelPlugin);
  config.plugins.push(uglify);
  module.exports = config;
}
