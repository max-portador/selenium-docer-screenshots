import React, { ReactNode, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card';
import { CardTheme } from 'shared/ui/Card/Card';
import cls from './Tabs.module.scss';

export interface TabItem<T extends string> {
    value: T,
    content: ReactNode
}

interface TabsProps<T extends string> {
    className?: string,
    tabs: TabItem<T>[],
    value: string,
    onTabClick: (val: T) => void
}

const Tabs = <T extends string>(props: TabsProps<T>) => {
    const {
        className,
        tabs,
        onTabClick,
        value,
    } = props;

    const handleClick = useCallback((tab: TabItem<T>) => {
        onTabClick(tab.value as T);
    }, [onTabClick]);

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    key={tab.value}
                    className={cls.tab}
                    onClick={() => handleClick(tab)}
                    theme={value === tab.value ? CardTheme.NORMAL : CardTheme.OUTLINED}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
};

export { Tabs };
