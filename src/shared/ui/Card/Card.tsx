import { HTMLAttributes, memo, PropsWithChildren } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

import cls from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const Card = memo((props: PropsWithChildren<CardProps>) => {
  const { className, children, ...otherProps } = props;

  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={classNames(cls.Card, {}, [className])} {...otherProps}>
      {children}
    </div>
  );
});
