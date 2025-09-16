import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
  getArticlePageHasMore,
  getArticlePageIsLoading,
  getArticlePageNum,
} from '../../selectors/getArticlePageSelector';
import { articlesPageActions } from '../../slice/acticlesPageSlice';
import { fetchArticlesList } from '../../service/fetchArticleList/fetchArticleList';

export const fetchNextArticlePage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('articlePage/fetchNextArticlePage', async (props, thunkApi) => {
  const {
    getState,
    dispatch,
  } = thunkApi;

  const hasMore = getArticlePageHasMore(getState());
  const page = getArticlePageNum(getState());
  const isLoading = getArticlePageIsLoading(getState());

  if (hasMore && !isLoading) {
    dispatch(articlesPageActions.setPage(page + 1));
    dispatch(fetchArticlesList({}));
  }
});
