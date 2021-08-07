const login = async function(userIndex) {
    this.click('#firebaseuiAuthContainer')
    let result = await this.windowHandles();
    let handles = result.value;
    this.switchWindow(handles[1]);
    this.waitForElementVisible('#accounts-list')
    this.waitForElementVisible('.js-reuse-account')
    this.waitForElementVisible('.mdc-list-item__primary-text')
    let users = await this.elements('css selector', '.mdc-list-item__primary-text');
    let randomNumber = userIndex || Math.floor(Math.random() * users.value.length)
    let randomUserElement = users.value[randomNumber]
    let userName = await this.elementIdAttribute(randomUserElement.ELEMENT, 'innerText')

    console.log("Selected user", userName)

    this.click(`#accounts-list ul.list li.js-reuse-account:nth-child(${randomNumber + 1})`)
    this.switchWindow(handles[0]);

    return userName.value
}

module.exports.command = login