describe('Import deliveries', () => {

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
    })

    it('Shows a link to this delivery', () => {
        let deliveryLink = cy.get("table tbody").find(`td a[href$="${deliveryId}"]`).promisify()
        cy.wrap(deliveryLink).click()
    })

    it("Loads delivery", () => {
        cy.log(`Loading delivery: ${deliveryId}`)
        cy.get('#delivery-tabs')
    })

    it("Deletes current groups", () => {
        cy.get('#tab-info').click()
        cy.get('#button-reset-groups').click()
        cy.get('#dialog-reset-groups-approve').click()
        cy.get('#tab-groups').click()
        cy.wait(3000)
        cy.get('#import-groups-input').should('be.visible')
    })

    it("Delivery groups are deleted after reload", () => {
        cy.reload()
        cy.wait(3000)
        cy.get('#import-groups-input').should('be.visible')
    })

    let deliveriesToImport = null

    it("Imports groups", async () => {
        deliveriesToImport = await cy.getConstants('SPREADSHEET_EXPORT').promisify()
        cy.get('#import-groups-input').fill(deliveriesToImport)
        cy.get('#import-groups').click()
        cy.get('#import-groups-input').should('not.exist')
        cy.get('.table-pickups').should('be.visible')
        let deliveriesToImportJSON = JSON.parse(deliveriesToImport)
        cy.get('.table-pickups').should('have.length', deliveriesToImportJSON.length)
    })
})