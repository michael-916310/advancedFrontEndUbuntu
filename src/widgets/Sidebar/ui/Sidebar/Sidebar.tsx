import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useMemo, useState } from 'react';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { Sidebaritem } from '../Sidebaritem/Sidebaritem';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => setCollapsed((value) => !value);

  const sidebarItemsList = useSelector(getSidebarItems);

  const itemList = useMemo(() => sidebarItemsList.map((item) => (
    <Sidebaritem item={item} key={item.path} collapsed={collapsed} />
  )), [collapsed, sidebarItemsList]);

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
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

      <div className={cls.items}>
        {itemList}
      </div>

      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.lang} short={collapsed} />
      </div>
    </div>
  );
});

export { Sidebar };
