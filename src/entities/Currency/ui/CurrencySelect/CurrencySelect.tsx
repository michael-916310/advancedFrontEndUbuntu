import { memo, useCallback } from 'react';
import { ListBox } from '@/shared/ui/deprecated/Popups';
import { Currency } from '../../model/types/currency';

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

        return (
            <ListBox
                className={className}
                defaultValue="Укажите вылюту"
                label="Укажите вылюту"
                items={options}
                onChange={onHandleChange}
                readonly={readOnly}
                value={value}
                direction="top start"
            />
        );
    },
);

export { CurrencySelect };
