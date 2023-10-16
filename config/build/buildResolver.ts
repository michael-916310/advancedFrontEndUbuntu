import type { ResolveOptions } from './../../node_modules/webpack';


export function BuildResolver(): ResolveOptions {
    return {
        // не указывать расширение при импорте
        extensions: ['.tsx', '.ts', '.js'],
    }
}