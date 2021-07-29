describe('Create new delivery', () => {

    before(function(){
        cy.login()
    })

    let createDeliveryRoute = Cypress.env('HOST') + Cypress.env('ROUTES').NEW
    let deliveriesRoute = Cypress.env('HOST') + Cypress.env('ROUTES').DELIVERIES
    let DESCRIPTION = Cypress.env('DELIVERY_VALUES').DESCRIPTION + " " + Date.now()

    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth()

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