import path from 'path';  
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {HotModuleReplacementPlugin} from 'webpack';

export default () => ({  
  entry: [
    //'react-hot-loader/patch', // Needed to preserve state
    //'webpack-dev-server/client?http://localhost:8080', // webpack dev server host and port
    path.join(__dirname, 'src/index.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                ['es2015', { modules: false }],
                'react',
                'stage-2'
              ],
              //plugins: ['react-hot-loader/babel'],
              plugins: ['transform-decorators-legacy','transform-react-jsx'],
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        //loader: 'style-loader!css-loader!sass-loader',
        use:[
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "file-loader" }
    ]
  },
  devServer: {
    hot: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: [ '.js', '.jsx'],
  },
});
