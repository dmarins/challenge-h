/// <reference types='cypress' />

describe('DefaultAntecipationWithTimeout', () => {
  beforeEach(() => {
    cy.visit('/timeout');
  });

  it('deve calcular a antecipação padrão com timeout', () => {
    cy.get('[data-test-id="amount"]').type('1000').should('have.value', '1000');
    cy.get('[data-test-id="installments"]').type('1').should('have.value', '1');
    cy.get('[data-test-id="mdr"]').type('1').should('have.value', '1');

    cy.wait(200);

    cy.get('.Toastify__toast-body').contains(
      'A requisição excedeu o tempo de espera. Tente novamente mais tarde.',
    );
  });
});
