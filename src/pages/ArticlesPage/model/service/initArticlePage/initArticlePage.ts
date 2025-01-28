import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { articlesPageActions } from 'pages/ArticlesPage/model/slice/acticlesPageSlice';
import { fetchArticlesList } from 'pages/ArticlesPage/model/service/fetchArticleList/fetchArticleList';
import { getArticlePageInited } from 'pages/ArticlesPage/model/selectors/getArticlePageSelector';

export const initArticlePage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('articlePage/initArticlePage', async (props, thunkApi) => {
  const {
    getState,
    dispatch,
  } = thunkApi;
  const inited = getArticlePageInited(getState());

  if (!inited) {
    dispatch(articlesPageActions.initState());
    dispatch(fetchArticlesList({
      page: 1,
    }));
  }
});
