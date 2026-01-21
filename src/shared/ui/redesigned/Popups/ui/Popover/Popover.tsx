import {
    Popover as HPopover,
    PopoverButton,
    PopoverPanel,
} from '@headlessui/react';
import { memo, ReactNode, useEffect, useState } from 'react';
import { DropdownDirection } from '@/shared/types/ui';

import { classNames } from '@/shared/lib/classNames/classNames';
import popupCls from '../../styles/popup.module.scss';
import cls from './Popover.module.scss';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface PopoverProps {
    className?: string;
    direction?: DropdownDirection;
    trigger?: ReactNode;
    children: ReactNode;
}

export const Popover = memo((props: PopoverProps) => {
    const { children, className, direction = 'bottom start', trigger } = props;
    const [isOpen, setIsOpen] = useState(false);

    const { theme } = useTheme();

    useEffect(() => {
        if (isOpen && theme) {
            const portal = document.querySelector('#headlessui-portal-root');
            if (portal) {
                portal.classList.add(theme);
            }
        }
    }, [isOpen, theme]);

    return (
        <HPopover
            className={classNames(cls.Popover, {}, [className, popupCls.popup])}
        >
            {({ open }) => {
                setIsOpen(open);
                return (
                    <>
                        <PopoverButton as="div" className={popupCls.trigger}>
                            {trigger}
                        </PopoverButton>
                        <PopoverPanel
                            anchor={direction}
                            className={classNames(cls.panel, {}, [])}
                        >
                            {children}
                        </PopoverPanel>
                    </>
                );
            }}
        </HPopover>
    );
});
