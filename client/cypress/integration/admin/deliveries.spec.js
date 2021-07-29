describe('Deliveries admin flow', () => {

    before(function(){
        cy.login()
    })

    let deliveriesRoute = Cypress.env('HOST') + Cypress.env('ROUTES').DELIVERIES
    let deliveryId = null;

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