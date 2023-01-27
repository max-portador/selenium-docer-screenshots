from datetime import datetime, timedelta
import os
from multiprocessing import Pool
from typing import Generator
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from .driver import driver
from .driver.constants import *


class VentuskyParser:
    def __init__(self, screenshots_dir: str, location: str, params: dict, fInterval=3):
        self.driver = driver.get_selenium_driver()
        self.coords = params['coords']
        self.scale = params['scale']
        width = params['width']
        height = params['height']
        self.driver.set_window_size(width, height)
        self.dir = screenshots_dir
        self.fInterval = fInterval
        self.location = location
        self.switched_to_mm = False
        self.urls: dict = {}

    def set_dir(self, new_dir):
        self.dir = new_dir

    # генератор чисел +1
    @staticmethod
    def gen(n=1):
        while True:
            yield str(n)
            n += 1

    # проверяет, загрузилась ли анимация погоды
    def wait_full_render(self):
        wait = WebDriverWait(self.driver, 10)
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, "xx")))

    # # функция возвращает дату сегодня + delta дней в формате ГГГГ.мм.дд
    def get_tomorrow(self, delta):
        today = datetime.today() + timedelta(days=delta)
        return today.strftime('%Y%m%d')

    def turn_on_grid(self):
        self.driver.get("https://www.ventusky.com")
        self.wait_full_render()

        # входим в настройки
        settings_btn = self.driver.find_element(
            By.CSS_SELECTOR, css_selector_settings)
        settings_btn.click()
        # убираем галочку отображать значение центров циклонов, если включены
        cyclone_centers = self.driver.find_element(
            By.CSS_SELECTOR, css_selector_cycloneCenters)
        if cyclone_centers.is_selected():
            cyclone_centers.click()
        # ставим галочку отображать значение в сетке, если не установлено
        check_box = self.driver.find_element(
            By.CSS_SELECTOR, css_selector_checkbox)
        if not check_box.is_selected():
            check_box.click()
        # закрываем настройки
        close_btn = self.driver.find_element(
            By.CSS_SELECTOR, css_selector_closebtn)
        close_btn.click()

    # добавить в список url накопление осадков или снега
    def create_url_by_type_and_time(self, f_type: str, days: int, name: str, sub_dir: str):
        delta = self.get_tomorrow(days)
        hour = '0600'

        url = f"https://www.ventusky.com/?p={self.coords};{self.scale}&l={f_type}&t={delta}/{hour}"
        screenshot_name = os.path.join(sub_dir, f"{name}.png")
        self.urls[url] = screenshot_name
    # делаем невидимыми переданные элементы страницы

    def set_invisible(self):
        for key, values in invis_elements.items():
            for value in values:
                for element in self.driver.find_elements(key, value):
                    if element:
                        self.driver.execute_script(
                            "arguments[0].setAttribute('style','display: none')",
                            element)

    def create_urls_for_delta(self, sub_dir: str, f_type: str, delta: int, num_gen: Generator):
        for hour in hours.values():
            date = self.get_tomorrow(delta)
            url = f"https://www.ventusky.com/?p={self.coords};{self.scale}&l={f_type}&t={date}/{hour}"
            screenshot_name = os.path.join(
                sub_dir, f"{forecast_types[f_type]}{next(num_gen)}.png")

            self.urls[url] = screenshot_name

    # для location генерим url
    def create_urls(self):
        sub_dir = os.path.join(self.dir, self.location)

        if not os.path.exists(sub_dir):
            os.mkdir(sub_dir)

        for f_type in forecast_types:
            num_gen = VentuskyParser.gen()  # создаем генератор чисел
            for delta in range(1, self.fInterval + 1):
                self.create_urls_for_delta(
                    sub_dir, f_type, delta, num_gen)
        for f_type, interval, title in snow_rain_params:
            self.create_url_by_type_and_time(
                f_type, interval, title, sub_dir)

    # делает скрин по указанному url и сохраняет под именем screenshotName

    def drive_url(self, url, screenshotName):
        print(screenshotName)
        self.driver.get(url)
        # ждем, пока загрузится
        self.wait_full_render()
        # если появится промо, то удаляем его
        try:
            promo = self.driver.find_element(By.ID, "news")
            if promo:
                self.driver.execute_script("""var element = arguments[0];
                                                    element && element.parentNode && element.parentNode.removeChild(element);""", promo)
        except NoSuchElementException:
            pass

        # переключает на м/с, если порывы ветра
        if not self.switched_to_mm and "gust" in url:
            wait = WebDriverWait(self.driver, 10)
            wait.until(EC.presence_of_element_located(
                (By.CLASS_NAME, css_selector_measure)))
            try:
                scale = self.driver.find_element(
                    By.CSS_SELECTOR, css_selector_measure)
                scale.click()
                self.switched_to_mm = True
            except:
                pass

        # делаем элементы меню сделать невидимыми
        self.set_invisible()
        self.driver.get_screenshot_as_file(screenshotName)

    def end(self):
        try:
            self.driver.close()
            self.driver.quit()
        except ConnectionRefusedError:
            pass

    def launch_driver(self):
        self.create_urls()
        self.turn_on_grid()
        print(*self.urls.items(), sep='\n')
        for url, screenshotName in self.urls.items():
            self.drive_url(url, screenshotName)

        self.end()

    # def get_gismeteo(self):
        # urls = self.create_dirs_and_urls()
        # self.driver.set_window_size(2000, 1400)

        # for pair in urls:
        #     saving_name = pair["saving_name"]
        #     self.driver.get(pair["url"])
        #     # promo = self.driver.find_element(By.CSS_SELECTOR, "body > section.section-overlay")
        #     # self.driver.execute_script("""var element = arguments[0];
        #     #                                                  element.parentNode.removeChild(element);""", promo)
        #     widget = self.driver.find_element(
        #         By.CSS_SELECTOR, "body > section.content.wrap > div.content-column.column1 > section:nth-child(2) > div > div > div")

        #     location = widget.location
        #     size = widget.size

        #     x1 = int(location['x'])
        #     y1 = int(location['y'])
        #     width = int(size['width'])
        #     height = int(size['height'])
        #     x2 = x1 + width
        #     y2 = y1 + height

        #     print(saving_name)
        #     self.driver.get_screenshot_as_file(saving_name)
        #     with Image.open(saving_name) as img:
        #         try:
        #             box = (x1, y1, x2, y2)
        #             part = img.crop(box)
        #             # os.remove(saving_name)
        #             part.save(saving_name)
        #         except Exception as e:
        #             print(e)

    # def create_dirs_and_urls(self):
        # urls = []
        # for FO, pairs in gismeteo_urls.items():
        #     _sub_dir = os.path.join(self.dir, FO)

        #     if not os.path.exists(_sub_dir):
        #         os.mkdir(_sub_dir)

        #     sub_dir = os.path.join(_sub_dir, 'Гисметео')
        #     if not os.path.exists(sub_dir):
        #         os.mkdir(sub_dir)

        #     for city, url in pairs.items():
        #         saving_name = os.path.join(sub_dir, f'{city}.png')
        #         urls.append({"url": url, "saving_name": saving_name})

        # return
