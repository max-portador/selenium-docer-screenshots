import React, { Fragment, memo, ReactNode } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button';
import cls from './ListBox.module.scss';

export interface ListBoxItem {
    value: string,
    content: ReactNode,
    disabled?: boolean,
}

interface ListBoxProps {
    className?: string,
    onChange: <T extends string>(val: T) => void
    items?: ListBoxItem[],
    value?: string,
    defaultValue?: string,
}

export const ListBox = memo((props: ListBoxProps) => {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
    } = props;

    return (
        <HListbox
            as="div"
            className={classNames(cls.ListBox, {}, [className])}
            value={value}
            onChange={onChange}
        >
            <HListbox.Button as={Fragment}>
                <Button className={cls.trigger}>
                    {value ?? defaultValue}
                </Button>
            </HListbox.Button>
            <HListbox.Options className={cls.options}>
                {items?.map((item) => (
                    <HListbox.Option
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled}
                        as={Fragment}
                    >
                        {({ active, selected }) => (
                            <li className={classNames(
                                cls.item,
                                {
                                    [cls.active]: active,
                                    [cls.disabled]: item.disabled,
                                },
                            )}
                            >
                                {selected && '!!!'}
                                {item.content}
                            </li>
                        )}

                    </HListbox.Option>
                ))}
            </HListbox.Options>
        </HListbox>

    );
});
