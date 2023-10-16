import type { RuleSetRule } from 'webpack';

export function BuildLoaders():RuleSetRule[] {

    const typescriptLoader ={
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        };

    return [
        typescriptLoader
    ]
}