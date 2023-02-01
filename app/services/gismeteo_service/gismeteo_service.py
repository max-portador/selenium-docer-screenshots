from selenium.webdriver import Chrome
from .urls_generator import GismeteoUrlsGenerator
from .gismeteo_parser import GismeteoParser


class GismeteoService:
    def __init__(self, driver: Chrome, screenshots_dir, config: dict):
        self.driver = driver
        self.urls = GismeteoUrlsGenerator(screenshots_dir, config).get_urls()

    def start(self):
        parser = GismeteoParser(driver=self.driver, urls=self.urls)
        parser.launch_driver()
