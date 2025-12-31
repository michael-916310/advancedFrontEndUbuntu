import { Project } from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';

const project = new Project();

// Функция для рекурсивного поиска файлов
function findFiles(dir: string, extensions: string[]): string[] {
    const files: string[] = [];

    function traverse(currentDir: string) {
        const items = fs.readdirSync(currentDir);

        items.forEach((item) => {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                traverse(fullPath);
            } else if (stat.isFile()) {
                const ext = path.extname(item);
                if (extensions.includes(ext)) {
                    files.push(fullPath);
                }
            }
        });
    }

    traverse(dir);
    return files;
}

// Находим все .ts и .tsx файлы
const allFiles = findFiles('src', ['.ts', '.tsx']);

// Добавляем каждый файл в проект
allFiles.forEach((file) => {
    project.addSourceFileAtPath(file);
});

const sourceFiles = project.getSourceFiles();

const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');
const sharedUiDirectory = project.getDirectory(uiPath);
const componentsDirs = sharedUiDirectory?.getDirectories();

function isAbsolute(value: string) {
    const layers = [
        'app',
        'entities',
        'features',
        'pages',
        'shared',
        'widgets',
    ];
    return layers.some((layer) => value.startsWith(layer));
}

componentsDirs?.forEach((dir) => {
    const indexFilePath = `${dir.getPath()}/index.ts`;
    const indexFile = dir.getSourceFile(indexFilePath);

    if (!indexFile?.getBaseName()) {
        const sourceCode = `export * from './${dir.getBaseName()}';`;
        const file = dir.createSourceFile(indexFilePath, sourceCode, {
            overwrite: true,
        });
        file.save();
    }
});

sourceFiles.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations();

    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();
        const withoutAlias = value.replace('@/', '');

        const segments = withoutAlias.split('/');

        const isShared = segments?.[0] === 'shared';
        const isUi = segments?.[1] === 'ui';

        // console.log(isShared, isUi, isAbsolute(withoutAlias));

        if (isAbsolute(withoutAlias) && isShared && isUi) {
            const result = withoutAlias.split('/').slice(0, 3).join('/');
            console.log(result);
            importDeclaration.setModuleSpecifier(`@/${result}`);
        }
    });
});

project.save();
