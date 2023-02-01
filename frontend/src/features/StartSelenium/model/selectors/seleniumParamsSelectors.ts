import { StateSchema } from "app/providers/StoreProvider";

export const getSeleniumParamsDays = (state: StateSchema) => state.seleniumParameters.days;
export const getSeleniumParamsServices = (state: StateSchema) => state.seleniumParameters.services;
export const getSeleniumParamsError = (state: StateSchema) => state.seleniumParameters.error;
export const getSeleniumParamsStatus = (state: StateSchema) => state.seleniumParameters.status;