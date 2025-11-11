import { lazy, Suspense } from 'react';
import { ArticleRatingProps } from './ArticleRating';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

const ArticleRatingLazy = lazy(
  () => import('./ArticleRating'),
);

export const ArticleRatingAsync = (props: ArticleRatingProps) => {
  return (
    <Suspense fallback={<Skeleton height="120px" width="100%" />}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <ArticleRatingLazy {...props} />
    </Suspense>
  );
};
