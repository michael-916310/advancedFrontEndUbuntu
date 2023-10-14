import path from 'path';
import webpack from './node_modules/webpack';
import {BuildPaths} from "./config/build/types/config";
import {buildWebpackConfig} from "./config/build/buildWebpackConfig";


const mode = 'development';
const isDev = mode ==='development';

const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname,'public', 'index.html')
}

const config:webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev
});

export default config;