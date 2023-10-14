import {BuildOptions} from "./types/config";
import webpack from './../../node_modules/webpack'
import {BuildPlugins} from "./buildPlugins";
import {BuildLoaders} from "./buildLoaders";
import {BuildResolver} from "./buildResolver";


export function buildWebpackConfig(options: BuildOptions): webpack.Configuration{

    const {mode, paths} = options;

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
    }
}