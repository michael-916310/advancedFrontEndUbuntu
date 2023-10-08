import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import webpack from './node_modules/webpack';

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