import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Select, SelectOption } from '@/shared/ui/Select';
import { SortOrder } from '@/shared/types/sort';
import cls from './ArticleSortSelector.module.scss';
import { ArticleSortField } from '@/entities/Article';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (value: SortOrder) => void;
  onChangeSort: (value: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const {
    className, sort, order, onChangeSort, onChangeOrder,
  } = props;
  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
    {
      value: 'asc',
      content: t('возрастанию'),
    },
    {
      value: 'desc',
      content: t('убыванию'),
    },
  ], [t]);

  const orderFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
    {
      value: ArticleSortField.CREATED,
      content: t('дате создания'),
    },
    {
      value: ArticleSortField.TITLE,
      content: t('названию'),
    },
    {
      value: ArticleSortField.VIEW,
      content: t('просмотру'),
    },
  ], [t]);

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <Select<ArticleSortField>
        options={orderFieldOptions}
        label={t('Сортировать по')}
        value={sort}
        onChange={onChangeSort}
      />
      <Select
        className={cls.order}
        options={orderOptions}
        label={t('по')}
        value={order}
        onChange={onChangeOrder}
      />
    </div>
  );
});
