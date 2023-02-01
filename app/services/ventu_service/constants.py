from selenium.webdriver.common.by import By

css_selector_settings = "#menu-settings > a"
css_selector_cycloneCenters = '#settings-colors > div.resp_table > div > label:nth-child(1) > div.resp_table_cell.cell2 > input[type=checkbox]'
css_selector_checkbox = "#settings-colors > div.resp_table > div > label:nth-child(3) > div.resp_table_cell.cell2 > input[type=checkbox]"
css_selector_closebtn = "#aside_close_btn"
css_selector_basemap = "#x > canvas:nth-child(1)"
css_selector_boarders = "#x > canvas:nth-child(5)"
css_selector_measure = "z"

invis_elements = {
    By.ID: ["header", "d", "p", "m", "i", "k", 'z'],
    By.CLASS_NAME: ['hv', 's'],
    By.XPATH: ["/html/body/menu", "/html/body/div[3]", "/html/body/div[4]", "/html/body/a[1]",
               "/html/body/a[2]"]
}


hours = {
    '06': '0300',
    '12': '0900',
    '18': '1500',
    '24': '2100'
}

forecast_types = {
    'rain-3h': "о",
    'gust': "в",
    'wave': "вол"
}

SNOW_ACC = 'new-snow-ac'
RAIN_ACC = 'rain-ac'

snow_rain_params = [
    [RAIN_ACC, 1, "сумм24"],
    [RAIN_ACC, 3, "сумм72",],
    [SNOW_ACC, 1, "снег24",],
    [SNOW_ACC, 3, "снег72",],

]
