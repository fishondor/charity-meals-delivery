module.exports = {

    before: (browser) => {
        this.adminPage = browser.page.Admin();
        this.url = browser.globals.HOST + browser.globals.ROUTES.DELIVERY + "/" + browser.globals.EXAMPLE_DELIVERY_WITH_GROUPS.ID
    },

    after: function(browser) {
        browser.end()
    },

    "Log in as carrier": async (browser) => {
        browser.url(this.url)
        browser.waitForElementVisible('body')
        this.carrier = await browser.Login(browser.globals.EXAMPLE_DELIVERY_WITH_GROUPS.CARRIER_INDEX)
        console.log("Carrier", this.carrier)
    },

    "Register to delivery as carrier": async (browser) => {
        browser.waitForElementVisible('#delivery-registration-form')
        browser.waitForElementVisible("input[name='telephone']")
        browser.waitForElementVisible("input#delivery-registration-form-pickups")
        browser.setValue("input[name='telephone']", "0524378928")
        let defaultPickupsNumberValue = await browser.getValue("input#delivery-registration-form-pickups")
        browser.assert.equal(defaultPickupsNumberValue.value, browser.globals.CARRIER.DEFAULT_PICKUPS_NUMBER)

        browser.waitForElementVisible('#delivery-registration-form-submit')
        browser.click('#delivery-registration-form-submit')

        browser.waitForElementNotPresent('#delivery-registration-form')

        browser.Logout()
    },

    "Login as owner": async (browser) => {
        console.log("Url", this.url)
        browser.url(this.url)
        browser.waitForElementVisible('body')
        this.owner = await browser.Login(browser.globals.EXAMPLE_DELIVERY_WITH_GROUPS.OWNER_INDEX)
        console.log("Owner", this.owner)
    },

    "Carrier listed in carriers list": (browser) => {
        this.adminPage.openCarriersTab()
        browser.waitForElementVisible('xpath', `//td[text()='${this.carrier.email}']`)
    },

    "Select random delivery group": async (browser) => {
        this.adminPage.openGroupsTab()

        let groups = await browser.elements('css selector', '.table-pickups')
        this.randomGroupNumber = Math.floor(Math.random() * groups.value.length)
        this.groupIndexSelector = `.table-pickups:nth-child(${this.randomGroupNumber + 1}) .group-index`
        browser.waitForElementVisible(this.groupIndexSelector)
        let randomGroupIndex = await browser.elements('css selector', this.groupIndexSelector)

        let groupIndexObject = await browser.elementIdAttribute(randomGroupIndex.value[0].ELEMENT, 'innerText')
        this.groupIndex = groupIndexObject.value
        console.log("group index", this.groupIndex)
    },

    "Delete Carrier should be enabled": async (browser) => {
        this.adminPage.openCarriersTab()
        let deleteItemSelector = `//tr[td[contains(text(), '${this.carrier.email}')]]//button[contains(@class, 'carrier-item-delete')]`
        browser.waitForElementVisible('xpath', deleteItemSelector)
        browser.click('xpath', deleteItemSelector)
        browser.waitForElementNotVisible('.carrier-delete-alert', 3000)
        browser.waitForElementNotPresent('.carrier-delete-aprove[disabled="disabled"]', 3000)
        this.adminPage.closeCarrierDeleteModal()
    },

    "Edit carrier should be enabled": async (browser) => {
        let editItemSelector = `//tr[td[contains(text(), '${this.carrier.email}')]]//span[contains(@class, 'carrier-pickups-number')]`
        browser.waitForElementVisible('xpath', editItemSelector)
        browser.click('xpath', editItemSelector)
        browser.waitForElementNotVisible('.carrier-edit-alert', 3000)
        browser.waitForElementNotPresent('.carrier-edit-aprove[disabled="disabled"]', 3000)
        this.adminPage.closeCarrierEditModal()
    },

    "Set carrier for this group": async (browser) => {
        this.adminPage.openGroupsTab()

        let groupCarrierSelector = `.table-pickups:nth-child(${this.randomGroupNumber + 1}) .group-carrier`
        browser.waitForElementVisible(groupCarrierSelector)
        browser.moveToElement(`.table-pickups:nth-child(${this.randomGroupNumber + 1}) div:last-child`, 0, 0)
        browser.pause(3000)
        browser.click(groupCarrierSelector)
        browser.waitForElementVisible('xpath', `//div[text()='${this.carrier.name}']`)
        browser.click('xpath', `//div[text()='${this.carrier.name}']`)
    },

    "Carrier is listed for specific delivery": browser => {
        browser.execute("scrollTo(0,0)")
        this.adminPage.openCarriersTab()
        browser.waitForElementVisible('xpath', `//span[contains(@class, 'carrier-group-indicator-item')]/span[contains(text(), '${this.groupIndex}')]`)
    },

    "Delete Carrier should be disabled": async (browser) => {
        let deleteItemSelector = `//tr[td[span[contains(@class, 'carrier-group-indicator-item')]/span[contains(text(), '${this.groupIndex}')]]]//button[contains(@class, 'carrier-item-delete')]`
        browser.waitForElementVisible('xpath', deleteItemSelector)
        browser.click('xpath', deleteItemSelector)
        browser.waitForElementVisible('.carrier-delete-alert')
        browser.waitForElementVisible('.carrier-delete-aprove[disabled="disabled"]')
        this.adminPage.closeCarrierDeleteModal()
    },

    "Edit carrier should be disabled": async (browser) => {
        let editItemSelector = `//tr[td[span[contains(@class, 'carrier-group-indicator-item')]/span[contains(text(), '${this.groupIndex}')]]]//span[contains(@class, 'carrier-pickups-number')]`
        browser.waitForElementVisible('xpath', editItemSelector)
        browser.click('xpath', editItemSelector)
        browser.waitForElementVisible('.carrier-edit-alert')
        browser.waitForElementVisible('.carrier-edit-aprove[disabled="disabled"]')
        this.adminPage.closeCarrierEditModal()
    }

}