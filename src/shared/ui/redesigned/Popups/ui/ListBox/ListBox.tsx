import {
    Listbox as HListBox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import { Fragment, ReactNode, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import cls from './ListBox.module.scss';
import { DropdownDirection } from '../../../../../types/ui';
import popupCls from '../../styles/popup.module.scss';
import { usePortalTheme } from '@/shared/ui/redesigned/Popups/hooks/usePortalTheme';

export interface ListBoxItem<T extends string> {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps<T extends string> {
    items?: Array<ListBoxItem<T>>;
    className?: string;
    value?: T;
    defaultValue?: string;
    onChange: (value: T) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const {
        className,
        defaultValue,
        direction = 'bottom start',
        items,
        onChange,
        value,
        readonly,
        label,
    } = props;
    const [isOpen, setIsOpen] = useState(false);

    usePortalTheme(isOpen);

    const selectedItem = useMemo(
        () => items?.find((item) => item.value === value),
        [items, value],
    );

    return (
        <HStack gap="4">
            {label && <span>{`${label}>`}</span>}
            <HListBox
                as="div"
                className={classNames(cls.ListBox, {}, [
                    className,
                    popupCls.popup,
                ])}
                disabled={readonly}
                value={value}
                onChange={onChange}
            >
                {({ open }) => {
                    setIsOpen(open);
                    return (
                        <>
                            <ListboxButton
                                className={cls.trigger}
                                disabled={readonly}
                            >
                                <span
                                    className={classNames(
                                        cls.spanButton,
                                        { [cls.disabled]: readonly },
                                        [],
                                    )}
                                >
                                    {selectedItem?.content ?? defaultValue}
                                </span>
                            </ListboxButton>
                            <ListboxOptions
                                anchor={direction}
                                className={classNames(cls.options, {}, [
                                    popupCls.menu,
                                ])}
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
                                                className={classNames(
                                                    cls.item,
                                                    {
                                                        [popupCls.active]:
                                                            active,
                                                        [popupCls.disabled]:
                                                            item.disabled,
                                                        [popupCls.selected]:
                                                            selected,
                                                    },
                                                )}
                                            >
                                                {item.content}
                                            </li>
                                        )}
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </>
                    );
                }}
            </HListBox>
        </HStack>
    );
}
