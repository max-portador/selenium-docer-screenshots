import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { Button } from "shared/ui/Button"
import { Text } from "shared/ui/Text"
import { HStack, VStack } from "shared/ui/Stack"
import { Tabs } from "shared/ui/Tabs/Tabs"
import cls from './FetchFileList.module.scss'
import { classNames } from "shared/lib/classNames/classNames"
import { sortByNumericString } from "shared/lib/sortByNumericString"
import { FolderTree } from "shared/ui/FolderTree"

type FilesList = Record<string, string[] | object>

const baseURL = __API__

export const FetchFilesList = () => {
    const [files, setFiles] = useState<FilesList>({})
    const [error, setError] = useState<string | undefined>()
    const [selectedFolder, setSelectedFolder] = useState<string | undefined>()
    const [selectedFile, setSelectedFile] = useState<string | undefined>()

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

    const handleSelect = (path: string) => {
        setSelectedFile(path)
    }

    return (
        <HStack max gap={32} align='start' className={cls.fetchFileList}>
            <VStack gap={16}>
                <Button onClick={handleClick} style={{ width: 230 }}>
                    Список файлов
                </Button>
                {error && <Text title="Ошибка" text={error} />}
                {
                    getTabsValues.tabsValues.length > 0 && (
                        < FolderTree
                            className={cls.filenames}
                            itemsObj={files}
                            onFileSelect={handleSelect}
                            selectedFile={selectedFile} />
                    )
                }
            </VStack>
            <VStack className={cls.imageWrap}>
                {selectedFile}
                {selectedFile && <img
                    className={classNames(cls.image)}
                    src={`${baseURL}/images${selectedFile}`} />}
            </VStack>

        </HStack >)
}