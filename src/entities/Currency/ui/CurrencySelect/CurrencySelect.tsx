import { memo, useCallback } from 'react';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Currency } from '../../model/types/currency';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
];

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readOnly?: boolean;
}

const CurrencySelect = memo(
    ({ className, value, onChange, readOnly }: CurrencySelectProps) => {
        const onHandleChange = useCallback(
            (value: string) => {
                onChange?.(value as Currency);
            },
            [onChange],
        );

        const props = {
            className,
            defaultValue: 'Укажите вылюту',
            label: 'Укажите вылюту',
            items: options,
            onChange: onHandleChange,
            readonly: readOnly,
            value,
            direction: 'top start' as const,
        };

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<ListBox {...props} />}
                off={<ListBoxDeprecated {...props} />}
            />
        );
    },
);

export { CurrencySelect };
