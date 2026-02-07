import { FC } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ScrollToolbar.module.scss';
import { ScrollToTopButton } from '@/features/scrollToTopButton/ui';

interface ScrollToolbarProps {
    className?: string;
}

export const ScrollToolbar: FC<ScrollToolbarProps> = (props) => {
    const { className } = props;

    return (
        <VStack
            align="center"
            className={classNames(cls.ScrollToolbar, {}, [className])}
            justify="center"
            max
        >
            <ScrollToTopButton />
        </VStack>
    );
};
