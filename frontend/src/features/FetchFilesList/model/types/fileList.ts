export type FilesList = Record<string, string[] | object>

export interface FilesListSchema {
    filesList?: FilesListSchema;
    error?: string;
}