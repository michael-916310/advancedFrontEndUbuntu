import { Link, LinkProps } from 'react-router-dom';
import { memo, PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
}

const AppLink = memo((props: PropsWithChildren<AppLinkProps>) => {
    const {
        to,
        className,
        children,
        variant = 'primary',
        ...otherProps
    } = props;

    return (
        <Link
            to={to}
            className={classNames(cls.AppLink, {}, [className, cls[variant]])}
            {...otherProps}
        >
            {children}
        </Link>
    );
});

export { AppLink };
