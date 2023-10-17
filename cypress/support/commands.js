Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Rafael');
    cy.get('#lastName').type('Guerero');
    cy.get('#email').type('rafael@gmail.com');
    cy.get('#open-text-area').type('Texto', { delay: 0 });
    cy.contains('button', 'Enviar').click();
})