import { Configuration } from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';
import pathsPlugin from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

export default function(): Configuration {
  return {
    entry: "/src/index.tsx",
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    module: {
      rules: [
        {
          test: /\.(jsx?|tsx?)$/,
          loader: "ts-loader"
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"]
        }
      ]
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      plugins: [new pathsPlugin({configFile: path.join(__dirname, "tsconfig.json")})]
    },
    plugins: [
      new htmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),
        inject: "head",
        scriptLoading: "defer"
      }),
      new MiniCssExtractPlugin({
        filename: "common.css"
      })
    ],
    devServer: {
      historyApiFallback: true,
      open: true,
      port: 8000,
    }
  };
}