const login = async function(userIndex) {
    
}

module.exports.command = login

module.exports = class CustomCommand {
    async command() {
        this.api.click('#firebaseuiAuthContainer')
        let result = await this.api.windowHandles();
        let handles = result.value;
        this.api.switchWindow(handles[1]);
        this.api.waitForElementVisible('#accounts-list')
        this.api.waitForElementVisible('.js-reuse-account')
        this.api.waitForElementVisible('.mdc-list-item__primary-text')
        let users = await this.api.elements('css selector', '.mdc-list-item__primary-text');
        let selectedUser = typeof userIndex === 'number' ? userIndex : Math.floor(Math.random() * users.value.length)
        let randomUserElement = users.value[selectedUser]
        let userName = await this.api.elementIdAttribute(randomUserElement.ELEMENT, 'innerText')

        console.log("Selected user", userName)

        this.api.click(`#accounts-list ul.list li.js-reuse-account:nth-child(${selectedUser + 1})`)
        this.api.switchWindow(handles[0]);

        return userName.value
    
    }
}