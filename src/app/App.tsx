import React, { memo, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserMounted, initAuthData } from '@/entities/User';
import { AppRouter } from './providers/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { PageLoader } from '@/widgets/PageLoader';
import { useAppToolbar } from './lib/useAppToolbar';
import { withTheme } from './providers/ThemeProvider';

const App = memo(() => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const mounted = useSelector(getUserMounted);

    const toolbar = useAppToolbar();

    useEffect(() => {
        if (!mounted) {
            dispatch(initAuthData());
        }
    }, [dispatch, mounted]);

    if (!mounted) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <div id="app" className={classNames('app', {}, [theme])}>
                        <AppLoaderLayout />
                    </div>
                }
                off={<PageLoader />}
            />
        );
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <div id="app" className={classNames('app', {}, [theme])}>
                    <Suspense fallback="">
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            <AppRouter />
                        </div>
                    </Suspense>
                </div>
            }
            on={
                <div
                    id="app"
                    className={classNames('app_redesigned', {}, [theme])}
                >
                    <Suspense fallback="">
                        <MainLayout
                            header={<Navbar />}
                            content={<AppRouter />}
                            sidebar={<Sidebar />}
                            toolbar={toolbar}
                        />
                    </Suspense>
                </div>
            }
        />
    );
});

export default withTheme(App);
