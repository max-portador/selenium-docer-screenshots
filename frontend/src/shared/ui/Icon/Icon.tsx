import React, { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    SVG: React.VFC<React.SVGProps<SVGSVGElement>>
}

const Icon: FC<IconProps> = memo((props: IconProps) => {
    const {
        className,
        SVG,
    } = props;
    return (
        <SVG className={classNames(cls.Icon, {}, [className])} />
    );
});

export { Icon };
