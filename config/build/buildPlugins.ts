import HTMLWebpackPlugin from "html-webpack-plugin";
import webpack from './../../node_modules/webpack';
import {BuildOptions} from "./types/config";

export function BuildPlugins({paths}: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        new HTMLWebpackPlugin({
            template: paths.html
        }),
        new webpack.ProgressPlugin(),
    ]
}