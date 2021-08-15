module.exports = class CreateDeliveryCommand {
    async command() {
        this.api.url(this.api.globals.HOST + this.api.globals.ROUTES.DELIVERY_CREATE)
        this.api.waitForElementVisible('body')
        this.api.waitForElementVisible("button#button-create-delivery")
        this.api.click("button#button-create-delivery")
        this.api.waitForElementVisible('#delivery-title')
        let pathname = await this.api.executeAsync(
            (done) => {
                done(window.location.pathname)
            }
        )
        let deliveryId = pathname.value.replace(this.api.globals.ROUTES.DELIVERY + "/", "")
        console.log("Created delivery", deliveryId)

        return deliveryId 
    
    }
}