import { createRoot } from 'react-dom/client';

import './shared/config/i18n/i18n';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import App from '@/app/App';
import ErrorBoundary from '@/app/providers/ErrorBoundary/ui/ErrorBoundary';

import '@/app/styles/index.scss';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ForceUpdateProvider } from '@/shared/lib/render/forceUpdate';

const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'Контейнер root  не найден, не удалось ымрнтировать рекат-приложение',
    );
}

const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ForceUpdateProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ForceUpdateProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
export { Theme } from '@/shared/const/theme';
