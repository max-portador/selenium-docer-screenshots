import React, { ChangeEvent, useMemo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
    value: T;
    content?: string
}

interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    suffix?: string;
    options?: SelectOption<T>[]
    value?: T
    onChange?: (value: T) => void
    readonly?: boolean
}

const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        className,
        label,
        suffix,
        options,
        value,
        onChange,
        readonly,
    } = props;

    const onChaneHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
    };

    const optionList = useMemo(() => options?.map(({ value, content }) => (
        <option className={cls.option} value={value} key={value}>
            {content ?? value}
        </option>
    )), [options]);

    const mods: Mods = {};

    return (
        <div className={classNames(cls.wrapper, mods, [className])}>
            {label && (
                <span className={cls.label}>
                    {`${label} `}
                </span>
            )}
            <select
                className={cls.select}
                onChange={onChaneHandler}
                value={value}
                disabled={readonly}
            >
                {optionList}
            </select>
            {suffix && (
                <span className={cls.suffix}>
                    {`${ suffix}`}
                </span>
            )}
        </div>
    );
};

export { Select };
