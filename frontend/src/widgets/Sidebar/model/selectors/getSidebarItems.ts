import { SidebarItemType } from 'widgets/Sidebar/model/types/sidebar';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/main-20-20.svg';

export const getSidebarItems = () => {
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: RoutePath.main,
            Icon: MainIcon,
            text: 'Главная страница',
        },
    ];

    return sidebarItemsList;
}
