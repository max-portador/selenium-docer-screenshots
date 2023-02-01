import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { startSelenium } from '../services/startSelenium';
import { SeleniumParametersSchema, SeleniumService, ServerResponse } from '../types/seleniumParameters';


const initialState: SeleniumParametersSchema = {
    days: 3,
    services: ['ventusky', 'gismeteo'],
}

export const seleniumParametersSlice = createSlice({
    name: 'seleniumParameters',
    initialState,
    reducers: {
        setDays: (state, action: PayloadAction<number>) => {
            state.days = action.payload
        },
        setServices: (state, action: PayloadAction<SeleniumService[]>) => {
            state.services = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(startSelenium.fulfilled, (state, { payload }: PayloadAction<ServerResponse>) => {
                state.status = payload
                state.error = undefined
            })
            .addCase(startSelenium.rejected, (state, { payload }) => {
                state.status = undefined
                state.error = payload
            })
    }
}
)

export const { actions: seleniumParamsActions } = seleniumParametersSlice
export const { reducer: seleniumParamsReducer } = seleniumParametersSlice