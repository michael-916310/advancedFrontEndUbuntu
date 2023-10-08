// const path = require('path');
import path from 'path';
//const HTMLWebpackPlugin = require('html-webpack-plugin');
import HTMLWebpackPlugin from 'html-webpack-plugin';
//const webpack = require("webpack")
import webpack from 'webpack';

const config:webpack.Configuration = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    plugins:[
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname,'public', 'index.html')
        }),
        new webpack.ProgressPlugin(),
    ],
    module: {
        // Все что не JS обрабатываеся здесь
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        // не указывать расширение при импорте
        extensions: ['.tsx', '.ts', '.js'],
    },
}

export default config;