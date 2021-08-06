const login = async (browser, userIndex) => {
    browser.click('#firebaseuiAuthContainer')
    let result = await browser.windowHandles();
    let handles = result.value;
    browser.switchWindow(handles[1]);
    browser.waitForElementVisible('#accounts-list')
    browser.waitForElementVisible('.js-reuse-account')
    browser.waitForElementVisible('.mdc-list-item__primary-text')
    let users = await browser.elements('css selector', '.mdc-list-item__primary-text');
    let randomNumber = userIndex || Math.floor(Math.random() * users.value.length)
    let randomUserElement = users.value[randomNumber]
    let userName = await browser.elementIdAttribute(randomUserElement.ELEMENT, 'innerText')

    console.log("Selected user", userName)

    browser.click(`#accounts-list ul.list li.js-reuse-account:nth-child(${randomNumber + 1})`)
    browser.switchWindow(handles[0]);

    return userName.value
}

module.exports = login