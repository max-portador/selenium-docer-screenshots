
from PIL import Image
from selenium.webdriver import Chrome
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from .constants import CSS_WIDGET_SELECTOR


def cut_image(web_element: WebElement, image_dir: str):
    location = web_element.location
    size = web_element.size

    x1 = int(location['x'])
    y1 = int(location['y'])
    width = int(size['width'])
    height = int(size['height'])
    x2 = x1 + width
    y2 = y1 + height

    with Image.open(image_dir) as img:
        try:
            box = (x1, y1, x2, y2)
            part = img.crop(box)
            part.save(image_dir)
        except Exception as e:
            print(e)


class GismeteoParser:
    def __init__(self, driver: Chrome, urls: dict, width: int = 2000, height: int = 1400):
        self.driver = driver
        self.driver.set_window_size(width, height)
        self.urls: dict = urls

    def wait_full_render(self):
        wait = WebDriverWait(self.driver, 10)
        wait.until(EC.presence_of_element_located(
            (By.CSS_SELECTOR, CSS_WIDGET_SELECTOR)))

    def drive_url(self, url, screenshotName):
        print(screenshotName)
        
        self.driver.get(url)
        self.wait_full_render()

        widget = self.driver.find_element(By.CSS_SELECTOR, CSS_WIDGET_SELECTOR)
        self.driver.get_screenshot_as_file(screenshotName)
        cut_image(widget, screenshotName)

    def launch_driver(self):
        for url, screenshotName in self.urls.items():
            self.drive_url(url, screenshotName)
        # self.end()
