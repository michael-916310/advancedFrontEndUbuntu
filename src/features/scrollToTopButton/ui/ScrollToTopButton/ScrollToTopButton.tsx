import { FC, useCallback } from 'react';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { classNames } from '@/shared/lib/classNames/classNames';

import CircleIcon from '@/shared/assets/icons/circle-up.svg';

interface ScrollToTopButtonProps {
    className?: string;
}

export const ScrollToTopButton: FC<ScrollToTopButtonProps> = ({
    className,
}) => {
    const onClick = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <Icon
            className={classNames('', {}, [className])}
            clickable
            height={32}
            onClick={onClick}
            Svg={CircleIcon}
            width={32}
        />
    );
};
