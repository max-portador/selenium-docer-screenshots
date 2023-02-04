import { StateSchema } from "app/providers/StoreProvider";

export const getFileListData = (state: StateSchema) => state.filesList.filesList ?? {}
export const getFileListError = (state: StateSchema) => state.filesList.error;
