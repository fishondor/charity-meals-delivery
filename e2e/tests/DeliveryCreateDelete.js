module.exports = {

    before: async function(browser) {
        browser.url(browser.globals.HOST + browser.globals.ROUTES.DELIVERY_CREATE)
        browser.waitForElementVisible('body')
        await browser.Login()

    },

    after: function(browser) {
        browser.end()
    },

    "Set new delivery values": async function(browser) {

        browser.waitForElementVisible("input")

        let days = await browser.elements('css selector', `table td button .v-btn__content`);
        let randomDay = Math.floor(Math.random() * days.value.length)
        this.day = randomDay + 1
        console.log("Setting day", this.day)
        this.description = browser.globals.DELIVERY_VALUES.DESCRIPTION + " " + Date.now()
        browser.setValue("input", this.description)
        browser.click('xpath', `//div[contains(@class, 'v-btn__content') and text()='${this.day}']`)

        browser.pause(3000)
    },

    "Save this delivery": function(browser) {
        browser.waitForElementVisible("button#button-create-delivery")
        browser.click("button#button-create-delivery")
    },

    "It redirects to this delivery page": function(browser) {
        browser.assert.urlContains(browser.globals.ROUTES.DELIVERY);
        browser.waitForElementVisible('#delivery-title')
        browser.waitForElementVisible('#delivery-description')
        let today = new Date()
        let year = today.getFullYear()
        let month = today.getMonth()
        browser.assert.containsText("#delivery-title", year);
        browser.assert.containsText("#delivery-title", month + 1);
        browser.assert.containsText("#delivery-title", this.day);
        browser.assert.containsText("#delivery-description", this.description);
    },

    "It shows this delivery in deliveries list": function(browser) {
        browser.url(browser.globals.HOST + browser.globals.ROUTES.DELIVERIES)
        browser.waitForElementVisible("#deliveries-table")
        browser.waitForElementVisible('xpath', `//td[text()='${this.description}']`)
    },

    "It deletes this delivery": function(browser) {
        let deleteButtonXpath = `//td[text()='${this.description}']/parent::tr/td/button[contains(@class, "deliveries-delete-item")]`
        browser.waitForElementVisible('xpath', deleteButtonXpath)
        browser.click('xpath', deleteButtonXpath)
        browser.waitForElementVisible('#delete-delivery-dialog-approve')
        browser.click('#delete-delivery-dialog-approve')
        browser.waitForElementNotPresent('xpath', `//td[text()='${this.description}']`)
    },

    "Deleted delivery is not present in deliveries table": function(browser) {
        browser.url(browser.globals.HOST + browser.globals.ROUTES.DELIVERIES)
        browser.waitForElementNotPresent('xpath', `//td[text()='${this.description}']`)
    }

}