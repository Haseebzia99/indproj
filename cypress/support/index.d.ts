declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to wait for React to be loaded on the page.
     * @example cy.waitForReact()
     */
    waitForReact(timeout?: number): Chainable<Subject>;
  }
}
