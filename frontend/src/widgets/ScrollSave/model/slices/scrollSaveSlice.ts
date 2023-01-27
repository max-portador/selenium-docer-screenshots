import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollSaveSchema } from 'widgets/ScrollSave';

const initialState: ScrollSaveSchema = {
    scroll: {},
};

export const scrollSaveSliceSlice = createSlice({
    name: 'scrollSave',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{ path: string, position: number }>) => {
            state.scroll[payload.path] = payload.position;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(asyncThunk.pending, (state) => {
    //
    //         })
    //         .addCase(asyncThunk.fulfilled, (state) => {
    //
    //         })
    //         .addCase(asyncThunk.rejected, (state, { payload }) => {
    //
    //         });
    // },
});

export const { actions: scrollSaveSliceActions } = scrollSaveSliceSlice;
export const { reducer: scrollSaveSliceReducer } = scrollSaveSliceSlice;
