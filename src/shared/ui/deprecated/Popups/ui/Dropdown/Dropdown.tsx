import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import { DropdownDirection } from '@/shared/types/ui';
import { AppLink } from '@/shared/ui/deprecated/AppLink/AppLink';

import cls from './Dropdown.module.scss';
import popupCls from '../../styles/popup.module.scss';

export interface DropdownItem {
    content?: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    direction?: DropdownDirection;
    items?: DropdownItem[];
    trigger?: ReactNode;
}

/**
 *  @deprecated
 */
export function Dropdown(props: DropdownProps) {
    const { className, direction = 'bottom start', trigger, items } = props;
    return (
        <Menu
            as="div"
            className={classNames(cls.Dropdown, {}, [
                className,
                popupCls.popup,
            ])}
        >
            <MenuButton className={popupCls.trigger}>{trigger}</MenuButton>
            <MenuItems anchor={direction} className={cls.menu}>
                {items?.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            className={classNames(cls.item, {
                                [popupCls.active]: active,
                            })}
                            disabled={item.disabled}
                            onClick={item?.onClick}
                            type="button"
                        >
                            {item.content}
                        </button>
                    );
                    if (item.href) {
                        return (
                            <MenuItem
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                                key={`dropdown-key-${index}`}
                            >
                                {content}
                            </MenuItem>
                        );
                    }
                    return (
                        <MenuItem
                            as={Fragment}
                            disabled={item.disabled}
                            key={`dropdown-key-${index}`}
                        >
                            {content}
                        </MenuItem>
                    );
                })}
            </MenuItems>
        </Menu>
    );
}
