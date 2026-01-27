import { CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
}

const Skeleton = memo(({ className, border, height, width }: SkeletonProps) => {
    const style: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };

    return (
        <div
            style={style}
            className={classNames(cls.Skeleton, {}, [className])}
        />
    );
});

export { Skeleton };
