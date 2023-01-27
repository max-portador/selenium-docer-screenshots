import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text, TextTheme, TextSize } from 'shared/ui/Text';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

const Navbar = memo(({ className }: NavbarProps) => {

    return (
        <header className={classNames(cls.navbar, {}, [className])}>
            <Text
                size={TextSize.S}
                className={cls.appName}
                title={'Selenium Screenshoter'}
                theme={TextTheme.INVERTED}
            />
        </header>
    );


});

export { Navbar };
