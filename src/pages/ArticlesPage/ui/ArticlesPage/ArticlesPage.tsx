/*  eslint-disable max-len */

import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { initArticlePage } from '../../model/service/initArticlePage/initArticlePage';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { fetchNextArticlePage } from '../../model/service/fetchNextArticlePage/fetchNextArticlePage';
import cls from './ArticlesPage.module.scss';
import { articlesPageReducer } from '../../model/slice/acticlesPageSlice';
import { ArticleInfiniteList } from '../../ui/ArticleInfiniteList/ArticleInfiniteList';
import { Page } from '@/widgets/Page';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '@/pages/ArticlesPage/ui/ViewSelectorContainer/ViewSelectorContainer';
import { FilterContainer } from '@/pages/ArticlesPage/ui/FilterContainer/FilterContainer';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducerList = {
    articlePage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const onLoadNextPage = useCallback(() => {
        dispatch(fetchNextArticlePage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlePage(searchParams));
    });

    const context = (
        <ToggleFeatures
            feature="isArticleRatingEnabled"
            on={
                <StickyContentLayout
                    left={<ViewSelectorContainer />}
                    right={<FilterContainer />}
                    content={
                        <Page
                            className={classNames(
                                cls.ArticlesPageRedesign,
                                {},
                                [className],
                            )}
                            data-testid="ArticlesPage"
                            onScrollEnd={onLoadNextPage}
                        >
                            <ArticleInfiniteList className={cls.list} />
                            <ArticlePageGreeting />
                        </Page>
                    }
                />
            }
            off={
                <Page
                    className={classNames(cls.ArticlesPage, {}, [className])}
                    data-testid="ArticlesPage"
                    onScrollEnd={onLoadNextPage}
                >
                    <ArticlesPageFilters />
                    <ArticleInfiniteList className={cls.list} />
                    <ArticlePageGreeting />
                </Page>
            }
        />
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            {context}
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
