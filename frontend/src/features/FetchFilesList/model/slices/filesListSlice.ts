import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFilesList } from "../services/fetchFilesList";
import { FilesList, FilesListSchema, } from "../types/fileList";

const initialState: FilesListSchema = {
}

const fileListSlice = createSlice({
    name: 'filesList',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilesList.fulfilled, (state, { payload }: PayloadAction<FilesList>) => {
                state.filesList = payload
            })
            .addCase(fetchFilesList.rejected, (state, { payload }: PayloadAction<string>) => {
                state.error = payload
            })
    }
})

export const { actions: fileListActions } = fileListSlice
export const { reducer: fileListReducer } = fileListSlice