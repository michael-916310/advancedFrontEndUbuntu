import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import {
    AppLink as AppLinkDepricated,
    AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../../model/types/sidebar';
import cls from './Sidebaritem.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface SidebaritemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

const Sidebaritem = memo(({ item, collapsed }: SidebaritemProps) => {
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <AppLink
                    to={item.path}
                    className={classNames(cls.item, {
                        [cls.collapsed]: collapsed,
                    })}
                >
                    <Icon Svg={item.Icon} height={32} width={32} />
                    <span className={cls.link}>{t(item.text)}</span>
                </AppLink>
            }
            off={
                <AppLinkDepricated
                    theme={AppLinkTheme.SECONDARY}
                    to={item.path}
                    className={classNames(cls.item, {
                        [cls.collapsed]: collapsed,
                    })}
                >
                    <item.Icon className={cls.icon} />
                    <span className={cls.link}>{t(item.text)}</span>
                </AppLinkDepricated>
            }
        />
    );
});

export { Sidebaritem };
