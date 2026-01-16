import { Node, Project, SyntaxKind } from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';

const processingFeatureName = process.argv[2]; // example: isArticleEnabled
const newFeatureState = process.argv[3]; // example: on | off

if (!processingFeatureName) {
    throw new Error('Укажите название фича-флага');
}

if (
    !newFeatureState ||
    (newFeatureState !== 'on' && newFeatureState !== 'off')
) {
    throw new Error('Укажите целевое состояние фича-флага: on | off');
}

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
// const allFiles = findFiles('src', ['.ts', '.tsx']);
// TODO Remove !!!
const allFiles = findFiles('src', ['.ts', '.tsx']);

// Добавляем каждый файл в проект
allFiles.forEach((file) => {
    project.addSourceFileAtPath(file);
});

const sourceFiles = project.getSourceFiles();

function isToggleFunction(node: Node) {
    let isToggleFeatures = false;

    node.forEachChild((child) => {
        if (
            child.isKind(SyntaxKind.Identifier) &&
            child.getText() === 'toggleFeatures'
        ) {
            isToggleFeatures = true;
        }
    });

    return isToggleFeatures;
}

sourceFiles.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            const objectOptions = node.getFirstDescendantByKind(
                SyntaxKind.ObjectLiteralExpression,
            );

            if (!objectOptions) {
                return;
            }

            const onProperty = objectOptions.getProperty('on');
            const offProperty = objectOptions.getProperty('off');
            const nameProperty = objectOptions.getProperty('name');

            const onFn = onProperty?.getFirstDescendantByKind(
                SyntaxKind.ArrowFunction,
            );
            const offFn = offProperty?.getFirstDescendantByKind(
                SyntaxKind.ArrowFunction,
            );
            const featureName = nameProperty
                ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
                ?.getText()
                .slice(1, -1);

            if (featureName !== processingFeatureName) {
                return;
            }

            if (newFeatureState === 'on') {
                node.replaceWithText(onFn?.getBody()?.getText() ?? '');
            }

            if (newFeatureState === 'off') {
                node.replaceWithText(offFn?.getBody()?.getText() ?? '');
            }
        }
    });
});

project.save();
