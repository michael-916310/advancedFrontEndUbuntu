import webpack from './../../node_modules/webpack';

export function BuildResolver(): webpack.ResolveOptions {
    return {
        // не указывать расширение при импорте
        extensions: ['.tsx', '.ts', '.js'],
    }
}