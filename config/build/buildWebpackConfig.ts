import {BuildOptions} from "./types/config";
import {BuildPlugins} from "./buildPlugins";
import {BuildLoaders} from "./buildLoaders";
import {BuildResolver} from "./buildResolver";
import {buildDevServer} from "./buildDevServer";

import type {Configuration} from 'webpack'

export function buildWebpackConfig(options: BuildOptions): Configuration{

    const {mode, paths, isDev} = options;

    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
        },
        plugins: BuildPlugins(options),
        module: {
            // Все что не JS обрабатываеся здесь
            rules: BuildLoaders(),
        },
        resolve: BuildResolver(),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    }
}