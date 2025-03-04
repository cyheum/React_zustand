const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const config = {
  name: 'React_zustand 1.0', // 설정 이름
  mode: isDevelopment ? 'development' : 'production', // production, development // 설정 모드
  devtool: false,
  entry: {
    app: './src/index.tsx',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@svg': path.resolve(__dirname, 'public/svgs/index'),
      '@images': path.resolve(__dirname, 'public/images/index'),
    },
    fallback: { querystring: require.resolve('querystring-es3') },
  },
  module: {
    rules: [
      {
        // 리액트 바벨 설정
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(mp4|ogg)$/, // 로더를 적용할 파일 유형
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new ErrorOverlayPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html', // 템플릿 설정
      minify: true, // 압축 설정
      favicon: './public/favicon.png',
    }),
    new webpack.ProvidePlugin({
      // 리액트 자동 로드
      React: 'react',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public/images', // 🔥 public 내부의 images 폴더만 복사
          to: 'images', // 🔥 dist/images 폴더로 바로 복사
        },
      ],
    }),
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.[chunkhash].js',
  },
  devServer: {
    // 개발 서버 설정
    static: './public',
    port: 4000,
    hot: true, // 핫 모듈 교체(HMR) 활성화
    compress: true,
    open: true,
    historyApiFallback: true,
  },
};

if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
