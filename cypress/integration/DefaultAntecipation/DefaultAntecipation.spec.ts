/// <reference types='cypress' />

describe('DefaultAntecipation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve calcular a antecipação padrão conforme o esperado', () => {
    cy.get('[data-test-id="amount"]').type('1000').should('have.value', '1000');
    cy.get('[data-test-id="installments"]').type('1').should('have.value', '1');
    cy.get('[data-test-id="mdr"]').type('1').should('have.value', '1');

    cy.wait(800);

    cy.get('[data-test-id="value-1"]').contains('980,00');
    cy.get('[data-test-id="value-15"]').contains('985,00');
    cy.get('[data-test-id="value-30"]').contains('990,00');
    cy.get('[data-test-id="value-90"]').contains('990,00');
  });
});
