import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getSeleniumParamsDays, getSeleniumParamsServices } from '../selectors/seleniumParamsSelectors';
import { ServerResponse } from '../types/seleniumParameters';

export const startSelenium = createAsyncThunk<ServerResponse, void, ThunkConfig<string>>(
    'seleniumParameters/start',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi
        try {
            const days = getSeleniumParamsDays(getState())
            const services = getSeleniumParamsServices(getState())
            const res = await extra.api.get<ServerResponse>(__API__ + `/start?days=${days}&service=${services.join(',')}`)

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