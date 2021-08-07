module.exports = {

    before: function(browser) {
        browser.url('http://localhost:4200/deliveries')
        browser.waitForElementVisible('body')
    },

    after: function(browser) {
        browser.end()
    },

    'Show login page' : function(browser) {
        browser.waitForElementVisible('#firebaseuiAuthContainer', 10000)
    },

    'Login button displayes': function(browser) {
        browser.waitForElementVisible('#navbar-login')
    },

    'Login with google': async (browser) => {
        browser.click('#firebaseuiAuthContainer')
        let result = await browser.windowHandles();
        let handles = result.value;
        browser.switchWindow(handles[1]);
        browser.waitForElementVisible('#accounts-list')
        browser.waitForElementVisible('.js-reuse-account')
        browser.waitForElementVisible('.mdc-list-item__primary-text')
        let users = await browser.elements('css selector', '.mdc-list-item__primary-text');
        let randomNumber = Math.floor(Math.random() * users.value.length)
        let randomUserElement = users.value[randomNumber]
        this.userName = await browser.elementIdAttribute(randomUserElement.ELEMENT, 'innerText')

        console.log("Selected user", this.userName)

        browser.click(`#accounts-list ul.list li.js-reuse-account:nth-child(${randomNumber + 1})`)
        browser.switchWindow(handles[0]);
    },

    'Login button hidden and avatar shows': (browser) => {
        browser.waitForElementNotPresent('#navbar-login')
        browser.waitForElementVisible('#navbar-user-avatar')
    },

    'User is logged in with details': async (browser) => {
        browser.url('http://localhost:4200/login')
        browser.waitForElementVisible('#user-logged-in-message')

        browser.assert.containsText('#user-logged-in-message-title', this.userName.value)
    }
};