describe('Create new delivery', () => {

    let DESCRIPTION = null
    let createDeliveryRoute = null
    let deliveriesRoute = null

    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth()

    before(async function(){
        cy.login()
        let routes = await cy.getConstants('ROUTES').promisify()
        createDeliveryRoute =  Cypress.env('HOST') + routes.NEW
        deliveriesRoute = Cypress.env('HOST') + routes.DELIVERIES
        let deliveryValues = await cy.getConstants('DELIVERY_VALUES').promisify()
        DESCRIPTION = deliveryValues.DESCRIPTION + " " + Date.now()
    })

    it('Shows create delivery page', () => {
        cy.visit(createDeliveryRoute)
    })

    it('Sets description field', () => {
        cy.get('input').type(DESCRIPTION)
        cy.get('.v-date-picker-table button').contains("17").click()
    })

    it('Creates this delivery', () => {
        cy.get('button#button-create-delivery').click()

        cy.get('#delivery-title').should('contain', year)
        cy.get('#delivery-title').should('contain', month + 1)
        cy.get('#delivery-title').should('contain', "17")

        cy.get('#delivery-description').should('contain', DESCRIPTION)
    })

    it('Shows this delivery in deliveries list', () => {
        cy.visit(deliveriesRoute)

        cy.get('td').contains(DESCRIPTION)
    })

    it('Deletes this delivery', () => {
        cy.get('td').contains(DESCRIPTION).parent('tr').find('button.deliveries-delete-item').click()
        cy.get('#delete-delivery-dialog-approve').click()
        cy.get('td').contains(DESCRIPTION).should('not.exist')
    })

})