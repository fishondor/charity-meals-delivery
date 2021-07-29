describe('Admin login test', () => {

    before(function(){
        cy.clearLocalStorage()
        cy.clearCookies()
        cy.logout()
    })

    let url = Cypress.env('HOST') + Cypress.env('ROUTES').DELIVERIES

    it('Shows log in button to non logged user', () => {
        cy.clearLocalStorage()
        cy.reload(true)
        cy.visit(url)

        cy.get('header button').should('contain', 'Log in')
    })
    it('Redirects to login page', () => {
        cy.visit(url)

        cy.location().should((location) => {
            let loginRoute = Cypress.env('ROUTES').LOGIN
            expect(location.pathname).to.eq(loginRoute)
        })         
    })
    it('Shows login with google', () => {
        cy.get('#firebaseuiAuthContainer button').should('contain', 'Sign in with Google')
    })
})