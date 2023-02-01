from os import environ
from envparse import env
from selenium import webdriver

env.read_envfile()
SELENIUM_URL = environ.get("SELENIUM_URL")

print('***' * 10, SELENIUM_URL, sep='\n')

options = webdriver.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--disable-gpu')
options.add_argument('--no-sandbox')
options.add_argument('start-maximized')
options.add_argument('disable-infobars')
options.add_argument('--remote-debugging-port=4444')
options.add_argument('--disable-dev-shm-usage')
options.add_argument("--disable-extensions")
options.add_argument("--disable-extensions")
options.add_argument("--enable-automation")
# options.add_argument("window-size=2000,1400")


selenium_driver = webdriver.Remote(
    command_executor=f'{SELENIUM_URL}/wd/hub',
    desired_capabilities={'browserName': 'chrome'},
    options=options
)
