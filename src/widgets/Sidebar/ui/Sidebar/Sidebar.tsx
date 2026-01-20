import React, { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';

import { VStack } from '@/shared/ui/deprecated/Stack';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { Sidebaritem } from '../Sidebaritem/Sidebaritem';
import cls from './Sidebar.module.scss';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';

import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

interface SidebarProps {
    className?: string;
}

const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => setCollapsed((value) => !value);

    const sidebarItemsList = useSelector(getSidebarItems);

    const itemList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <Sidebaritem
                    item={item}
                    key={item.path}
                    collapsed={collapsed}
                />
            )),
        [collapsed, sidebarItemsList],
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <aside
                    data-testid="sidebar"
                    className={classNames(
                        cls.SidebarRedesigned,
                        { [cls.collapsed]: collapsed },
                        [className],
                    )}
                >
                    <AppLogo
                        className={cls.appLogo}
                        size={collapsed ? 30 : 50}
                    />
                    <VStack role="navigation" gap="8" className={cls.items}>
                        {itemList}
                    </VStack>
                    <Icon
                        clickable
                        data-testid="sidebar-toggle"
                        onClick={onToggle}
                        className={cls.collapseBtn}
                        Svg={ArrowIcon}
                    />
                </aside>
            }
            off={
                <aside
                    data-testid="sidebar"
                    className={classNames(
                        cls.Sidebar,
                        { [cls.collapsed]: collapsed },
                        [className],
                    )}
                >
                    <Button
                        data-testid="sidebar-toggle"
                        onClick={onToggle}
                        className={cls.collapseBtn}
                        theme={ButtonTheme.BACKGROUND_INVERTED}
                        size={ButtonSize.L}
                        square
                    >
                        {collapsed ? '>' : '<'}
                    </Button>

                    <VStack role="navigation" gap="8" className={cls.items}>
                        {itemList}
                    </VStack>

                    <div className={cls.switchers}>
                        <ThemeSwitcher />
                        <LangSwitcher className={cls.lang} short={collapsed} />
                    </div>
                </aside>
            }
        />
    );
});

export { Sidebar };
