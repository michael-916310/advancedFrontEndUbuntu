import webpack from './../../node_modules/webpack'

export function BuildLoaders():webpack.RuleSetRule[] {

    const typescriptLoader ={
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        };

    return [
        typescriptLoader
    ]
}