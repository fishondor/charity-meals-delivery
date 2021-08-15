module.exports = {

    after: function(browser) {
        browser.end()
    },

    "Log in as carrier": async (browser) => {
        this.url = browser.globals.HOST + browser.globals.ROUTES.DELIVERY + "/" + browser.globals.EXAMPLE_DELIVERY_WITH_GROUPS.ID
        console.log("Url")
        browser.url(this.url)
        browser.waitForElementVisible('body')
        this.carrier = await browser.Login(browser.globals.EXAMPLE_DELIVERY_WITH_GROUPS.CARRIER_INDEX)
        console.log("Carrier", this.carrier)
    },

    "Register to delivery as carrier": async (browser) => {
        browser.waitForElementVisible('#delivery-registration-form')
        browser.waitForElementVisible("input[name='telephone']")
        browser.setValue("input[name='telephone']", "0524378928")

        browser.waitForElementVisible('#delivery-registration-form-submit')
        browser.click('#delivery-registration-form-submit')

        browser.waitForElementNotPresent('#delivery-registration-form')

        browser.Logout()
    },

    "Login as owner": async (browser) => {
        browser.url(this.url)
        browser.waitForElementVisible('body')
        this.owner = await browser.Login(browser.globals.EXAMPLE_DELIVERY_WITH_GROUPS.OWNER_INDEX)
        console.log("Owner", this.owner)
    },

    "Carrier listed in carriers list": (browser) => {
        browser.waitForElementVisible('#delivery-tabs')
        browser.waitForElementVisible('#tab-carriers')
        browser.click('#tab-carriers')
        browser.waitForElementVisible('#table-carriers')
        browser.waitForElementVisible('xpath', `//td[text()='${this.carrier.email}']`)
    },

    "Select random delivery group": async (browser) => {
        browser.waitForElementVisible('#tab-groups')
        browser.click('#tab-groups')

        let groups = await browser.elements('css selector', '.table-pickups')
        this.randomGroupNumber = Math.floor(Math.random() * groups.value.length)
        this.descriptionSelector = `.table-pickups:nth-child(${this.randomGroupNumber + 1}) .group-description`
        browser.waitForElementVisible(this.descriptionSelector)
        let randomGroupDescription = await browser.elements('css selector', this.descriptionSelector)

        this.groupDescription = await browser.elementIdAttribute(randomGroupDescription.value[0].ELEMENT, 'innerText')
    },

    "Set carrier for this group": async (browser) => {
        let groupCarrierSelector = `.table-pickups:nth-child(${this.randomGroupNumber + 1}) .group-carrier`
        browser.waitForElementVisible(groupCarrierSelector)
        await browser.moveToElement(`.table-pickups:nth-child(${this.randomGroupNumber + 1}) div:last-child`, 0, 0)
        browser.click(groupCarrierSelector)
        browser.waitForElementVisible('xpath', `//div[text()='${this.carrier.name}']`)
        browser.click('xpath', `//div[text()='${this.carrier.name}']`)

        browser.Logout()
    },

    "Log in as carrier 2nd time": async (browser) => {
        browser.url(this.url)
        browser.waitForElementVisible('body')
        await browser.Login(browser.globals.EXAMPLE_DELIVERY_WITH_GROUPS.CARRIER_INDEX)
    },

    "Selected delivery groups": (browser) => {
        browser.waitForElementVisible(".table-pickups .group-description")
        browser.assert.containsText(".table-pickups .group-description", this.groupDescription.value);
    }

}