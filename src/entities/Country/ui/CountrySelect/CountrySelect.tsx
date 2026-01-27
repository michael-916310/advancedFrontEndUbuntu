import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Country } from '../../model/types/country';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

const options = [
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
];

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readOnly?: boolean;
}

const CountrySelect = memo(
    ({ className, value, onChange, readOnly }: CountrySelectProps) => {
        const { t } = useTranslation();

        const onHandleChange = useCallback(
            (value: string) => {
                onChange?.(value as Country);
            },
            [onChange],
        );

        const props = {
            className: classNames('', {}, [className]),
            defaultValue: t('Укажите страну'),
            label: t('Укажите страну'),
            items: options,
            value,
            onChange: onHandleChange,
            readonly: readOnly,
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

export { CountrySelect };
