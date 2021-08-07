module.exports = {

    before: async function(browser) {
        browser.url('http://localhost:4200/deliveries')
        browser.waitForElementVisible('body')
        let user = await browser.Login()

        console.log("user", user)
    },

    after: function(browser) {
        browser.end()
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

}