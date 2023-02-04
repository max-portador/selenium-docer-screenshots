import { useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Card } from "shared/ui/Card";
import cls from './FolderTree.module.scss'


interface FolderTreeProps {
    className?: string,
    itemsObj: object,
    onFileSelect: (value: string) => void;
    path?: string;
    selectedFile?: string;
}

export const FolderTree = (props: FolderTreeProps) => {
    const { className, itemsObj, onFileSelect, path = '', selectedFile } = props;
    const [expanded, setExpanded] = useState({});

    const toggleExpanded = (key) => {
        setExpanded({ ...expanded, [key]: !expanded[key] });
    };

    const renderFile = (key, file) => {
        const fullPath = `${path}/${key}/${file}`
        const isSelected = fullPath === selectedFile
        return <div
            className={classNames('', { [cls.selectedFile]: isSelected })}
            onClick={() => onFileSelect(fullPath)}
            key={file}
        >
            {file} {isSelected && '✔'}
        </div>;
    }

    const renderFolder = (key, folder) => {
        const isExpanded = expanded[key];
        const files = folder['_images_']?.map(file => renderFile(key, file));
        const subFolders = Object.keys(folder)
            .filter(title => title !== '_images_')
            .map((subfolder: string) => {
                const itemsObj = { [subfolder]: folder[subfolder] }

                return <FolderTree
                    className={classNames(cls.subfolder)}
                    key={subfolder}
                    itemsObj={itemsObj}
                    onFileSelect={onFileSelect}
                    path={`${path}/${key}`}
                    selectedFile={selectedFile}
                />
            })

        return (
            <div key={key}>
                <Card
                    className={classNames('', { [cls.expanded]: isExpanded })}
                    onClick={() => toggleExpanded(key)}
                >
                    {key}
                </Card>
                {isExpanded && (
                    <>
                        {subFolders.map(subFolder => subFolder)}
                        <div className={cls.folderContent}>{files}</div>
                    </>
                )}
            </div>
        );
    };

    return (
        <div className={classNames('', {}, [className])}>
            {Object.entries(itemsObj).map(([key, value]) => {
                return typeof value === "object" ? renderFolder(key, value) : renderFile(key, value);
            })}
        </div>
    );
}

export default FolderTree;
