import {
    Popover as HPopover,
    PopoverButton,
    PopoverPanel,
} from '@headlessui/react';
import { memo, ReactNode } from 'react';
import { DropdownDirection } from '@/shared/types/ui';

import { classNames } from '@/shared/lib/classNames/classNames';
import popupCls from '../../styles/popup.module.scss';
import cls from './Popover.module.scss';

interface PopoverProps {
    className?: string;
    direction?: DropdownDirection;
    trigger?: ReactNode;
    children: ReactNode;
}

export const Popover = memo((props: PopoverProps) => {
    const { children, className, direction = 'bottom start', trigger } = props;

    return (
        <HPopover
            className={classNames(cls.Popover, {}, [className, popupCls.popup])}
        >
            <PopoverButton as="div" className={popupCls.trigger}>
                {trigger}
            </PopoverButton>
            <PopoverPanel
                anchor={direction}
                className={classNames(cls.panel, {}, [])}
            >
                {children}
            </PopoverPanel>
        </HPopover>
    );
});
