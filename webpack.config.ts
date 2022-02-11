import TerserPlugin from 'terser-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

const config: webpack.Configuration = {
  target: 'node',
  entry: './src/printaeu.ts',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'package.json' },
        { from: 'README.md' },
        { from: 'src/printaeu.d.ts'}
      ]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/test/, /scripts/, /sandbox/, /build/],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  output: {
    filename: 'printaeu.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: [nodeExternals()]
};

export default config;