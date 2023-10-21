import HTMLWebpackPlugin from "html-webpack-plugin";
import {BuildOptions} from "./types/config";

import type {WebpackPluginInstance} from 'webpack';
import {ProgressPlugin} from 'webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function BuildPlugins({paths}: BuildOptions): WebpackPluginInstance[] {
    return [
        new HTMLWebpackPlugin({
            template: paths.html
        }),
        new ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        })
    ]
}