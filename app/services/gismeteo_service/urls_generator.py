import os
from functools import reduce
from .constants import GISMETEO_BASE_URL, GISMETEO_SUFFIX_10


def create_dirs_if_not_exists(root: str, paths_list: list) -> str:
    def create_dir(root: str, folder_name: str):
        folder_path = os.path.join(root, folder_name)
        if not os.path.exists(folder_path):
            os.mkdir(folder_path)

        return folder_path

    return reduce(create_dir, paths_list, root)


class GismeteoUrlsGenerator:
    def __init__(self, screenshots_dir: str, config: dict):
        self.config = config
        self.screenshots_dir = screenshots_dir
        self.urls: dict = {}

        self.create_dirs_and_urls()

    def create_dirs_and_urls(self):
        for location, pairs in self.config.items():
            for city, city_route in pairs.items():
                url = f'{GISMETEO_BASE_URL}/{city_route}/{GISMETEO_SUFFIX_10}'
                screenshot_dir = create_dirs_if_not_exists(root=self.screenshots_dir,
                                                           paths_list=[
                                                               location,
                                                               'Гисметео',
                                                           ])
                self.urls[url] = f'{screenshot_dir}/{city}.png'

    def get_urls(self) -> dict:
        return self.urls
