import pytest
from hamcrest import assert_that, is_
from clickshot.matchers import visible, eventually_visible

from regions.browser import browser
from regions.popup import popup
from regions.sidebar import sidebar


@pytest.mark.usefixtures("firefox")
class TestPopup:
    def test_has_a_toolbar_button(self):
        assert_that(browser.update_scanner_button, is_(visible()))

    def test_popup_is_shown_when_the_toolbar_button_is_clicked(self):
        browser.update_scanner_button.click()

        assert_that(popup.empty_popup, is_(eventually_visible()))

    def test_sidebar_can_be_opened_from_the_popup(self):
        sidebar.close_button.click()
        browser.update_scanner_button.click()

        popup.open_sidebar_button.click()

        assert_that(sidebar.title, is_(eventually_visible()))
