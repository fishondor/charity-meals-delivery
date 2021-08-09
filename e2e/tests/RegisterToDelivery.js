module.exports = {

    after: function(browser) {
        browser.end()
    },

    "Login as user 1": async (browser) => {
        browser.url(browser.globals.HOST + browser.globals.ROUTES.DELIVERY + `/${browser.globals.EXAMPLE_DELIVERY}`)
        browser.waitForElementVisible('body')
        this.user = await browser.Login(2)
        console.log("user", this.user)
    },

    "Delivery page shows registration form": (browser) => {
        browser.waitForElementVisible('#delivery-registration-form')
    },

    "User known values are present": (browser) => {
        browser.waitForElementVisible("#delivery-registration-form-name")
        browser.assert.value("#delivery-registration-form-name", this.user.name)
        browser.waitForElementVisible("#delivery-registration-form-email")
        browser.assert.value("#delivery-registration-form-email", this.user.email)
    },
    
    "Form validates data": (browser) => {
        browser.waitForElementNotPresent("#delivery-registration-form-phone div.error--text")
        browser.waitForElementVisible("#delivery-registration-form button[type='button']")
        browser.click("#delivery-registration-form button[type='button']")
        browser.waitForElementVisible("#delivery-registration-form-phone div.error--text")

        browser.waitForElementVisible("#delivery-registration-form-phone input[name='telephone']")
        browser.setValue("#delivery-registration-form-phone input[name='telephone']", "1234567890")
        browser.waitForElementNotPresent("#delivery-registration-form-phone div.error--text")
        browser.click("#delivery-registration-form button[type='button']")
    },

    "User is registered to delivery": (browser) => {
        browser.waitForElementNotPresent("#delivery-registration-form")
        browser.url(browser.globals.HOST + browser.globals.ROUTES.DELIVERY + `/${browser.globals.EXAMPLE_DELIVERY}`)
        browser.waitForElementVisible("#delivery-title")
        browser.waitForElementNotPresent("#delivery-registration-form")
    }

}