describe('Deliveries admin flow', () => {

    let deliveriesRoute = null
    let deliveryId = null;

    before(async function(){
        cy.login()
        let routes = await cy.getConstants('ROUTES').promisify()
        deliveriesRoute = Cypress.env('HOST') + routes.DELIVERIES
    })

    it('Shows deliveries page', () => {
        cy.visit(deliveriesRoute)
        cy.get('.v-data-table th').should('contain', 'מזהה')
    })

    it('Shows user deliveries', async () => {
        let children = await cy.get("table tbody").find('tr').promisify()
        let randomNumber = Math.floor(Math.random()*children.length)
        let randomRow = children[randomNumber];
        let idTd = await cy.wrap(randomRow).find("td:first-child").promisify()
        deliveryId = await idTd.text()
        cy.log("deliveryId", deliveryId)
    })

    it('Shows a link to this delivery', () => {
        let deliveryLink = cy.get("table tbody").find(`td a[href$="${deliveryId}"]`).promisify()
        cy.wrap(deliveryLink).click()
    })

})