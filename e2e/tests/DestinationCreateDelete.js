module.exports = {

    before: async function(browser) {
        browser.url(browser.globals.HOST + browser.globals.ROUTES.ADMIN)
        browser.waitForElementVisible('body')
        await browser.Login(0)

    },

    after: function(browser) {
        browser.end()
    },

    "Destinations table is populated with destinations": async function(browser) {
        browser.waitForElementVisible("#tab-destinations")
        browser.click("#tab-destinations")
        browser.waitForElementVisible("#destinations-table")

        let tableRows = await browser.elements('css selector', `#destinations-table table tbody tr`);

        browser.assert.ok(tableRows.value.length > 0, "Destinations table shows registries")
    },

    "Delete Destination": async function(browser) {
        let tableRows = await browser.elements('css selector', "#destinations-table table tbody tr")
        let randomRow = Math.floor(Math.random() * tableRows.value.length)
        let randomRowSelector= `#destinations-table table tbody tr:nth-child(${randomRow + 1})`
        let randomDeleteIconSelector =`${randomRowSelector} .destinations-delete-item`

        let randomDestinationNameSelector = `${randomRowSelector} .destinations-table-item-name`
        let randomDestinationNameElement = await browser.elements('css selector', randomDestinationNameSelector)

        this.randomDestinationName = await browser.elementIdAttribute(randomDestinationNameElement.value[0].ELEMENT, 'innerText')
        console.log("Selected destination", this.randomDestinationName)
        this.randomDestinationName = this.randomDestinationName.value

        browser.waitForElementVisible('xpath', `//td[text()='${this.randomDestinationName}']`)

        browser.waitForElementVisible(randomDeleteIconSelector)
        browser.click(randomDeleteIconSelector)

        browser.waitForElementVisible(".dialog-delete-destination")
        browser.click(".dialog-delete-destination #delete-destination-dialog-approve")
        browser.waitForElementNotVisible(".dialog-delete-destination")

        browser.waitForElementNotPresent('xpath', `//td[text()='${this.randomDestinationName}']`)
    },

    "Deleted destination updated in backend": function(browser) {
        browser.url(browser.globals.HOST + browser.globals.ROUTES.ADMIN)
        browser.waitForElementVisible("#tab-destinations")
        browser.click("#tab-destinations")
        browser.waitForElementVisible("#destinations-table")

        browser.waitForElementNotPresent('xpath', `//td[text()='${this.randomDestinationName}']`, 3000)
    },

    "Create destination": function(browser) {
        browser.waitForElementVisible("#button-create-destination")
        browser.click("#button-create-destination")
        browser.waitForElementVisible(".dialog-create-destination")

        this.detinationName = browser.globals.DESTINATION_VALUES.NAME + Date.now()
        this.detinationPhone = browser.globals.DESTINATION_VALUES.PHONE
        this.detinationAddress = browser.globals.DESTINATION_VALUES.ADDRESS + Date.now()
        browser.setValue(".dialog-create-destination .form-destination-name input", this.detinationName)
        browser.setValue(".dialog-create-destination .form-destination-phone input[name='telephone']", this.detinationPhone)
        browser.setValue(".dialog-create-destination .form-destination-address input", this.detinationAddress)

        browser.pause(5000)

        browser.click("#create-destination-dialog-approve")
        browser.waitForElementNotVisible(".dialog-create-destination")

        browser.waitForElementVisible('xpath', `//td[text()='${this.detinationName}']`)
        browser.waitForElementVisible('xpath', `//td[text()='${this.detinationPhone}']`)
        browser.waitForElementVisible('xpath', `//td[text()='${this.detinationAddress}']`)
    },

    "Destination saved to DB": function(browser) {
        browser.url(browser.globals.HOST + browser.globals.ROUTES.ADMIN)
        browser.waitForElementVisible("#tab-destinations")
        browser.click("#tab-destinations")
        browser.waitForElementVisible("#destinations-table")

        browser.waitForElementVisible('xpath', `//td[text()='${this.detinationName}']`)
        browser.waitForElementVisible('xpath', `//td[text()='${this.detinationPhone}']`)
        browser.waitForElementVisible('xpath', `//td[text()='${this.detinationAddress}']`)
    }

}