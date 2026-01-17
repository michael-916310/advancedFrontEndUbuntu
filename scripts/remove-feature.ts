import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';

const processingFeatureName = process.argv[2]; // example: isArticleEnabled
const newFeatureState = process.argv[3]; // example: on | off

const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

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
            child.getText() === toggleFunctionName
        ) {
            isToggleFeatures = true;
        }
    });

    return isToggleFeatures;
}

function isToggleComponent(node: Node) {
    const Identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

    return Identifier?.getText() === toggleComponentName;
}

const getAttributeNodeByName = (
    jsxAttributes: JsxAttribute[],
    name: string,
) => {
    return jsxAttributes.find((node) => node.getName() === name);
};

const getReplacedComponent = (attribute?: JsxAttribute) => {
    const value = attribute
        ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
        ?.getExpression()
        ?.getText();

    if (value?.startsWith('(')) {
        return value.slice(1, -1);
    }

    return value;
};

const replaceToggleFunction = (node: Node) => {
    const objectOptions = node.getFirstDescendantByKind(
        SyntaxKind.ObjectLiteralExpression,
    );

    if (!objectOptions) {
        return;
    }

    const onProperty = objectOptions.getProperty('on');
    const offProperty = objectOptions.getProperty('off');
    const nameProperty = objectOptions.getProperty('name');

    const onFn = onProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
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
};

const replaceComponent = (node: Node) => {
    const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

    const onAttribute = getAttributeNodeByName(attributes, 'on');
    const offAttribute = getAttributeNodeByName(attributes, 'off');

    const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');
    const featureName = featureNameAttribute
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        ?.slice(1, -1);

    if (featureName !== processingFeatureName) return;

    const offValue = getReplacedComponent(offAttribute);
    const onValue = getReplacedComponent(onAttribute);

    if (newFeatureState === 'on' && onValue) {
        node.replaceWithText(onValue);
    }

    if (newFeatureState === 'off' && offValue) {
        node.replaceWithText(offValue);
    }
};

sourceFiles.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            replaceToggleFunction(node);
        }
        if (
            node.isKind(SyntaxKind.JsxSelfClosingElement) &&
            isToggleComponent(node)
        ) {
            replaceComponent(node);
        }
    });
});

project.save();
