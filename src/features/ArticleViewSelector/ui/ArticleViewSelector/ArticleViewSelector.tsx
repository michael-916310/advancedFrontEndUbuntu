import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';

import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Icon as IcomDeprecarted } from '@/shared/ui/deprecated/Icon';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => TiledIcon,
            off: () => TiledIconDeprecated,
        }),
    },
    {
        view: ArticleView.BIG,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListIcon,
            off: () => ListIconDeprecated,
        }),
    },
];

export const ArticleViewSelector = memo(
    ({ className, view, onViewClick }: ArticleViewSelectorProps) => {
        const onClick = (value: ArticleView) => () => {
            onViewClick?.(value);
        };

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card
                        border="partial"
                        className={classNames(
                            cls.ArticleViewSelectorRedesigned,
                            {},
                            [className],
                        )}
                    >
                        <HStack gap="8">
                            {viewTypes.map((item) => (
                                <Icon
                                    clickable
                                    key={item.view}
                                    onClick={onClick(item.view)}
                                    Svg={item.icon}
                                    className={classNames('', {
                                        [cls.notSelected]: item.view !== view,
                                    })}
                                />
                            ))}
                        </HStack>
                    </Card>
                }
                off={
                    <div
                        className={classNames(cls.ArticleViewSelector, {}, [
                            className,
                        ])}
                    >
                        {viewTypes.map((item) => (
                            <ButtonDeprecated
                                key={item.view}
                                theme={ButtonTheme.CLEAR}
                                onClick={onClick(item.view)}
                            >
                                <IcomDeprecarted
                                    Svg={item.icon}
                                    className={classNames('', {
                                        [cls.notSelected]: item.view !== view,
                                    })}
                                    width={24}
                                    height={24}
                                />
                            </ButtonDeprecated>
                        ))}
                    </div>
                }
            />
        );
    },
);
