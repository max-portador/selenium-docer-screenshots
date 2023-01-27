import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, memo } from 'react';
import cls from './Button.module.scss';

export enum ButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outline_red',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',

}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
    theme?: ButtonTheme;
    isSquare?: boolean;
    size?: ButtonSize;
    disabled?: boolean
}

const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = ButtonTheme.OUTLINE,
        isSquare,
        disabled,
        size = ButtonSize.M,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: isSquare,
        [cls.disabled]: disabled,
    };

    const additionalCN: string[] = [
        className || '',
        cls[theme],
        cls[size],
    ];

    return (
        <button
            type="button"
            className={classNames(cls.button, mods, additionalCN)}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});

export { Button };
