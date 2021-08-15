module.exports = class LogoutCommand {
    command() {
        this.api.click('#navbar-user-avatar')
        this.api.waitForElementVisible('#navbar-logout')
        this.api.click('#navbar-logout')
    }
}