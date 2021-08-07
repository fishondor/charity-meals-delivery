module.exports = {

    before: async function(browser) {
        browser.url(browser.globals.HOST + browser.globals.ROUTES.DELIVERIES)
        browser.waitForElementVisible('body')
        await browser.Login(0)

    },

    after: function(browser) {
        browser.end()
    },

    "Shows deliveries table": function(browser) {
        browser.waitForElementVisible("#deliveries-table")
    },

    "Shows user deliveries": async function(browser) {
        let rows = await browser.elements('css selector', `#deliveries-table table body tr`);
        let randomRow = Math.floor(Math.random() * rows.value.length)
        browser.waitForElementVisible(`#deliveries-table table tbody tr:nth-child(${randomRow + 1}) td:first-child`)
        this.deliveryId = await browser.getText(`#deliveries-table table tbody tr:nth-child(${randomRow + 1}) td:first-child`)
        this.deliveryId = this.deliveryId.value
        console.log("Using delivery", this.deliveryId)
    },

    "Links to this delivery": function(browser) {
        browser.waitForElementVisible('xpath', `//a[contains(@href, '${this.deliveryId}')]`)
        browser.click('xpath', `//a[contains(@href, '${this.deliveryId}')]`)
        browser.assert.urlContains(this.deliveryId);
    },

    "Deletes current pickup groups": function(browser) {
        browser.assert.visible('#delivery-tabs')
        browser.waitForElementVisible('#tab-info')
        browser.click('#tab-info')
        browser.waitForElementVisible('#button-reset-groups')
        browser.click('#button-reset-groups')
        browser.waitForElementVisible('#dialog-reset-groups-approve')
        browser.click('#dialog-reset-groups-approve')
        browser.click('#tab-groups')
        browser.pause(3000)
        browser.assert.visible('#import-groups-input')
    },

    "Deleted current pickups from database": function(browser) {
        browser.url(browser.globals.HOST + browser.globals.ROUTES.DELIVERY + `/${this.deliveryId}`)
        browser.pause(3000)
        browser.assert.visible('#import-groups-input')
    },

    "Import pickup groups": async function(browser) {
        let deliveriesToImport = browser.globals.SPREADSHEET_EXPORT
        
        browser.waitForElementVisible('#import-groups-input')
        browser.setValue('#import-groups-input', deliveriesToImport)
        browser.waitForElementVisible('#import-groups')
        browser.click('#import-groups')
        browser.waitForElementNotPresent('#import-groups-input')
        browser.waitForElementVisible('.table-pickups')
        let deliveriesToImportJSON = JSON.parse(deliveriesToImport)
        let pickupGroups = await browser.elements('css selector', '.table-pickups');
        browser.assert.equal(pickupGroups.value.length, deliveriesToImportJSON.length)
    }

}