import { expect } from '@jest/globals';
import { TestAsyncThank } from '@/shared/lib/tests/TestAsyncThank/TestAsyncThank';
import { fetchArticlesList } from '../fetchArticleList/fetchArticleList';
import { fetchNextArticlePage } from './fetchNextArticlePage';

import '@testing-library/jest-dom';

jest.mock('../fetchArticleList/fetchArticleList');

describe('./fetchNextArticlePage.test', () => {
    test('Success', async () => {
        const thunk = new TestAsyncThank(fetchNextArticlePage, {
            articlePage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(4);
        expect(fetchArticlesList).toHaveBeenCalled();
    });

    test('No call', async () => {
        const thunk = new TestAsyncThank(fetchNextArticlePage, {
            articlePage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: false,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
