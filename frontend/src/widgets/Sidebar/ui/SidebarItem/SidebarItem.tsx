import React, { FC } from 'react';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { classNames } from 'shared/lib/classNames/classNames';
import { SidebarItemType } from 'widgets/Sidebar/model/types/sidebar';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({ item, collapsed }: SidebarItemProps) => {
    return (
        <AppLink
            theme={AppLinkTheme.SECONDARY}
            className={classNames(cls.item, { [cls.collapsed]: collapsed })}
            to={item.path}
        >
            <item.Icon className={cls.icon} />
            <span className={cls.link}>
                {item.text}
            </span>
        </AppLink>
    );
};

export { SidebarItem };
