from multiprocessing import Pool
from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from .constants import *


class VentuskyParser:
    def __init__(self, driver: Chrome, params: dict, urls: dict):
        self.driver = driver
        width = params['width']
        height = params['height']
        self.driver.set_window_size(width, height)
        self.switched_to_mm = False
        self.urls: dict = urls

    # проверяет, загрузилась ли анимация погоды
    def wait_full_render(self):
        wait = WebDriverWait(self.driver, 10)
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, "xx")))

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

    # делаем невидимыми переданные элементы страницы
    def set_invisible(self):
        for key, values in invis_elements.items():
            for value in values:
                for element in self.driver.find_elements(key, value):
                    if element:
                        self.driver.execute_script(
                            "arguments[0].setAttribute('style','display: none')",
                            element)

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
        self.turn_on_grid()
        for url, screenshotName in self.urls.items():
            print(url, screenshotName)
            self.drive_url(url, screenshotName)

        # self.end()
