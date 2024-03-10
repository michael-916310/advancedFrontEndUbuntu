import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

function Navbar({ className }: NavbarProps) {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={classNames(cls.links)}>
        {/* <AppLink */}
        {/*  theme={AppLinkTheme.SECONDARY} */}
        {/*  to="/" */}
        {/*  className={cls.mainLink} */}
        {/* > */}
        {/*  {t('Главная страница')} */}
        {/* </AppLink> */}
        {/* <AppLink */}
        {/*  theme={AppLinkTheme.SECONDARY} */}
        {/*  to="/about" */}
        {/*  className={cls.about} */}
        {/* > */}
        {/*  {t('О сайте')} */}
        {/* </AppLink> */}
      </div>
    </div>
  );
}

export { Navbar };
