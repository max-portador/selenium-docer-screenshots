import { useCallback, useEffect, useMemo, useState } from "react"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { Button } from "shared/ui/Button"
import { Text } from "shared/ui/Text"
import { HStack, VStack } from "shared/ui/Stack"
import { classNames } from "shared/lib/classNames/classNames"
import { FolderTree } from "shared/ui/FolderTree"
import { useSelector } from "react-redux"
import { getFileListData, getFileListError } from "../model/selectors/filesListSelector"
import { fetchFilesList } from "../model/services/fetchFilesList"
import cls from './FetchFileList.module.scss'

const baseURL = __API__

export const FetchFilesList = () => {
    const files = useSelector(getFileListData)
    const error = useSelector(getFileListError)
    const dispatch = useAppDispatch();
    const [selectedFile, setSelectedFile] = useState<string | undefined>()

    const handleClick = async () => {
        dispatch(fetchFilesList())
    }

    useEffect(() => {
        handleClick()
    }, [])

    const getTabsValues = useMemo(() => {
        return {
            tabsValues: Array.from(Object.keys(files)) || []
        }
    }, [files])

    const handleSelect = useCallback((path: string) => {
        setSelectedFile(path)
    }, [])

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
                            selectedFile={selectedFile}
                        />
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