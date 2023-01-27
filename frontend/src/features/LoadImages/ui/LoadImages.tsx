import axios from "axios"
import { useState } from "react"
import { Button } from "shared/ui/Button"
import { Text } from "shared/ui/Text"
import { HStack } from "shared/ui/Stack"

export const LoadImages = () => {
    const [error, setError] = useState<string | undefined>()

    const handleClick = () => {
        try {
            axios(__API__ + '/files', {
                responseType: 'blob'
            })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'images.zip');
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                });

        }
        catch (e) {
            setError(e?.message ?? e);
        }
    }

    return (
        <HStack max gap={32} align='start'>
            <Button onClick={handleClick} style={{ width: 200 }}>
                Скачать архив
            </Button>
            {error && <Text title="Ошибка" text={error} />}
        </HStack >)
}