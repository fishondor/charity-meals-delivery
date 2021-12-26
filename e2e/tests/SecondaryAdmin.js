module.exports = {

    before: (browser) => {
        this.testParams = browser.globals.SECONDARY_ADMIN_TEST;
        this.url = browser.globals.HOST + browser.globals.ROUTES.DELIVERY + "/" + this.testParams.ID
    },

    after: function(browser) {
        browser.end()
    },

    "Login as secondary admin": async (browser) => {
        browser.url(this.url)
        browser.waitForElementVisible('body')
        this.carrier = await browser.Login(this.testParams.SECONDARY_ADMIN_INDEX)
    },

    "Secondary admin have no access to admin before registered": (browser) => {
        browser.waitForElementVisible('#delivery-registration-form')
        browser.Logout()
    },

    "Login as owner": async (browser) => {
        browser.url(this.url)
        browser.waitForElementVisible('body')
        this.carrier = await browser.Login(this.testParams.OWNER_INDEX)
    },

    "Set secondary admin": (browser) => {
        browser.waitForElementVisible("#tab-info")
        browser.click("#tab-info")
        let hiddenComboInputField = '#secondary-admin-list-item input[type="hidden"]'
        browser.waitForElementPresent(hiddenComboInputField)
        const scriptString = `
            document.querySelector('${hiddenComboInputField}').value = "${this.testParams.SECONDARY_ADMIN_EMAIL}"
        `;
        const params = [];

        browser.execute(scriptString, params, result => {
            console.log('SYNC RESULT: ', result);
        });
        //browser.setValue(hiddenComboInputField, "grass.orange.624@example.com")
        browser.click("#tab-info")

        browser.Logout()
    },

    "Login as secondary admin 2": async (browser) => {
        browser.url(this.url)
        browser.waitForElementVisible('body')
        this.carrier = await browser.Login(this.testParams.SECONDARY_ADMIN_INDEX)
    },

    "Secondary admin has access to admin console": (browser) => {
        browser.waitForElementVisible("#delivery-tabs")
        browser.Logout()
    },

    "Login as owner 2": async (browser) => {
        browser.url(this.url)
        browser.waitForElementVisible('body')
        this.carrier = await browser.Login(this.testParams.OWNER_INDEX)
    },

    "Remove secondary admin": (browser) => {
        browser.waitForElementVisible("#tab-info")
        browser.click("#tab-info")
        let clearButton = "#secondary-admin-list-item button[type='button']"
        browser.waitForElementVisible(clearButton)
        browser.click(clearButton)

        browser.Logout()
    },

    "Login as secondary admin 3": async (browser) => {
        browser.url(this.url)
        browser.waitForElementVisible('body')
        this.carrier = await browser.Login(this.testParams.SECONDARY_ADMIN_INDEX)
    },

    "Secondary admin have no access to admin after removed": (browser) => {
        browser.waitForElementVisible('#delivery-registration-form')
    }

}