from clickshot import Region, ElementConfig

from .config import config

page_properties = Region("page_properties", config).configure([
    ElementConfig(
        "ok_button",
        expected_rect=(1485, 1051, 134, 51),
    ),
])
