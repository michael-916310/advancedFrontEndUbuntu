import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ArticleSortField, ArticleType } from 'entities/Article';
import { SortOrder } from 'shared/types';
import { getArticlePageInited } from '../../../model/selectors/getArticlePageSelector';
import { fetchArticlesList } from '../../../model/service/fetchArticleList/fetchArticleList';
import { articlesPageActions } from '../../slice/acticlesPageSlice';

export const initArticlePage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('articlePage/initArticlePage', async (searchParams, thunkApi) => {
  const {
    getState,
    dispatch,
  } = thunkApi;
  const inited = getArticlePageInited(getState());

  if (!inited) {
    const orderFromUrl = searchParams.get('order') as SortOrder;
    const sortFromUrl = searchParams.get('sort') as ArticleSortField;
    const searchFromUrl = searchParams.get('search');
    const typeFromUrl = searchParams.get('type') as ArticleType;

    if (orderFromUrl) {
      dispatch(articlesPageActions.setOrder(orderFromUrl));
    }
    if (sortFromUrl) {
      dispatch(articlesPageActions.setSort(sortFromUrl));
    }
    if (searchFromUrl) {
      dispatch(articlesPageActions.setSearch(searchFromUrl));
    }
    if (typeFromUrl) {
      dispatch(articlesPageActions.setType(typeFromUrl));
    }

    dispatch(articlesPageActions.initState());
    dispatch(fetchArticlesList({}));
  }
});
