import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';

function MainPage() {
  const { t } = useTranslation();
  const [value, setValue] = React.useState('');

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div>
      {t('Главная страница')}
      <Input onChange={onChange} value={value} placeholder="Введите текст" />
    </div>
  );
}

export default MainPage;
