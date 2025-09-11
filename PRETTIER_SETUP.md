# Настройка Prettier для автоматического форматирования

## Что было настроено

1. **Конфигурация Prettier** (`.prettierrc`):

   - Одинарные кавычки
   - Точки с запятой
   - Ширина строки: 80 символов
   - Отступы: 2 пробела
   - Trailing commas для ES5

2. **Исключения** (`.prettierignore`):

   - node_modules
   - build/dist папки
   - Сгенерированные файлы
   - Логи и отчеты

3. **VS Code настройки** (`.vscode/settings.json`):

   - Автоматическое форматирование при сохранении
   - Prettier как форматтер по умолчанию
   - Автоисправление ESLint ошибок

4. **NPM скрипты** в `package.json`:
   - `npm run format` - форматировать все файлы
   - `npm run format:check` - проверить форматирование

## Как использовать

### Автоматическое форматирование в VS Code

1. Установите расширение "Prettier - Code formatter"
2. При сохранении файла (Ctrl+S) код будет автоматически отформатирован

### Ручное форматирование

```bash
# Отформатировать все файлы
npm run format

# Проверить форматирование без изменений
npm run format:check

# Отформатировать конкретный файл
npx prettier --write src/path/to/file.tsx
```

### Форматирование при коммите (опционально)

Можно добавить pre-commit hook для автоматического форматирования:

```bash
npm install --save-dev husky lint-staged
```

## Поддерживаемые форматы

- TypeScript (.ts, .tsx)
- JavaScript (.js, .jsx)
- JSON (.json)
- CSS (.css)
- SCSS (.scss)
- Markdown (.md)
