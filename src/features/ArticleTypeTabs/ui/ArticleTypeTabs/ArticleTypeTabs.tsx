import { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import {
    TabItem as TabItemDeprecated,
    Tabs as TabsDeprecated,
} from '@/shared/ui/deprecated/Tabs';
import { ArticleType } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (value: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const { className, value, onChangeType } = props;

    const tabs = useMemo<TabItemDeprecated[]>(
        () => [
            { value: ArticleType.ALL, content: 'ALL' },
            { value: ArticleType.IT, content: 'IT' },
            { value: ArticleType.ECONOMICS, content: 'ECONOMICS' },
            { value: ArticleType.SCIENCE, content: 'SCIENCE' },
        ],
        [],
    );

    const onTabClick = useCallback(
        (value: TabItemDeprecated) => {
            onChangeType(value.value as ArticleType);
        },
        [onChangeType],
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Tabs
                    direction="column"
                    tabs={tabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={classNames('', {}, [className])}
                />
            }
            off={
                <TabsDeprecated
                    tabs={tabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={classNames('', {}, [className])}
                />
            }
        />
    );
});
