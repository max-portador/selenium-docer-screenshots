import axios from "axios"
import { useMemo, useState } from "react"
import { Button } from "shared/ui/Button"
import { Text } from "shared/ui/Text"
import { HStack, VStack } from "shared/ui/Stack"
import { Tabs } from "shared/ui/Tabs/Tabs"

type FilesList = Record<string, string[]>

export const FetchFilesList = () => {
    const [files, setFiles] = useState<FilesList>({})
    const [error, setError] = useState<string | undefined>()
    const [selectedFolder, setSelectedFolder] = useState<string | undefined>('test')

    const handleClick = async () => {
        try {
            const res = await axios<FilesList>(__API__ + '/files')
            setFiles(res.data)
            setSelectedFolder(Object.keys(res.data)[0])
        }
        catch (e) {
            setError(e?.message ?? e);
            setFiles({})
        }
    }

    const getTabsValues = useMemo(() => {
        return {
            tabsValues: Array.from(Object.keys(files)) || []
        }
    }, [files])


    return (
        <HStack max gap={32} align='start'>
            <Button onClick={handleClick} style={{width: 230}}>
                Список файлов
            </Button>
            {error && <Text title="Ошибка" text={error} />}
            {
                getTabsValues.tabsValues.length > 0 && (
                    <VStack max>
                        <Tabs
                            tabs={
                                getTabsValues.tabsValues
                                    .map((key) => {
                                        return {
                                            value: key,
                                            content: <>{key} ({files[key].length})</>
                                        }
                                    })
                            }
                            value={selectedFolder}
                            onTabClick={setSelectedFolder}
                        />
                        {
                            files[selectedFolder]?.map((filename) => {
                                return <div key={filename}>{filename}</div>
                            })
                        }

                    </VStack>)

            }
        </HStack >)
}