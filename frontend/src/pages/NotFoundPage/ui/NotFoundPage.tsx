import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
    className?: string;
}

const NotFoundPage = ({ className }: NotFoundPageProps) => {

    return (
        <Page className={classNames(cls.notFoundPage, {}, [className])}>
            Страница не найдена
        </Page>
    );
};

export default NotFoundPage;
