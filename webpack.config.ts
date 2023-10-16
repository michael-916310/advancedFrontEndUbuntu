import path from 'path';
import webpack from './node_modules/webpack';
import {BuildEnv, BuildPaths} from "./config/build/types/config";
import {buildWebpackConfig} from "./config/build/buildWebpackConfig";

export default (env:BuildEnv) =>{

    const mode = env.mode ?? 'development';
    const PORT = env.port ?? 3000;

    const isDev = mode ==='development';

    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname,'public', 'index.html')
    }

    const config:webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT
    });

    return config;
};