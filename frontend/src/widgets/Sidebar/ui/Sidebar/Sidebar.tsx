import { memo, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(true);
    const sidebarItemsList = useSelector(getSidebarItems);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(
        () => sidebarItemsList.map((item) => (
            <SidebarItem
                key={item.path}
                item={item}
                collapsed={collapsed}
            />
        )),
        [sidebarItemsList, collapsed],
    );

    return (
        <aside
            data-testid="sidebar"
            className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}
        >
            <Button
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={cls.collapseBtn}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                isSquare
                size={ButtonSize.L}
            >
                {collapsed ? '<' : '>'}
            </Button>
            <VStack role="navigation" gap={8} className={cls.items}>
                {itemsList}
            </VStack>
            <div className={cls.switchers}>
                <ThemeSwitcher />
            </div>
        </aside>
    );
});

export { Sidebar };
