import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import cls from './Button.module.scss';

export enum ThemeButton {
    CLEAR = 'clear'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    theme?: ThemeButton
}

const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const {
    className,
    theme,
    children,
    ...otherProps
  } = props;

  return (
    <button
      {...otherProps}
      type="button"
      className={classNames(cls.Button, {}, [className, cls[theme]])}
    >
      {children}
    </button>
  );
};

export { Button };
