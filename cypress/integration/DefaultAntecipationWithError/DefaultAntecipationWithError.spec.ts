/// <reference types='cypress' />

describe('DefaultAntecipationWithError', () => {
  beforeEach(() => {
    cy.visit('/error');
  });

  it('should calculate the default anticipation with error 500', () => {
    cy.get('[data-test-id="amount"]').type('1000').should('have.value', '1000');
    cy.get('[data-test-id="installments"]').type('1').should('have.value', '1');
    cy.get('[data-test-id="mdr"]').type('1').should('have.value', '1');

    cy.wait(200);

    cy.get('.Toastify__toast-body').contains(
      'Houve um erro ao processar a requisição. Tente novamente mais tarde.',
    );
  });
});
