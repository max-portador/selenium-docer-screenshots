import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { Button } from "shared/ui/Button"
import { Text } from "shared/ui/Text"
import { HStack, VStack } from "shared/ui/Stack"
import { Tabs } from "shared/ui/Tabs/Tabs"
import cls from './FetchFileList.module.scss'
import { classNames } from "shared/lib/classNames/classNames"
import { sortByNumericString } from "shared/lib/sortByNumericString"

type FilesList = Record<string, string[]>

const baseURL = __API__

export const FetchFilesList = () => {
    const [files, setFiles] = useState<FilesList>({})
    const [error, setError] = useState<string | undefined>()
    const [selectedFolder, setSelectedFolder] = useState<string | undefined>()
    const [selectedFile, setSelectedFiles] = useState<string | undefined>()

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

    useEffect(() => {
        handleClick()
    }, [])

    const getTabsValues = useMemo(() => {
        return {
            tabsValues: Array.from(Object.keys(files)) || []
        }
    }, [files])

    return (
        <HStack max gap={32} align='start' className={cls.fetchFileList}>
            <Button onClick={handleClick} style={{ width: 230 }}>
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
                        <HStack align='start'>
                            <VStack>
                                {files[selectedFolder]?.length > 0 &&
                                    <div className={cls.filenames}>
                                        {
                                            sortByNumericString(files[selectedFolder])
                                                ?.filter(filename => filename.endsWith('.png'))
                                                ?.map((filename) => {
                                                    const isSelected = filename === selectedFile
                                                    return <div
                                                        className={classNames(
                                                            cls.filename,
                                                            { [cls.selectedFile]: isSelected }
                                                        )}
                                                        onClick={() => setSelectedFiles(filename)} key={filename}
                                                    >
                                                        {filename} {isSelected && '✔'}
                                                    </div>
                                                })
                                        }
                                    </div>
                                }
                            </VStack>
                            <>
                                {files[selectedFolder]?.includes(selectedFile) && <img
                                    className={classNames(cls.image)}
                                    src={`${baseURL}/images/${selectedFolder}/${selectedFile}`} />}
                            </>
                        </HStack>
                    </VStack>
                )
            }
        </HStack >)
}