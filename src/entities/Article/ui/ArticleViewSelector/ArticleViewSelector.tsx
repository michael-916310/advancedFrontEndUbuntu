import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '../../model/consts/consts';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  { view: ArticleView.SMALL, icon: ListIcon },
  { view: ArticleView.BIG, icon: TiledIcon },
];

export const ArticleViewSelector = memo(({
  className,
  view,
  onViewClick,
}: ArticleViewSelectorProps) => {
  const onClick = (value: ArticleView) => () => {
    onViewClick?.(value);
  };

  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((item) => (
        <Button
          key={item.view}
          theme={ButtonTheme.CLEAR}
          onClick={onClick(item.view)}
        >
          <Icon
            Svg={item.icon}
            className={classNames('', { [cls.notSelected]: item.view !== view })}
          />
        </Button>
      ))}
    </div>
  );
});
