import {
  Menu, MenuButton, MenuItem, MenuItems,
} from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';

import { Fragment, ReactNode } from 'react';
import { DropdownDirection } from 'shared/types/ui';
import { AppLink } from '../AppLink/AppLink';
import cls from './Dropdown.module.scss';

export interface DropdownItem {
    content?: ReactNode,
    disabled?: boolean;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    direction?: DropdownDirection;
    items?: DropdownItem[]
    trigger?: ReactNode;
}

export function Dropdown(props: DropdownProps) {
  const {
    className, direction = 'bottom start', trigger, items,
  } = props;
  return (
    <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
      <MenuButton className={cls.btn}>{trigger}</MenuButton>
      <MenuItems anchor={direction} className={cls.menu}>
        {items?.map((item) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              className={classNames(cls.item, { [cls.active]: active })}
              disabled={item.disabled}
              onClick={item?.onClick}
              type="button"
            >
              {item.content}
            </button>
          );
          if (item.href) {
            return (
              <MenuItem as={AppLink} to={item.href} disabled={item.disabled}>
                {content}
              </MenuItem>
            );
          }
          return (
            <MenuItem as={Fragment} disabled={item.disabled}>
              {content}
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}
