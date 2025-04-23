/*  eslint-disable max-len */

import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleList } from 'entities/Article';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { Page } from 'widgets/Page/Page';
import { useSearchParams } from 'react-router-dom';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { fetchNextArticlePage } from '../../model/service/fetchNextArticlePage/fetchNextArticlePage';
import { initArticlePage } from '../../model/service/initArticlePage/initArticlePage';
import { getArticlePageIsLoading, getArticlePageView } from '../../model/selectors/getArticlePageSelector';
import cls from './ArticlesPage.module.scss';
import { articlesPageReducer, getArticles } from '../../model/slice/acticlesPageSlice';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducerList = {
  articlePage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlePageIsLoading);
  const view = useSelector(getArticlePageView);
  const [searchParams] = useSearchParams();

  const onLoadNextPage = useCallback(() => {
    dispatch(fetchNextArticlePage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlePage(searchParams));
  });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        className={classNames(cls.ArticlesPage, {}, [className])}
        onScrollEnd={onLoadNextPage}
      >
        <ArticlesPageFilters />
        <ArticleList
          isLoading={isLoading}
          view={view}
          articles={articles}
          className={cls.list}
        />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
