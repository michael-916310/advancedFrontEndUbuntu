import { memo, useCallback, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from '../../model/types/article';

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (value: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props;

  const tabs = useMemo<TabItem[]>(() => [
    { value: ArticleType.ALL, content: 'ALL' },
    { value: ArticleType.IT, content: 'IT' },
    { value: ArticleType.ECONOMICS, content: 'ECONOMICS' },
    { value: ArticleType.SCIENCE, content: 'SCIENCE' },
  ], []);

  const onTabClick = useCallback((value: TabItem) => {
    onChangeType(value.value as ArticleType);
  }, [onChangeType]);

  return (
    <Tabs
      tabs={tabs}
      value={value}
      onTabClick={onTabClick}
      className={classNames('', {}, [className])}
    />
  );
});
