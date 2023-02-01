import os
from datetime import datetime, timedelta
from typing import Generator
from .constants import hours, forecast_types, snow_rain_params


def gen(n=1):
    while True:
        yield str(n)
        n += 1

def get_tomorrow(delta: int):
    today = datetime.today() + timedelta(days=delta)
    return today.strftime('%Y%m%d')


class VentuskyUrlGenerator:
    def __init__(self, screenshots_dir: str, location: str, params: dict, fInterval=3) -> None:
        self.urls: dict = {}
        self.dir = screenshots_dir
        self.coords = params['coords']
        self.scale = params['scale']
        self.fInterval = fInterval
        self.location = location

        self.create_urls()

    def get_urls(self) -> dict:
        return self.urls

    def create_urls_for_delta(self, sub_dir: str, f_type: str, delta: int, num_gen: Generator):
        for hour in hours.values():
            date = get_tomorrow(delta)
            url = f"https://www.ventusky.com/?p={self.coords};{self.scale}&l={f_type}&t={date}/{hour}"
            screenshot_name = os.path.join(
                sub_dir, f"{forecast_types[f_type]}{next(num_gen)}.png")

            self.urls[url] = screenshot_name

     # добавить в список url накопление осадков или снега

    def create_url_by_type_and_time(self, f_type: str, days: int, name: str, sub_dir: str):
        delta = get_tomorrow(days)
        hour = '0600'
        url = f"https://www.ventusky.com/?p={self.coords};{self.scale}&l={f_type}&t={delta}/{hour}"
        screenshot_name = os.path.join(sub_dir, f"{name}.png")
        self.urls[url] = screenshot_name

    def create_urls(self):
        sub_dir = os.path.join(self.dir, self.location)

        if not os.path.exists(sub_dir):
            os.mkdir(sub_dir)

        for f_type in forecast_types:
            num_gen = gen()  # создаем генератор чисел
            for delta in range(1, self.fInterval + 1):
                self.create_urls_for_delta(
                    sub_dir, f_type, delta, num_gen)
        for f_type, interval, title in snow_rain_params:
            self.create_url_by_type_and_time(
                f_type, interval, title, sub_dir)
