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

sourceFiles.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations();

    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();
        if (isAbsolute(value)) {
            //   console.log(value);
            importDeclaration.setModuleSpecifier(`@/${value}`);
        }
    });
});

project.save();
