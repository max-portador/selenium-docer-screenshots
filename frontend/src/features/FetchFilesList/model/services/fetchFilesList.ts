import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { FilesList } from "../types/fileList"

export const fetchFilesList = createAsyncThunk<FilesList, void, ThunkConfig<string>>(
    'filesList/fetch',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi
        try {
            const res = await extra.api.get<FilesList>('/files')

            if (!res.data) {
                throw new Error("No data");
            }

            return res.data

        }
        catch (e) {
            console.error(e);
            return rejectWithValue(String(e));
        }

    }
)