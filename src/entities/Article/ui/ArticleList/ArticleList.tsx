import React, { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Text, TextSize } from '@/shared/ui/Text/Text';
import { PAGE_ID } from '@/shared/const/constant';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { Article } from '../../model/types/article';
import cls from './ArticleList.module.scss';
import { ArticleView } from '../../model/consts/consts';

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((_, index) => <ArticleListItemSkeleton key={index} className={cls.card} view={view} />);

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className, articles, isLoading, view = ArticleView.SMALL, target,
  } = props;
  const { t } = useTranslation();

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Статьи не найдены')} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.map((article) => (
        <ArticleListItem
          article={article}
          view={view}
          target={target}
          key={article.id}
          className={cls.card}
        />
      ))}
      {isLoading && getSkeletons(view)}
    </div>
  );
});
