import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/deprecated/Icon';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    { view: ArticleView.SMALL, icon: ListIcon },
    { view: ArticleView.BIG, icon: TiledIcon },
];

export const ArticleViewSelector = memo(
    ({ className, view, onViewClick }: ArticleViewSelectorProps) => {
        const onClick = (value: ArticleView) => () => {
            onViewClick?.(value);
        };

        return (
            <div className={className}>
                {viewTypes.map((item) => (
                    <Button
                        key={item.view}
                        theme={ButtonTheme.CLEAR}
                        onClick={onClick(item.view)}
                    >
                        <Icon
                            Svg={item.icon}
                            className={classNames('', {
                                [cls.notSelected]: item.view !== view,
                            })}
                            width={24}
                            height={24}
                        />
                    </Button>
                ))}
            </div>
        );
    },
);
