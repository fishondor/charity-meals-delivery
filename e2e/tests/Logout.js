const login = require('../helpers/Login')

module.exports = {

    before: async function(browser) {
        browser.url('http://localhost:4200/deliveries')
        browser.waitForElementVisible('body')
        let user = await login(browser)

        console.log("user", user)
    },

    'Navbar shows logout menu is hidden': function(browser) {
        browser.waitForElementVisible('#navbar-user-avatar')
        browser.waitForElementNotPresent('#navbar-logout')
    },

    'Menu shows on avatar click': function(browser) {
        browser.click('#navbar-user-avatar')
        browser.waitForElementVisible('#navbar-logout')
    },

    'Log out': function(browser) {
        browser.click('#navbar-logout')
        browser.waitForElementNotPresent('#navbar-user-avatar')
        browser.waitForElementVisible('#navbar-login')
    },

    after: function(browser) {
        browser.end()
    },

}