import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getSeleniumParamsServices } from '../model/selectors/seleniumParamsSelectors';
import { seleniumParamsActions } from '../model/slices/seleniumParametersSlice';
import { SeleniumService } from '../model/types/seleniumParameters';
import cls from './CheckBox.module.scss'

const services: SeleniumService[] = ['ventusky', 'gismeteo']

export const CheckBox = () => {
    const dispatch = useAppDispatch();
    const selectedServices = useSelector(getSeleniumParamsServices)

    const handleChange = (item: SeleniumService) => {
        let newSelectedItems = [...selectedServices];
        if (newSelectedItems.includes(item)) {
            newSelectedItems = newSelectedItems.filter((selectedItem) => selectedItem !== item);
        } else {
            newSelectedItems.push(item);
        }
        dispatch(seleniumParamsActions.setServices(newSelectedItems))

    };

    return (
        <fieldset>
            <legend className={cls.header}>Выберите сервисы для запуска:</legend>
            <ul>
                {services.map((item) => (
                    <li key={item} className={cls.input}>
                        <input
                            type="checkbox"
                            id={item}
                            checked={selectedServices.includes(item)}
                            onChange={() => handleChange(item)}
                        />
                        <label className={cls.label} htmlFor={item}>{item}</label>
                    </li>
                ))}
            </ul>
        </fieldset>

    );
}