import React, { CSSProperties, FC, useMemo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    size?: number;
    alt?: string;
    src?: string;
}

const Avatar: FC<AvatarProps> = (props) => {
    const {
        className,
        src,
        size,
        alt,
    } = props;

    const styles = useMemo<CSSProperties>(() => ({
        width: size || 100,
        height: size || 100,
    }), [size]);

    const mods: Mods = {};

    return (
        <img
            src={src}
            alt={alt}
            style={styles}
            className={classNames(cls.avatar, mods, [className])}
        />
    );
};

export { Avatar };
