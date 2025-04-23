import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

import {
  ArticleSortField,
  ArticleSortSelector,
  ArticleType,
  ArticleTypeTabs,
  ArticleView,
  ArticleViewSelector,
} from 'entities/Article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { Card } from 'shared/ui/Card/Card';
import { SortOrder } from 'shared/types';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { fetchArticlesList } from '../../model/service/fetchArticleList/fetchArticleList';
import { articlesPageActions } from '../../model/slice/acticlesPageSlice';
import {
  getArticlePageOrder,
  getArticlePageSearch,
  getArticlePageSort,
  getArticlePageType,
  getArticlePageView,
} from '../../model/selectors/getArticlePageSelector';

import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageProps {
    className?: string;
}

export const ArticlesPageFilters = memo(({ className }: ArticlesPageProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const view = useSelector(getArticlePageView);
  const sort = useSelector(getArticlePageSort);
  const order = useSelector(getArticlePageOrder);
  const search = useSelector(getArticlePageSearch);
  const type = useSelector(getArticlePageType);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);

  const onChangeOrder = useCallback((value: SortOrder) => {
    dispatch(articlesPageActions.setOrder(value));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeSort = useCallback((value: ArticleSortField) => {
    dispatch(articlesPageActions.setSort(value));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeSearch = useCallback((value: string) => {
    dispatch(articlesPageActions.setSearch(value));
    dispatch(articlesPageActions.setPage(1));
    debouncedFetchData();
  }, [dispatch, debouncedFetchData]);

  const onChangeType = useCallback((value: ArticleType) => {
    dispatch(articlesPageActions.setType(value));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  return (
    <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input
          placeholder={t('Поиск')}
          onChange={onChangeSearch}
          value={search}
        />
      </Card>
      <ArticleTypeTabs className={cls.tabs} value={type} onChangeType={onChangeType} />
    </div>
  );
});
