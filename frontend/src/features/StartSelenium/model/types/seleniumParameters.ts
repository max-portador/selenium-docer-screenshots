export type SeleniumService = 'ventusky' | 'gismeteo'

export type ServerResponse = {
    Selenium: string
}

export interface SeleniumParametersSchema {
    services: SeleniumService[],
    days: number
    error?: string
    status?: ServerResponse
}