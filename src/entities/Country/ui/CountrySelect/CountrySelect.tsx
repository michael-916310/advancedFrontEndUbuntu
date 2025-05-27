import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { Country } from '../../model/types/country';

const options = [
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
];

interface CountrySelectProps {
    className?: string
    value?: Country;
    onChange?: (value: Country) => void;
    readOnly?: boolean
}

const CountrySelect = memo(({
  className, value, onChange, readOnly,
}: CountrySelectProps) => {
  const { t } = useTranslation();

  const onHandleChange = useCallback((value: string) => {
    onChange?.(value as Country);
  }, [onChange]);

  return (
    <ListBox
      className={classNames('', {}, [className])}
      defaultValue={t('Укажите страну')}
      label={t('Укажите страну')}
      items={options}
      value={value}
      onChange={onHandleChange}
      readonly={readOnly}
      direction="top start"
    />
  );
});

export { CountrySelect };
