import HTMLWebpackPlugin from "html-webpack-plugin";
import {BuildOptions} from "./types/config";

import {ProgressPlugin} from 'webpack';
import type {WebpackPluginInstance} from 'webpack';

export function BuildPlugins({paths}: BuildOptions): WebpackPluginInstance[] {
    return [
        new HTMLWebpackPlugin({
            template: paths.html
        }),
        new ProgressPlugin(),
    ]
}