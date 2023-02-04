import { Button } from "shared/ui/Button"
import { Text } from "shared/ui/Text"
import { HStack } from "shared/ui/Stack"
import { Select } from "shared/ui/Select"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { getSeleniumParamsDays, getSeleniumParamsError, getSeleniumParamsServices, getSeleniumParamsStatus } from "../model/selectors/seleniumParamsSelectors"
import { startSelenium } from "../model/services/startSelenium"
import { seleniumParamsActions } from "../model/slices/seleniumParametersSlice"
import { CheckBox } from "./Checkbox"
import { useEffect } from "react"
import { ServerResponse } from '../model/types/seleniumParameters'
import { wsMessageAccept } from "shared/api/ws"
import { fetchFilesList } from "features/FetchFilesList"

const options = Array(10).fill(1).map((_, i) => ({ value: String(i + 1) }))

const mapDaysSuffix = (days: number) => {
    switch (days) {
        case 1:
            return 'день'
        case 2:
        case 3:
        case 4:
            return 'дня'
        default:
            return 'дней'
    }
}

export const StartSelenium = () => {
    const dispatch = useAppDispatch();
    const days = useSelector(getSeleniumParamsDays)
    const services = useSelector(getSeleniumParamsServices)
    const error = useSelector(getSeleniumParamsError)
    const status = useSelector(getSeleniumParamsStatus)

    // useEffect(() => {
    //     wsMessageAccept<ServerResponse>((data) => {
    //         dispatch(seleniumParamsActions.setStatus(data))
    //         dispatch(fetchFilesList())
    //     })
    // }, [])

    const handleClick = async () => {
        dispatch(startSelenium())
    }

    const handleSelect = (value: string) => {
        dispatch(seleniumParamsActions.setDays(Number(value)))
    }


    return (
        <HStack max gap={32} align='start'>
            <Button
                onClick={handleClick}
                style={{ width: 200 }}
                disabled={!services.length}
            >
                Запустить Selenium
            </Button>
            <Select
                label="Горизонт прогноза"
                suffix={mapDaysSuffix(days)}
                options={options}
                value={String(days)}
                onChange={handleSelect}
            />
            {error && <Text title="Ошибка" text={error} />}
            {status && <Text text={status.Selenium} />}
            <CheckBox />
        </HStack >)
}