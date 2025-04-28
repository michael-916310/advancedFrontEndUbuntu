import {
  Listbox as HListBox, ListboxButton, ListboxOption, ListboxOptions,
} from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';
import { Button } from '../Button/Button';
import cls from './ListBox.module.scss';

type DropdownDirection = 'top' | 'bottom';

export interface ListBoxItem {
    value: string;
    content: ReactNode,
    disabled?: boolean;
}

interface ListBoxProps {
    items?: Array<ListBoxItem>
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string
}

export function ListBox(props: ListBoxProps) {
  const {
    className, defaultValue, direction = 'bottom', items, onChange, value, readonly, label,
  } = props;

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}
      <HListBox
        as="div"
        className={classNames(cls.ListBox, {}, [className])}
        disabled={readonly}
        value={value}
        onChange={onChange}
      >

        <ListboxButton
          className={cls.trigger}
          disabled={readonly}
        >
          <Button disabled={readonly}>
            {value ?? defaultValue}
          </Button>
        </ListboxButton>
        <ListboxOptions
          anchor={`${direction} start`}
          className={classNames(cls.options, {}, [])}
        >
          {items?.map((item) => (
            <ListboxOption
              disabled={item.disabled}
              as={Fragment}
              key={item.value}
              value={item.value}
            >
              {({ selected, active }) => (
                <li
                  className={classNames(cls.item, {
                    [cls.active]: active,
                    [cls.disabled]: item.disabled,
                  })}
                >
                  {selected && '!!!'}
                  {item.content}
                </li>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </HListBox>
    </HStack>
  );
}
