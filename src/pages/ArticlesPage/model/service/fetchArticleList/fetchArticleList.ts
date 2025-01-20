import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getArticlePageLimit } from 'pages/ArticlesPage/model/selectors/getArticlePageSelector';

interface fetchArticlesListProps {
    page?: number
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    fetchArticlesListProps,
    ThunkConfig<string>
>('articlePage/fetchArticlesList', async (props, thunkApi) => {
  const {
    rejectWithValue,
    extra,
    getState,
  } = thunkApi;
  const { page = 1 } = props;
  const limit = getArticlePageLimit(getState());

  try {
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _expand: 'user',
        _limit: limit,
        _page: page,
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
