/*  eslint-disable max-len */

import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { Page } from 'shared/ui/Page/Page';
import { fetchNextArticlePage } from 'pages/ArticlesPage/model/service/fetchNextArticlePage/fetchNextArticlePage';
import { fetchArticlesList } from '../../model/service/fetchArticleList/fetchArticleList';
import { getArticlePageIsLoading, getArticlePageView } from '../../model/selectors/getArticlePageSelector';
import cls from './ArticlesPage.module.scss';
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slice/acticlesPageSlice';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducerList = {
  articlePage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlePageIsLoading);
  const view = useSelector(getArticlePageView);

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);

  const onLoadNextPage = useCallback(() => {
    dispatch(fetchNextArticlePage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(articlesPageActions.initState());
    dispatch(fetchArticlesList({
      page: 1,
    }));
  });

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page
        className={classNames(cls.ArticlesPage, {}, [className])}
        onScrollEnd={onLoadNextPage}
      >
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList
          isLoading={isLoading}
          view={view}
          articles={articles}
        />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
