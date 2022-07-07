/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe('Navigation', () => {
    it('should navigate to the projects page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        // Find a link with an href attribute containing "projects" and click it
        cy.get('a[href*="projects"]').click()

        // The new url should include "/projects"
        cy.url().should('include', '/projects')

        cy.wait(50);

        // The new page should contain an h1 with "Projects"
        cy.get('h1').contains('Projects')
    });

    it('should navigate to the tickets page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        // Find a link with an href attribute containing "tickets" and click it
        cy.get('a[href*="tickets"]').click()

        // The new url should include "/tickets"
        cy.url().should('include', '/tickets')

        cy.wait(50);

        // The new page should contain an h1 with "Tickets"
        cy.get('h1').contains('Tickets')
    });

    it('should navigate to the roles page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        // Find a link with an href attribute containing "roles" and click it
        cy.get('a[href*="roles"]').click()

        // The new url should include "/roles"
        cy.url().should('include', '/roles')

        cy.wait(50);

        // The new page should contain an h1 with "Roles"
        cy.get('h1').contains('Roles')
    });

    it('should navigate to the users page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        // Find a link with an href attribute containing "users" and click it
        cy.get('a[href*="users"]').click()

        // The new url should include "/users"
        cy.url().should('include', '/users')

        cy.wait(100);

        // The new page should contain an h1 with "Users"
        cy.get('h1').contains('Users')
    });
})