from pprint import pprint
from selenium.webdriver import Chrome
from .ventusky_url_generator import VentuskyUrlGenerator
from .ventu_parser import VentuskyParser


class VentuService:
    def __init__(self, driver: Chrome, screenshots_dir: str, location: str, params: dict, fInterval: int):
        self.driver = driver
        self.params = params
        self.urls = VentuskyUrlGenerator(screenshots_dir=screenshots_dir,
                                         location=location,
                                         params=params,
                                         fInterval=fInterval).get_urls()
        pprint(self.urls)

    def start(self):
        parser = VentuskyParser(driver=self.driver,
                                params=self.params,
                                urls=self.urls)
        parser.launch_driver()
