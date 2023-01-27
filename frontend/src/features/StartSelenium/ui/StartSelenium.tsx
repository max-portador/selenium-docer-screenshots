import axios from "axios"
import { useMemo, useState } from "react"
import { Button } from "shared/ui/Button"
import { Text } from "shared/ui/Text"
import { HStack, VStack } from "shared/ui/Stack"
import { Select } from "shared/ui/Select"

type ServerResponse = {
    Selenium: string
}

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
    const [response, setResponse] = useState<ServerResponse | undefined>()
    const [days, setDays] = useState<number>(3)
    const [error, setError] = useState<string | undefined>()

    const handleClick = async () => {
        try {
            const res = await axios<ServerResponse>(__API__ + `/start?days=${days}`)
            setResponse(res.data)
        }
        catch (e) {
            setError(e?.message ?? e);
            setResponse(undefined)
        }
    }

    const handleSelect = (value: string) => {
        setDays(Number(value))
    }

    return (
        <HStack max gap={32} align='start'>
            <Button onClick={handleClick} style={{ width: 200 }}>
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
            {response && <Text text={response.Selenium} />}

        </HStack >)
}