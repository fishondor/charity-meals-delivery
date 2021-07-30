describe('Admin login test', () => {

    let deliveriesRoute = null

    before(async function(){
        cy.clearLocalStorage()
        cy.clearCookies()
        cy.logout()
        let routes = await cy.getConstants('ROUTES').promisify()
        deliveriesRoute = Cypress.env('HOST') + routes.DELIVERIES
    })

    it('Shows log in button to non logged user', () => {
        cy.clearLocalStorage()
        cy.reload(true)
        cy.visit(deliveriesRoute)

        cy.get('header button').should('contain', 'Log in')
    })
    it('Redirects to login page', () => {
        cy.visit(deliveriesRoute)

        cy.location().should((location) => {
            let loginRoute = cy.getConstants('ROUTES').LOGIN
            expect(location.pathname).to.eq(loginRoute)
        })         
    })
    it('Shows login with google', () => {
        cy.get('#firebaseuiAuthContainer button').should('contain', 'Sign in with Google')
    })
})